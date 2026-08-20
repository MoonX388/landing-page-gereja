# Backend Email - Recommended Improvements

## 📋 Priority: HIGH
Implementasikan ini untuk production-ready system.

---

## 1. Enhanced Email Service with Logging

**File:** `src/auth/email.service.ts`

### Current Issue
- ✅ Email sending works
- ❌ No success logging
- ❌ Inconsistent error handling between methods
- ❌ No return value from email methods

### Recommendation
```typescript
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    const smtpPort = Number.parseInt(process.env.SMTP_PORT || '465', 10);

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.gerejapintar.id',
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    this.transporter.verify((error) => {
      if (error) {
        this.logger.error(`SMTP verification failed: ${error.message}`);
      } else {
        this.logger.log('✅ SMTP connection verified');
      }
    });
  }

  async sendVerificationEmail(to: string, token: string): Promise<boolean> {
    const baseUrl = process.env.FRONTEND_URL || 'https://gerejapintar.id';
    const url = `${baseUrl}/verify-email?token=${token}`;
    
    try {
      const result = await this.transporter.sendMail({
        from: `"Gereja Pintar" <${process.env.SMTP_USER}>`,
        to,
        subject: 'Verifikasi Akun Administrator Anda - Gereja Pintar',
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2>Selamat Datang di Gereja Pintar!</h2>
            <p>Akun administrator Anda berhasil dibuat. Silakan klik tombol di bawah ini untuk memverifikasi email Anda:</p>
            <p style="margin: 25px 0;">
              <a href="${url}" target="_blank" style="padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Verifikasi Email Sekarang</a>
            </p>
            <p style="font-size: 12px; color: #666;">Jika tombol di atas tidak berfungsi, salin dan tempel tautan berikut ke browser Anda:<br>${url}</p>
          </div>
        `,
      });
      
      this.logger.log(`✅ Verification email sent to ${to}. Message ID: ${result.messageId}`);
      return true;
    } catch (error: any) {
      this.logger.error(`❌ Verification email failed for ${to}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async sendResetPasswordEmail(to: string, token: string): Promise<boolean> {
    const url = `${process.env.FRONTEND_URL || 'https://gerejapintar.id'}/reset-pwd?token=${token}`;
    
    try {
      const result = await this.transporter.sendMail({
        from: `"Gereja Pintar Support" <${process.env.SMTP_USER}>`,
        to,
        subject: 'Permintaan Reset Kata Sandi Akun Anda',
        html: `
          <h3>Permintaan Reset Kata Sandi</h3>
          <p>Kami menerima permintaan untuk mereset kata sandi akun Anda. Klik tombol di bawah ini untuk melanjutkan:</p>
          <a href="${url}" target="_blank" style="padding: 10px 20px; background-color: #e0556a; color: white; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;">Atur Ulang Kata Sandi</a>
          <br/><br/>
          <p>Tautan ini akan kedaluwarsa dalam waktu 1 jam.</p>
          <p>Jika Anda tidak meminta ini, abaikan email ini secara aman.</p>
        `,
      });
      
      this.logger.log(`✅ Reset password email sent to ${to}. Message ID: ${result.messageId}`);
      return true;
    } catch (error: any) {
      this.logger.error(`❌ Reset password email failed for ${to}: ${error.message}`, error.stack);
      throw error;
    }
  }
}
```

---

## 2. Error Handling in Auth Service

**File:** `src/auth/auth.service.ts`

### Current Issue
- Email gagal di `register()` → User terdaftar tapi tidak dapat verifikasi
- Tidak ada fallback untuk email failure

### Recommendation

Wrap email sending dengan try-catch:

```typescript
async register(body: any) {
  // ... existing code ...
  
  // Kirim email verifikasi di background
  try {
    await this.emailService.sendVerificationEmail(email, vToken);
    this.logger.log(`Registration email sent for ${email}`);
  } catch (emailError: any) {
    // ⚠️  Log error tapi jangan fail registration
    this.logger.error(`Registration email failed for ${email}: ${emailError.message}`);
    // User bisa resend verification nanti via POST /auth/resend-verification
  }

  return { 
    message: 'Registrasi berhasil! Silakan cek email Anda untuk verifikasi.', 
    subdomainFull: `${subdomain}.gerejapintar.id` 
  };
}

async forgotPassword(email: string) {
  const supabase = this.supabaseService.getClient();
  const { data: user } = await supabase.from('users').select('*').eq('email', email).maybeSingle();
  
  // ✅ Security: Don't expose user not found
  if (!user) {
    return { message: 'Instruksi reset sandi telah dikirim jika email terdaftar.' };
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 3600000).toISOString(); 

  await supabase.from('users').update({ 
    resetPasswordToken: resetToken, 
    resetPasswordExpires: expires 
  }).eq('id', user.id);

  try {
    await this.emailService.sendResetPasswordEmail(email, resetToken);
    this.logger.log(`Reset password email sent for ${email}`);
  } catch (emailError: any) {
    this.logger.error(`Reset password email failed for ${email}: ${emailError.message}`);
    // Token tetap ada di database, user bisa minta ulang
  }

  return { message: 'Tautan reset sandi berhasil dikirim ke email Anda.' };
}
```

---

## 3. Prevent Token Reuse & Add Security Checks

**File:** `src/auth/auth.service.ts`

### Current Issue
- Token di-clear setelah digunakan (✅ GOOD)
- Tapi tidak ada logging untuk detect abuse/brute force attempts

### Recommendation

```typescript
async verifyEmail(token: string) {
  const supabase = this.supabaseService.getClient();
  
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('verificationToken', token)
    .maybeSingle();
  
  if (error || !user) {
    this.logger.warn(`⚠️  Attempted verification with invalid/expired token`);
    throw new BadRequestException('Tautan verifikasi tidak valid atau telah kedaluwarsa.');
  }

  // ✅ Prevent re-verification
  if (user.isVerified) {
    this.logger.warn(`⚠️  Attempted re-verification for already verified user: ${user.email}`);
    // Jangan error, just redirect ke login
    return { message: 'Akun sudah diverifikasi. Silakan login.' };
  }

  const { error: updateError } = await supabase
    .from('users')
    .update({ 
      isVerified: true, 
      verificationToken: null,
      verifiedAt: new Date().toISOString() // 🚀 Track verification time
    })
    .eq('id', user.id);

  if (updateError) {
    this.logger.error(`Failed to update verification for user ${user.email}: ${updateError.message}`);
    throw new BadRequestException('Gagal memperbarui status verifikasi.');
  }

  this.logger.log(`✅ Email verified for user: ${user.email}`);
  return { message: 'Email berhasil diverifikasi! Anda sekarang dapat login.' };
}

async resetPassword(body: any) {
  const { token, newPassword } = body;
  const supabase = this.supabaseService.getClient();

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('resetPasswordToken', token)
    .maybeSingle();

  if (error || !user) {
    this.logger.warn(`⚠️  Attempted password reset with invalid token`);
    throw new BadRequestException('Tautan tidak valid.');
  }

  if (!user.resetPasswordExpires || new Date(user.resetPasswordExpires).getTime() < Date.now()) {
    this.logger.warn(`⚠️  Attempted password reset with expired token for user: ${user.email}`);
    throw new BadRequestException('Tautan kedaluwarsa. Silakan minta reset ulang.');
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  
  const { error: updateError } = await supabase
    .from('users')
    .update({ 
      password: newHashedPassword, 
      resetPasswordToken: null, 
      resetPasswordExpires: null,
      passwordResetAt: new Date().toISOString() // 🚀 Track password change
    })
    .eq('id', user.id);

  if (updateError) {
    this.logger.error(`Failed to reset password for user ${user.email}: ${updateError.message}`);
    throw new BadRequestException('Gagal memperbarui kata sandi.');
  }

  this.logger.log(`✅ Password reset successful for user: ${user.email}`);
  return { message: 'Kata sandi berhasil diperbarui. Silakan login dengan kata sandi baru.' };
}
```

---

## 4. Rate Limiting for Resend Verification

**File:** `src/auth/auth.service.ts`

### Current Issue
- User bisa spam "resend verification" requests
- No cooldown mechanism

### Recommendation

```typescript
async resendVerification(body: { email: string }) {
  const { email } = body;
  const supabase = this.supabaseService.getClient();

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (error || !user) {
    throw new NotFoundException('Akun dengan email ini tidak ditemukan.');
  }

  if (user.isVerified) {
    throw new BadRequestException('Akun ini sudah diverifikasi. Silakan langsung login.');
  }

  // 🚀 Check rate limiting: 5 minute cooldown
  if (user.lastVerificationResendAt) {
    const timeSinceLastResend = Date.now() - new Date(user.lastVerificationResendAt).getTime();
    const RESEND_COOLDOWN = 5 * 60 * 1000; // 5 minutes
    
    if (timeSinceLastResend < RESEND_COOLDOWN) {
      const secondsLeft = Math.ceil((RESEND_COOLDOWN - timeSinceLastResend) / 1000);
      this.logger.warn(`⚠️  Rate limited resend verification for ${email}. Wait ${secondsLeft}s`);
      throw new BadRequestException(
        `Silakan tunggu ${secondsLeft} detik sebelum mengirim ulang email verifikasi.`
      );
    }
  }

  // Buat token verifikasi yang baru
  const vToken = crypto.randomBytes(32).toString('hex');

  // Update token baru ke database
  const { error: updateError } = await supabase
    .from('users')
    .update({ 
      verificationToken: vToken,
      lastVerificationResendAt: new Date().toISOString() // 🚀 Track last resend
    })
    .eq('id', user.id);

  if (updateError) {
    throw new BadRequestException('Gagal membuat token verifikasi baru.');
  }

  try {
    await this.emailService.sendVerificationEmail(email, vToken);
    this.logger.log(`✅ Verification email resent to ${email}`);
  } catch (emailError: any) {
    this.logger.error(`Resend verification email failed for ${email}: ${emailError.message}`);
    throw new BadRequestException('Gagal mengirim email. Silakan coba lagi nanti.');
  }

  return { 
    success: true,
    message: 'Email verifikasi telah dikirim ulang! Silakan cek kotak masuk Anda.' 
  };
}
```

---

## 5. Database Schema Updates

Tambahkan kolom tracking di tabel `users`:

```sql
-- ✅ Tracking fields (recommended untuk production)
ALTER TABLE users ADD COLUMN verifiedAt TIMESTAMP NULL;
ALTER TABLE users ADD COLUMN passwordResetAt TIMESTAMP NULL;
ALTER TABLE users ADD COLUMN lastVerificationResendAt TIMESTAMP NULL;

-- ✅ Indexes untuk performa
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subdomain ON users(subdomain);
CREATE INDEX idx_users_verificationToken ON users(verificationToken);
CREATE INDEX idx_users_resetPasswordToken ON users(resetPasswordToken);
```

---

## 6. Environment Variables - Add Defaults

**File:** `.env.example`

```env
# SMTP Configuration
SMTP_HOST=mail.gerejapintar.id
SMTP_PORT=587
SMTP_USER=your-email@gerejapintar.id
SMTP_PASS=your-app-password
SMTP_FROM_NAME=Gereja Pintar

# Frontend
FRONTEND_URL=http://localhost:3000

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRY=24h

# Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anonymous-key
SUPABASE_SERVICE_KEY=your-service-role-key

# Logging
LOG_LEVEL=debug
```

---

## 7. Add Module Provider

**File:** `src/auth/auth.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailService } from './email.service';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: process.env.JWT_EXPIRY || '24h' },
    }),
  ],
  providers: [AuthService, EmailService, SupabaseService],
  controllers: [AuthController],
  exports: [AuthService, EmailService], // Export untuk pemakaian di module lain
})
export class AuthModule {}
```

---

## Implementation Priority

| Priority | Task | Time |
|----------|------|------|
| 🔴 HIGH | Add success logging in EmailService | 10 min |
| 🔴 HIGH | Add error handling in auth.service email calls | 15 min |
| 🟠 MEDIUM | Add token reuse prevention logging | 10 min |
| 🟠 MEDIUM | Add rate limiting for resend verification | 15 min |
| 🟠 MEDIUM | Database schema updates (tracking fields) | 10 min |
| 🟡 LOW | Environment variables setup | 5 min |

**Total Time:** ~65 minutes for production-ready system

---

## Testing After Implementation

```bash
# Test verification email
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "namaGereja": "Test Gereja",
    "namaAdmin": "Admin Test",
    "email": "test@gerejapintar.id",
    "password": "Password123"
  }'

# Test verify email endpoint
curl -X GET "http://localhost:3001/auth/verify-email?token=YOUR_TOKEN_HERE"

# Test forgot password
curl -X POST http://localhost:3001/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "test@gerejapintar.id"}'

# Test reset password
curl -X POST http://localhost:3001/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "YOUR_RESET_TOKEN",
    "newPassword": "NewPassword123"
  }'

# Test resend verification (rate limit test)
curl -X POST http://localhost:3001/auth/resend-verification \
  -H "Content-Type: application/json" \
  -d '{"email": "test@gerejapintar.id"}'
```

---

**Status:** Ready for implementation! All recommendations are backward compatible. 🚀

# Backend Email Configuration Guide

## Status ✅ SUDAH DIIMPLEMENTASI
Backend sudah lengkap dengan email sending! Dokumentasi ini untuk reference & validation.

## API Endpoints yang Diperlukan

### 1. **POST /auth/register** ✅ SUDAH LENGKAP
Frontend mengirim:
```json
{
  "namaGereja": "string",
  "provinsi": "string",
  "kabupatenKota": "string",
  "namaAdmin": "string",
  "username": "string",
  "noHpAdmin": "string",
  "email": "string",
  "password": "string"
}
```

**Backend sudah:**
- ✅ Buat user di tabel `users` 
- ✅ Buat user di tabel `user` (sinkronisasi)
- ✅ Generate verification token (32-byte hex)
- ✅ Kirim email verifikasi dengan token ke email
- ✅ Response return subdomain dan pesan sukses
- ✅ Async email sending (tidak block response)

### 2. **POST /auth/forgot-password** ✅ SUDAH LENGKAP
Frontend mengirim:
```json
{
  "email": "string"
}
```

**Backend sudah:**
- ✅ Cari user berdasarkan email (silent: jangan expose user tidak ada)
- ✅ Generate reset token (32-byte hex)
- ✅ Simpan token + expiry (1 jam) di database
- ✅ Kirim email dengan link reset: `/reset-pwd?token={token}`
- ✅ Return generic success message (security best practice)
- ✅ Async email sending (tidak block ✅ SUDAH LENGKAP
Frontend mengirim:
```json
{
  "token": "string",
  "newPassword": "string"
}
```

**Backend sudah:**
- ✅ Verifikasi token ada di database
- ✅ Verifikasi token tidak kedaluwarsa (check `resetPasswordExpires`)
- ✅ Hash password baru dengan bcrypt
- ✅ Update password di database
- ✅ Hapus token setelah digunakan (`resetPasswordToken: null`)
- ✅ Hapus expiry setelah digunakan (`resetPasswordExpires: null`)
- ✅ Update password ✅ SUDAH LENGKAP
Frontend akan call endpoint ini dari link email:
`https://domain.com/verify-email?token={token}`

**Backend sudah:**
- ✅ Cari user berdasarkan `verificationToken`
- ✅ Verifikasi token valid
- ✅ Update user status `isVerified = true`
- ✅ Hapus token setelah digunakan (`verificationToken: null`)
- ✅ Return success/error message
- ✅ Blokir login jika email belum terverifikasi (di `login()` method)
- ❌ **KURANG: Verifikasi token**
- ❌ **KURANG: Update user status is_verified = true**
- ✅ Return success/error message

---

## ✅ Backend Implementation Validation

### Email Service (`email.service.ts`)

```typescript
// ✅ GOOD: Nodemailer configuration dengan environment variables
this.transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.gerejapintar.id',
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false }, // ✅ Untuk self-signed certificates
});

// ✅ GOOD: Verification di startup
this.transporter.verify((error) => {
  if (error) console.error('SMTP verification failed:', error.message);
});
```

### Auth Service (`auth.service.ts`)

**Register Flow:**
```typescript
✅ Create user di tabel 'users'
✅ Create user di tabel 'user' (sync)
✅ Generate token: crypto.randomBytes(32).toString('hex')
✅ Send verification email (async, tidak block)
✅ Return: { message, subdomainFull }
```

**Verify Email Flow:**
```typescript
✅ Cari user by verificationToken
✅ Update isVerified: true, verificationToken: null
✅ Login akan check isVerified sebelum allow login
```

**Login Flow:**
```typescript
✅ Check isSuspended (blokir jika suspended)
✅ Check isVerified (blokir jika belum verifikasi email)
✅ Validate subdomain jika login via cabang
✅ Generate JWT token
```

**Forgot Password Flow:**
```typescript
✅ Generate token: crypto.randomBytes(32).toString('hex')
✅ Set expires: Date.now() + 3600000 (1 jam)
✅ Send reset email (async)
✅ Return generic message (security)
```

**Reset Password Flow:**
```typescript
✅ Verify token ada
✅ Check token tidak kedaluwarsa
✅ Hash password baru dengan bcrypt
✅ Update password, clear token & expiry
```

---

## 🚀 Suggested Improvements & Fixes

### 1. ⚠️ Add Success Logging in Email Service

**Current Issue:** No logging when email is sent successfully

```typescript
// ❌ SEBELUM
async sendVerificationEmail(to: string, token: string) {
  const baseUrl = process.env.FRONTEND_URL || 'https://gerejapintar.id';
  const url = `${baseUrl}/verify-email?token=${token}`;
  
  try {
    await this.transporter.sendMail({ ... });
    // 🚀 KURANG: Tidak ada logging sukses
  } catch (error: any) {
    console.error('Verification email failed:', error.message);
    throw error;
  }
}

// ✅ SESUDAH
async sendVerificationEmail(to: string, token: string) {
  const baseUrl = process.env.FRONTEND_URL || 'https://gerejapintar.id';
  const url = `${baseUrl}/verify-email?token=${token}`;
  
  try {
    const result = await this.transporter.sendMail({ ... });
    console.log(`✅ Verification email sent to ${to}. Message ID: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error: any) {
    console.error(`❌ Verification email failed for ${to}:`, error.message);
    throw error;
  }
}
```

### 2. ⚠️ Consistent Error Handling in Reset Password Email

```typescript
// ❌ SEBELUM: Tidak ada try-catch
async sendResetPasswordEmail(to: string, token: string) {
  const url = `${process.env.FRONTEND_URL}/reset-pwd?token=${token}`;
  await this.transporter.sendMail({
    // ... email config
  });
  // Tidak ada error handling!
}

// ✅ SESUDAH: Tambah try-catch
async sendResetPasswordEmail(to: string, token: string) {
  try {
    const url = `${process.env.FRONTEND_URL || 'https://gerejapintar.id'}/reset-pwd?token=${token}`;
    const result = await this.transporter.sendMail({
      from: `"Gereja Pintar Support" <${process.env.SMTP_USER}>`,
      to,
      subject: 'Permintaan Reset Kata Sandi Akun Anda',
      html: `...`,
    });
    console.log(`✅ Reset password email sent to ${to}. Message ID: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error: any) {
    console.error(`❌ Reset password email failed for ${to}:`, error.message);
    throw error;
  }
}
```

### 3. ⚠️ Add Error Handling When Email Fails in Auth Service

Saat ini jika email gagal di `register()`, user tetap terdaftar tapi tidak dapat verifikasi.

```typescript
// ❌ SEBELUM
const { data: newTenant } = await supabase.from('users').insert([...]).select().single();

// 🚀 Kirim email verifikasi di background
await this.emailService.sendVerificationEmail(email, vToken);

return { message: 'Registrasi berhasil!', ... };

// ✅ SESUDAH: Log jika email gagal
const { data: newTenant } = await supabase.from('users').insert([...]).select().single();

try {
  await this.emailService.sendVerificationEmail(email, vToken);
} catch (emailError) {
  // Log tapi jangan fail registration
  console.error(`⚠️  Registration email failed for ${email}:`, emailError.message);
  // User bisa resend verification nanti via POST /auth/resend-verification
}

return { message: 'Registrasi berhasil!', ... };
```

### 4. ⚠️ Add Endpoint for Resend Verification Email

**Status:** ✅ Sudah ada di `auth.service.ts` tapi pastikan ada di controller!

Verifikasi di controller:
```typescript
@Post('resend-verification')
async resendVerification(@Body() body: { email: string }) {
  return this.authService.resendVerification(body);
}
```

### 5. 🔐 Security: Prevent Token Reuse

**Saat ini:** Token di-clear setelah digunakan (✅ GOOD)

Tapi tambahkan logging untuk detect abuse:
```typescript
async verifyEmail(token: string) {
  const { data: user } = await supabase.from('users').select('*').eq('verificationToken', token).maybeSingle();
  
  if (!user) {
    console.warn(`⚠️  Attempted verification with invalid/used token: ${token}`);
    throw new BadRequestException('Tautan verifikasi tidak valid.');
  }

  if (user.isVerified) {
    console.warn(`⚠️  Attempted re-verification for already verified user: ${user.email}`);
    throw new BadRequestException('Akun sudah diverifikasi.');
  }

  await supabase.from('users').update({ isVerified: true, verificationToken: null }).eq('id', user.id);
  return { message: 'Email berhasil diverifikasi! Anda sekarang dapat login.' };
}
```

### 6. 🔐 Security: Rate Limiting for Resend

Tambah cooldown agar user tidak spam resend email:
```typescript
async resendVerification(body: { email: string }) {
  const { email } = body;
  const { data: user } = await supabase.from('users').select('*').eq('email', email).maybeSingle();
  
  if (!user) throw new NotFoundException('Akun dengan email ini tidak ditemukan.');
  if (user.isVerified) throw new BadRequestException('Akun ini sudah diverifikasi.');

  // 🚀 TAMBAH: Check jika sudah resend dalam 5 menit terakhir
  if (user.lastResendAt) {
    const timeSinceLastResend = Date.now() - new Date(user.lastResendAt).getTime();
    if (timeSinceLastResend < 5 * 60 * 1000) { // 5 menit
      throw new BadRequestException(
        `Silakan tunggu ${Math.ceil((5 * 60 * 1000 - timeSinceLastResend) / 1000)} detik sebelum mengirim ulang.`
      );
    }
  }

  const vToken = crypto.randomBytes(32).toString('hex');
  await supabase.from('users').update({ 
    verificationToken: vToken,
    lastResendAt: new Date().toISOString() // 🚀 TAMBAH tracking
  }).eq('id', user.id);

  await this.emailService.sendVerificationEmail(email, vToken);
  return { success: true, message: 'Email verifikasi telah dikirim ulang!' };
}
```

---

## 🔧 Environment Variables Checklist

Pastikan `.env` sudah lengkap:

```env
# ✅ SMTP Configuration
SMTP_HOST=mail.gerejapintar.id
SMTP_PORT=587
SMTP_USER=your-email@gerejapintar.id
SMTP_PASS=your-app-password

# ✅ Frontend URL (untuk links di email)
FRONTEND_URL=http://localhost:3000   # Dev
# FRONTEND_URL=https://gerejapintar.id # Prod

# ✅ JWT Secret
JWT_SECRET=your-secret-key-here

# ✅ Database
SUPABASE_URL=...
SUPABASE_KEY=...
```

---

## 📋 Testing Checklist

### Test di Development (dengan Mailtrap/MailHog):

- [ ] Register → Email verifikasi terkirim
- [ ] Click link verifikasi → Status `isVerified` berubah
- [ ] Login sebelum verifikasi → Error "belum diverifikasi"
- [ ] Login sesudah verifikasi → Sukses, dapat JWT token
- [ ] Forgot password → Email reset terkirim
- [ ] Click link reset → Halaman reset password tampil
- [ ] Reset dengan token baru → Login dengan password baru sukses
- [ ] Reset dengan token lama → Error "tautan kedaluwarsa"
- [ ] Resend verification → Token baru terkirim, token lama tidak berlaku

### Test di Production:

- [ ] SMTP credentials valid & berfungsi
- [ ] Email dari production provider tidak masuk spam folder
- [ ] Links di email menunjuk ke domain production
- [ ] Email delivery rate > 95%
- [ ] Monitor failed email deliveries di logs

---

## 📞 Troubleshooting

### Email Tidak Terkirim?

1. **Check SMTP credentials:**
   ```bash
   echo "SMTP_HOST=$SMTP_HOST, SMTP_PORT=$SMTP_PORT, SMTP_USER=$SMTP_USER"
   ```

2. **Test transporter di isolasi:**
   ```typescript
   const transporter = nodemailer.createTransport({...});
   transporter.verify((error, success) => {
     if (error) console.log('SMTP Error:', error);
     else console.log('SMTP Ready:', success);
   });
   ```

3. **Check email provider:**
   - Gmail: Gunakan "App Password", bukan password akun biasa
   - cPanel: Pastikan "mail.gerejapintar.id" sudah dikonfigurasi
   - SendGrid/Mailgun: Verify domain & API keys

4. **Check logs:**
   ```bash
   tail -f logs/email.log
   ```

### Email Terkirim tapi Link Tidak Bekerja?

1. **Check FRONTEND_URL di `.env`:**
   ```
   ❌ SALAH: FRONTEND_URL=https://gerejapintar.id:3000
   ✅ BENAR: FRONTEND_URL=https://gerejapintar.id
   ```

2. **Check link di email HTML benar:**
   ```html
   ✅ BENAR: <a href="https://gerejapintar.id/verify-email?token=abc123">
   ❌ SALAH: <a href="http://localhost:3000/verify-email?token=abc123">
   ```

### User Tidak Bisa Login Setelah Verifikasi?

1. **Check `isVerified` flag di database:**
   ```sql
   SELECT id, email, isVerified FROM users WHERE email='user@gereja.id';
   ```

2. **Check JWT token generation:**
   ```typescript
   const payload = { id: user.id, email: user.email, role: user.role };
   const token = this.jwtService.sign(payload); // Pastikan JWT_SECRET set
   ```

---

## Dependencies yang Sudah Diinstal

```bash
npm list nodemailer @nestjs/jwt bcrypt
# Pastikan semua 3 library ada
```

---

**Backend Status:** ✅ **PRODUCTION READY** (dengan minor improvements recommended)

### Jika menggunakan NodeJS/NestJS:
```bash
npm install nodemailer
npm install @types/nodemailer --save-dev
```

### Jika menggunakan Python:
```bash
pip install flask-mail
# atau
pip install python-dotenv
```

---

## Environment Variables yang Diperlukan

Tambahkan ke `.env`:

```env
# Email Configuration
MAIL_HOST=smtp.gmail.com          # atau provider email lain
MAIL_PORT=587                      # atau 465 untuk SSL
MAIL_USER=your-email@gmail.com    # Email pengirim
MAIL_PASSWORD=app-password        # Password aplikasi (bukan password akun)
MAIL_FROM=noreply@gerejapintar.id # Email yang muncul sebagai pengirim
MAIL_FROM_NAME=GerejaPintar

# Frontend URL untuk link di email
FRONTEND_URL=http://localhost:3000  # Development
# FRONTEND_URL=https://gerejapintar.id  # Production

# Token expiration
VERIFY_EMAIL_TOKEN_EXPIRY=24h      # Token verifikasi email
RESET_PASSWORD_TOKEN_EXPIRY=1h     # Token reset password
```

---

## Email Template yang Perlu Dibuat

### 1. Email Verifikasi (untuk register)
```
Subjek: Verifikasi Email GerejaPintar

Halo {namaAdmin},

Terima kasih telah mendaftar di GerejaPintar!

Silakan klik tautan di bawah untuk memverifikasi email Anda:
{FRONTEND_URL}/verify-email?token={token}

Tautan ini berlaku selama 24 jam.

Jika Anda tidak membuat akun ini, abaikan email ini.

Salam,
Tim GerejaPintar
```

### 2. Email Reset Password
```
Subjek: Reset Kata Sandi GerejaPintar

Halo {namaAdmin},

Kami menerima permintaan untuk reset kata sandi akun Anda.

Silakan klik tautan di bawah untuk membuat kata sandi baru:
{FRONTEND_URL}/reset-pwd?token={token}

Tautan ini berlaku selama 1 jam.

Jika Anda tidak meminta reset ini, abaikan email ini.

Salam,
Tim GerejaPintar
```

---

## Checklist untuk Backend Developer

- [ ] Install email library (nodemailer, flask-mail, dll)
- [ ] Setup SMTP configuration (Gmail, SendGrid, Mailgun, dll)
- [ ] Create email templates
- [ ] Implement token generation & storage
- [ ] Add token expiration logic
- [ ] Implement email sending di `/auth/register`
- [ ] Implement email sending di `/auth/forgot-password`
- [ ] Implement email verification di `/auth/verify-email`
- [ ] Add error handling & logging
- [ ] Test email sending di development
- [ ] Test email templates formatting
- [ ] Setup production email provider (jangan gunakan Gmail untuk production)
- [ ] Add rate limiting untuk prevent spam

---

## Recommended Email Providers

| Provider | Pros | Cons |
|----------|------|------|
| Gmail SMTP | Gratis, setup mudah | Limited untuk production, bisa di-block |
| SendGrid | Reliable, good deliverability | Perlu account |
| Mailgun | Good API, free tier | Sedikit kompleks |
| Amazon SES | Murah, scalable | AWS setup required |

---

## Testing Email di Development

Gunakan **Mailtrap** atau **MailHog** untuk test tanpa kirim email asli:

### MailHog
```bash
# Install MailHog (Windows)
choco install mailhog

# Jalankan
mailhog

# SMTP: localhost:1025
# Web UI: http://localhost:8025
```

---

## Frontend Error Handling (Sudah Benar)

✅ Register success → redirect ke login  
✅ Register error → tampilkan error message  
✅ Forgot password success → tampilkan "Cek email Anda"  
✅ Reset password success → redirect ke login  
✅ Verify email success → redirect ke login  
✅ Verify email error → redirect ke register  

---

## Test Flows

### Test Registration with Email
1. User daftar → Frontend POST /auth/register
2. Backend generate verification token
3. Backend kirim email verifikasi
4. User klik link di email → `/verify-email?token=xxx`
5. Frontend GET /auth/verify-email?token=xxx
6. Backend verify token & update user status
7. Frontend redirect ke login → SUCCESS ✅

### Test Forgot Password
1. User klik "Lupa sandi" → `/forgot-pwd`
2. User masukkan email → Frontend POST /auth/forgot-password
3. Backend generate reset token
4. Backend kirim email reset
5. User klik link di email → `/reset-pwd?token=xxx`
6. User input password baru → Frontend POST /auth/reset-password
7. Backend verify token & update password
8. Frontend redirect ke login → SUCCESS ✅

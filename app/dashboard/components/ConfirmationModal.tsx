"use client"

import { useEffect } from "react"
import { AlertTriangle, Info, CheckCircle2, X } from "lucide-react"

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "info" | "success";
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Apakah Anda yakin?",
  description = "Tindakan ini tidak dapat dibatalkan dan akan berdampak pada sistem.",
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
  variant = "danger"
}: ConfirmationModalProps) {
  
  // Mengunci scroll layar utama ketika popup terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  if (!isOpen) return null

  // Konfigurasi warna & icon berdasarkan variasi kebutuhan aksi
  const variants = {
    danger: {
      icon: <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />,
      bgIcon: "bg-red-50 dark:bg-red-950/30",
      btnConfirm: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    },
    info: {
      icon: <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      bgIcon: "bg-blue-50 dark:bg-blue-950/30",
      btnConfirm: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    },
    success: {
      icon: <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      bgIcon: "bg-emerald-50 dark:bg-emerald-950/30",
      btnConfirm: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500",
    }
  }

  const currentVariant = variants[variant]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
      {/* Backdrop Kaca Transparan */}
      <div 
        className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Box Card Konten Utama */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left shadow-2xl transition-all duration-300 scale-95 md:scale-100 font-sans border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Tombol Close Pojok Kanan Atas */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-500 transition-colors focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Content Pop Up */}
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${currentVariant.bgIcon}`}>
            {currentVariant.icon}
          </div>
          <div className="flex-1 mt-1">
            <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
              {title}
            </h3>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Tombol Aksi (Footer Area) */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-150"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className={`w-full sm:w-auto inline-flex justify-center items-center rounded-xl px-4 py-2 text-xs font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-850 transition-all duration-150 ${currentVariant.btnConfirm}`}
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  )
}
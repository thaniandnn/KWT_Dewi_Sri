import React, { useState, useEffect } from 'react'
import { X, Lock, Eye, EyeOff, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface PinModalProps {
  isOpen: boolean
  onClose: () => void
}

const GEMINI_CANVAS_URL = 'https://gemini.google.com/share/e8d24e71fc60'
const CORRECT_PIN = '1234'

export const PinModal = ({ isOpen, onClose }: PinModalProps) => {
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [shake, setShake] = useState(false)

  // LOCK SCROLL SAAT MODAL TERBUKA
  useEffect(() => {
    if (isOpen) {
      // Simpan posisi scroll saat ini
      const scrollY = window.scrollY
      
      // Lock body
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
    } else {
      // Unlock body + restore posisi scroll
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      
      // Kembalikan ke posisi scroll semula
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }

    // Cleanup saat komponen unmount
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSubmit = () => {
    if (pin.length === 0) {
      setError('Masukkan PIN terlebih dahulu.')
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      if (pin === CORRECT_PIN) {
        setIsLoading(false)
        handleClose()
        window.open(GEMINI_CANVAS_URL, '_blank')
      } else {
        setError('PIN salah. Silakan coba lagi.')
        setIsLoading(false)
        setShake(true)
        setPin('')
        setTimeout(() => setShake(false), 500)
      }
    }, 600)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setPin('')
      setError('')
      setIsLoading(false)
    }, 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') handleClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP — full screen, klik untuk close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50
                       bg-black/70 backdrop-blur-sm"
          />

          {/* MODAL WRAPPER — scroll container */}
          <div className="fixed inset-0 z-50
                          flex items-center justify-center
                          px-4 py-8">

            {/* MODAL BOX */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: 'spring', duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-[400px]
                          bg-white rounded-2xl shadow-2xl
                          overflow-hidden mx-auto
                          ${shake ? 'animate-shake' : ''}`}
            >

              {/* HEADER */}
              <div className="bg-black px-5 pt-5 pb-5 relative">

                {/* Tombol X close — selalu visible */}
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3
                             w-8 h-8 rounded-full
                             bg-white/15 text-white/70
                             flex items-center justify-center
                             hover:bg-white/25 hover:text-white
                             active:scale-95
                             transition-all duration-200
                             z-10">
                  <X className="w-4 h-4" />
                </button>

                {/* Icon */}
                <div className="w-11 h-11 lg:w-12 lg:h-12 
                                rounded-xl bg-kwt-orange
                                flex items-center justify-center
                                mb-3 lg:mb-4">
                  <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 
                                       text-white" />
                </div>

                {/* Judul */}
                <h2 className="font-playfair 
                               text-xl lg:text-2xl
                               font-bold text-white mb-1">
                  AI Content{' '}
                  <span className="text-kwt-orange">Tools</span>
                </h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  Masukkan PIN eksklusif untuk membuka
                  toolkit pemasaran KWT Dewi Sri.
                </p>
              </div>

              {/* BODY */}
              <div className="px-5 py-5 lg:px-6 lg:py-6
                              flex flex-col gap-4">

                {/* Input PIN */}
                <div className="flex flex-col gap-2">

                  {/* Label + counter */}
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] lg:text-xs 
                                      text-gray-400 uppercase 
                                      tracking-widest font-medium">
                      Access Code
                    </label>
                    <span className="text-[10px] lg:text-xs 
                                     text-kwt-orange font-medium">
                      {pin.length} / 10
                    </span>
                  </div>

                  {/* Input */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2
                                    -translate-y-1/2">
                      <Lock className="w-4 h-4 text-kwt-orange" />
                    </div>
                    <input
                      type={showPin ? 'text' : 'password'}
                      value={pin}
                      onChange={(e) => {
                        setPin(e.target.value)
                        setError('')
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="••••"
                      maxLength={10}
                      autoFocus
                      className="w-full pl-11 pr-11 
                                 py-3 lg:py-3.5
                                 border-2 rounded-xl 
                                 text-sm text-black 
                                 placeholder-gray-300
                                 outline-none
                                 border-gray-200
                                 focus:border-kwt-orange
                                 focus:ring-2
                                 focus:ring-kwt-orange/20
                                 transition-all duration-200
                                 tracking-[6px] font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-4 top-1/2
                                 -translate-y-1/2 text-gray-400
                                 hover:text-kwt-orange
                                 transition-colors">
                      {showPin
                        ? <EyeOff className="w-4 h-4" />
                        : <Eye className="w-4 h-4" />
                      }
                    </button>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs
                                 flex items-center gap-1">
                      <span>⚠</span> {error}
                    </motion.p>
                  )}
                </div>

                {/* Tombol Unlock */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-black text-white
                             py-3 lg:py-3.5 
                             rounded-xl font-medium text-sm
                             flex items-center justify-center gap-2
                             hover:bg-neutral-800
                             active:scale-95
                             disabled:opacity-60
                             disabled:cursor-not-allowed
                             transition-all duration-200">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2
                                      border-white/30
                                      border-t-white
                                      rounded-full animate-spin" />
                      Memverifikasi...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Unlock Access
                    </>
                  )}
                </button>

                {/* Info */}
                <p className="text-center text-gray-400
                              text-xs leading-relaxed">
                  PIN diberikan oleh pengurus kepada<br />
                  anggota aktif KWT Dewi Sri.
                </p>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

'use client'
import { useEffect, useState } from 'react'

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }

  // Always show the button for testing. Remove this later.
  return (
    <button
      onClick={handleInstall}
      disabled={!deferredPrompt}
      className="mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold text-lg shadow-lg shadow-[#6366f1]/50 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isInstalled 
        ? 'App Installed ✓' 
        : deferredPrompt 
        ? 'Install App' 
        : 'Install Not Available'}
    </button>
  )
}

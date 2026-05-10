import InstallPWA from '@/components/InstallPWA'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0e27] p-6 flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center">
          <span className="text-4xl font-black text-white">V</span>
        </div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent mb-4">
          Void Study Hub
        </h1>
        <p className="text-[#94a3b8] text-lg mb-8">Your focused study space</p>
        <InstallPWA />
      </div>
    </main>
  )
}

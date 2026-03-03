import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, FileText, Download, Wifi, WifiOff, Bell } from 'lucide-react'

export default function Header({ onGenerateReport, onExportPDF }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  })
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  })

  return (
    <header className="h-16 bg-cyber-card border-b border-cyber-border flex items-center justify-between px-6 shrink-0 z-20">
      {/* Logo & Branding */}
      <div className="flex items-center gap-4">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative">
            <Shield size={28} className="text-cyber-blue" />
            <div className="absolute inset-0 text-cyber-blue animate-ping opacity-20">
              <Shield size={28} />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold gradient-text leading-tight">TrustGraph AI</h1>
            <p className="text-xs text-gray-500 leading-tight">Zero Trust Intelligence Platform</p>
          </div>
        </motion.div>

        <div className="h-8 w-px bg-cyber-border mx-2" />

        {/* EY Badge */}
        <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-3 py-1">
          <span className="text-yellow-400 font-bold text-sm">EY</span>
          <span className="text-gray-400 text-xs">|</span>
          <span className="text-gray-400 text-xs">Tech Consulting</span>
        </div>
      </div>

      {/* Center - Status */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-risk-low animate-pulse' : 'bg-risk-high'}`} />
          {isConnected ? (
            <span className="flex items-center gap-1"><Wifi size={12} /> Live Monitoring</span>
          ) : (
            <span className="flex items-center gap-1"><WifiOff size={12} /> Disconnected</span>
          )}
        </div>

        <div className="text-xs text-gray-500 font-mono">
          <span className="text-gray-400">{formattedDate}</span>
          <span className="text-cyber-blue ml-2">{formattedTime}</span>
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-gray-400 hover:text-cyber-blue transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-risk-high rounded-full" />
        </button>

        <button
          onClick={onGenerateReport}
          className="flex items-center gap-2 bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 hover:border-cyber-blue/60 text-cyber-blue text-sm px-4 py-2 rounded-lg transition-all duration-200"
        >
          <FileText size={16} />
          <span>Executive Report</span>
        </button>

        <button
          onClick={onExportPDF}
          className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 hover:border-blue-500/60 text-blue-400 text-sm px-4 py-2 rounded-lg transition-all duration-200"
        >
          <Download size={16} />
          <span>Export</span>
        </button>

        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyber-blue to-blue-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:scale-110 transition-transform">
          EY
        </div>
      </div>
    </header>
  )
}

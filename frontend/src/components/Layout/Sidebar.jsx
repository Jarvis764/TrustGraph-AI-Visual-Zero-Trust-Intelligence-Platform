import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Network, ShieldAlert, FileBarChart,
  Settings, HelpCircle, ChevronLeft, ChevronRight
} from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'graph', label: 'Graph View', icon: Network },
  { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help', icon: HelpCircle }
]

export default function Sidebar({ isCollapsed, onToggle, activeSection, onSectionChange }) {
  return (
    <motion.aside
      animate={{ width: isCollapsed ? 64 : 220 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="h-full bg-cyber-card border-r border-cyber-border flex flex-col relative shrink-0 z-10"
    >
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 w-6 h-6 bg-cyber-card border border-cyber-border rounded-full flex items-center justify-center text-gray-400 hover:text-cyber-blue hover:border-cyber-blue transition-all z-20"
      >
        {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Nav items */}
      <nav className="flex-1 pt-6 px-2 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id
          return (
            <button
              key={id}
              onClick={() => onSectionChange(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group relative ${
                isActive
                  ? 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <Icon size={20} className="shrink-0" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-cyber-blue rounded-r"
                />
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-cyber-border z-50 transition-opacity">
                  {label}
                </div>
              )}
            </button>
          )
        })}
      </nav>

      {/* EY Branding */}
      <div className="p-4 border-t border-cyber-border">
        <AnimatePresence>
          {!isCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="text-yellow-400 font-bold text-lg leading-none">EY</div>
              <div className="text-gray-500 text-xs mt-1">Cyber Security</div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="text-yellow-400 font-bold text-sm">EY</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  )
}

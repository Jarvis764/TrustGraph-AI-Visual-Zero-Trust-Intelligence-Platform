import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react'

const icons = {
  success: <CheckCircle size={18} className="text-risk-low" />,
  warning: <AlertTriangle size={18} className="text-risk-medium" />,
  error: <XCircle size={18} className="text-risk-high" />,
  info: <Info size={18} className="text-cyber-blue" />
}

const borderColors = {
  success: 'border-risk-low',
  warning: 'border-risk-medium',
  error: 'border-risk-high',
  info: 'border-cyber-blue'
}

export default function Toast({ message, type = 'success', onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 80, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 80, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`flex items-start gap-3 bg-cyber-card border ${borderColors[type]} rounded-xl p-4 shadow-2xl max-w-sm`}
      >
        <div className="mt-0.5 shrink-0">{icons[type]}</div>
        <p className="text-sm text-gray-200 flex-1">{message}</p>
        <button
          onClick={onClose}
          className="shrink-0 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}

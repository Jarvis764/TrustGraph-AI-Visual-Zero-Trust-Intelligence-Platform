import { motion } from 'framer-motion'
import { initialEdges } from '../../data/graphData'
import { filterZeroTrustEdges } from '../../utils/riskCalculator'

export default function ZeroTrustToggle({ isEnabled, onToggle, nodeCount, edgeCount, riskBefore, riskAfter }) {
  const blockedEdges = initialEdges.length - filterZeroTrustEdges(initialEdges).length
  const riskChange = riskBefore - riskAfter

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isEnabled ? 'bg-risk-low' : 'bg-risk-high'} animate-pulse`} />
          <div>
            <h3 className="text-sm font-bold text-white">
              {isEnabled ? 'ZERO TRUST ACTIVE' : 'ZERO TRUST INACTIVE'}
            </h3>
            <p className="text-xs text-gray-500">
              {isEnabled ? 'High-risk paths blocked' : 'All paths visible'}
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={onToggle}
          className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none ${
            isEnabled ? 'bg-risk-low' : 'bg-gray-700'
          }`}
          aria-label="Toggle Zero Trust Mode"
        >
          <motion.div
            animate={{ x: isEnabled ? 26 : 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
          />
          {isEnabled && (
            <div className="absolute inset-0 rounded-full animate-glow-pulse" style={{ boxShadow: '0 0 10px #10B981' }} />
          )}
        </button>
      </div>

      {/* Mode label */}
      <div className={`text-center text-xs font-bold tracking-widest py-1.5 rounded-lg mb-3 ${
        isEnabled
          ? 'bg-risk-low/10 text-risk-low border border-risk-low/30'
          : 'bg-risk-high/10 text-risk-high border border-risk-high/30'
      }`}>
        {isEnabled ? '✓ AFTER ZERO TRUST' : '✗ BEFORE ZERO TRUST'}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-black/20 rounded-lg p-2">
          <div className={`text-lg font-bold ${isEnabled ? 'text-risk-low' : 'text-risk-high'}`}>
            {isEnabled ? blockedEdges : 0}
          </div>
          <div className="text-xs text-gray-500 leading-tight">Paths<br />Blocked</div>
        </div>
        <div className="bg-black/20 rounded-lg p-2">
          <div className={`text-lg font-bold ${isEnabled ? 'text-risk-low' : 'text-gray-400'}`}>
            {isEnabled ? `-${riskChange}` : '—'}
          </div>
          <div className="text-xs text-gray-500 leading-tight">Risk<br />Reduced</div>
        </div>
        <div className="bg-black/20 rounded-lg p-2">
          <div className={`text-lg font-bold ${isEnabled ? 'text-cyber-blue' : 'text-gray-400'}`}>
            {edgeCount}
          </div>
          <div className="text-xs text-gray-500 leading-tight">Active<br />Paths</div>
        </div>
      </div>
    </div>
  )
}

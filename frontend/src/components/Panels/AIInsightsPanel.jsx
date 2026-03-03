import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, AlertTriangle, CheckCircle, TrendingDown, Zap, ChevronRight } from 'lucide-react'
import LoadingSpinner from '../Common/LoadingSpinner'
import GlowCard from '../Common/GlowCard'
import { getRiskColor, getRiskBadgeClass } from '../../utils/riskCalculator'

const nodeIcons = {
  user: '👤',
  device: '💻',
  application: '📱',
  database: '🗄️',
  cloud: '☁️',
  connection: '🔗'
}

export default function AIInsightsPanel({ selectedItem, analysisResult, isLoading, isOpen, onClose, onAnalyze }) {
  if (!selectedItem) return null

  const isEdge = selectedItem.source !== undefined
  const itemData = isEdge ? selectedItem.data : selectedItem.data
  const riskLevel = itemData?.riskLevel || 'low'
  const riskColor = getRiskColor(riskLevel)
  const badgeClass = getRiskBadgeClass(riskLevel)
  const icon = isEdge ? '🔗' : nodeIcons[itemData?.nodeType] || '🔷'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-80 h-full bg-cyber-card border-l border-cyber-border flex flex-col overflow-hidden shrink-0"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-cyber-border">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-cyber-blue" />
              <span className="text-sm font-bold text-white">AI Risk Analysis</span>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Selected Item Info */}
            <div className="p-4 border-b border-cyber-border">
              <GlowCard riskLevel={riskLevel}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl" style={{ filter: `drop-shadow(0 0 6px ${riskColor})` }}>
                    {icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">
                      {itemData?.label || (isEdge ? `${selectedItem.source} → ${selectedItem.target}` : selectedItem.id)}
                    </h3>
                    <p className="text-xs text-gray-500 capitalize mt-0.5">
                      {isEdge ? 'Access Connection' : itemData?.nodeType}
                    </p>
                    <div className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded mt-1.5 ${badgeClass}`}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: riskColor }} />
                      {riskLevel?.toUpperCase()} RISK
                    </div>
                  </div>
                  {!isEdge && (
                    <div className="text-right">
                      <div className="text-xl font-bold" style={{ color: riskColor }}>
                        {itemData?.riskScore}
                      </div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                  )}
                </div>

                {itemData?.description && (
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {itemData.description}
                  </p>
                )}

                {!isEdge && itemData?.department && (
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>Dept: <span className="text-gray-300">{itemData.department}</span></span>
                    <span>Last: <span className="text-gray-300">{itemData.lastAccess}</span></span>
                  </div>
                )}
              </GlowCard>

              {/* Analyze button */}
              {!analysisResult && !isLoading && (
                <button
                  onClick={() => onAnalyze(isEdge ? { ...itemData, id: selectedItem.id, source: selectedItem.source, target: selectedItem.target } : itemData)}
                  className="w-full mt-3 flex items-center justify-center gap-2 bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/40 hover:border-cyber-blue text-cyber-blue text-sm py-2.5 rounded-xl transition-all duration-200 font-medium"
                >
                  <Zap size={16} />
                  Analyze with AI
                </button>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="p-8 flex flex-col items-center gap-4">
                <LoadingSpinner size="lg" text="Analyzing with AI..." />
                <div className="space-y-2 w-full">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`h-3 bg-gray-800 rounded animate-pulse`} style={{ width: `${85 - i * 10}%` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Analysis Result */}
            {analysisResult && !isLoading && (
              <div className="p-4 space-y-4">
                {/* Risk Explanation */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={14} style={{ color: riskColor }} />
                    <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Risk Explanation</h4>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed bg-black/20 rounded-lg p-3">
                    {analysisResult.riskExplanation}
                  </p>
                </div>

                {/* Risk Reduction */}
                {analysisResult.riskReduction && (
                  <div className="bg-risk-low/10 border border-risk-low/30 rounded-xl p-3 flex items-center gap-3">
                    <TrendingDown size={20} className="text-risk-low shrink-0" />
                    <div>
                      <div className="text-risk-low font-bold text-lg leading-none">
                        -{analysisResult.riskReduction}%
                      </div>
                      <div className="text-xs text-gray-400">Estimated risk reduction after remediation</div>
                    </div>
                  </div>
                )}

                {/* Remediation Steps */}
                {analysisResult.remediationSteps?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={14} className="text-risk-low" />
                      <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Remediation Plan</h4>
                    </div>
                    <div className="space-y-2">
                      {analysisResult.remediationSteps.map((step, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-400 bg-black/20 rounded-lg p-2.5">
                          <div className="w-5 h-5 bg-cyber-blue/10 border border-cyber-blue/30 rounded-full flex items-center justify-center text-cyber-blue font-bold shrink-0 text-xs">
                            {i + 1}
                          </div>
                          <span className="leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Business Impact */}
                {analysisResult.businessImpact && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ChevronRight size={14} className="text-risk-medium" />
                      <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Business Impact</h4>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed bg-risk-medium/5 border border-risk-medium/20 rounded-lg p-3">
                      {analysisResult.businessImpact}
                    </p>
                  </div>
                )}

                {/* Re-analyze button */}
                <button
                  onClick={() => onAnalyze(isEdge ? { ...itemData, id: selectedItem.id, source: selectedItem.source, target: selectedItem.target } : itemData)}
                  className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-cyber-border text-gray-400 hover:text-cyber-blue text-xs py-2 rounded-xl transition-all"
                >
                  <Zap size={12} />
                  Re-analyze
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

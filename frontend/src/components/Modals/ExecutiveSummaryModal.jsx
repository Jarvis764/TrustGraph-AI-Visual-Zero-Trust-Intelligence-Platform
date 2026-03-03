import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, AlertTriangle, TrendingDown, CheckCircle, Download, FileText, DollarSign } from 'lucide-react'
import LoadingSpinner from '../Common/LoadingSpinner'

const getRiskColor = (score) => {
  if (score >= 80) return '#DC2626'
  if (score >= 60) return '#EF4444'
  if (score >= 40) return '#F59E0B'
  return '#10B981'
}

const getSeverityColor = (severity) => {
  const colors = { critical: '#DC2626', high: '#EF4444', medium: '#F59E0B', low: '#10B981' }
  return colors[severity] || '#6B7280'
}

export default function ExecutiveSummaryModal({ isOpen, onClose, summaryData, isLoading }) {
  const handleExport = () => {
    const content = summaryData
      ? `TRUSTGRAPH AI — EXECUTIVE SECURITY BRIEFING\n\nPrepared by: ${summaryData.preparedBy || 'EY Technology Consulting'}\nDate: ${new Date(summaryData.reportDate || Date.now()).toLocaleDateString()}\n\nOVERALL RISK SCORE: ${summaryData.overallRiskScore}/100\n\nCFO SUMMARY:\n${summaryData.cfoSummary}\n\nSTRATEGIC RECOMMENDATIONS:\n${summaryData.strategicRecommendations?.map((r, i) => `${i + 1}. ${r.title}\n   Timeline: ${r.timeline} | Effort: ${r.effort} | Impact: ${r.impact}\n   ${r.detail}`).join('\n\n')}`
      : 'No data available'
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `TrustGraph-Executive-Report-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="w-full max-w-5xl bg-cyber-card border border-cyber-border border-b-0 rounded-t-2xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-cyber-border shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyber-blue/10 border border-cyber-blue/30 rounded-xl flex items-center justify-center">
                  <FileText size={20} className="text-cyber-blue" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Executive Security Briefing</h2>
                  <p className="text-sm text-gray-400">
                    {summaryData?.preparedBy || 'EY Technology Consulting | Cybersecurity Practice'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm px-4 py-2 rounded-xl transition-all"
                >
                  <Download size={16} />
                  Export Report
                </button>
                <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <LoadingSpinner size="lg" text="Generating executive report..." />
                </div>
              ) : summaryData ? (
                <div className="p-6 space-y-6">
                  {/* Risk Score + Date */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 bg-black/30 rounded-2xl p-6 flex flex-col items-center justify-center border border-cyber-border">
                      <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Overall Risk Score</div>
                      <div
                        className="text-6xl font-black leading-none"
                        style={{ color: getRiskColor(summaryData.overallRiskScore) }}
                      >
                        {summaryData.overallRiskScore}
                      </div>
                      <div className="text-gray-500 text-sm mt-1">/ 100</div>
                      <div
                        className="mt-3 text-sm font-bold px-4 py-1 rounded-full"
                        style={{
                          backgroundColor: `${getRiskColor(summaryData.overallRiskScore)}20`,
                          color: getRiskColor(summaryData.overallRiskScore),
                          border: `1px solid ${getRiskColor(summaryData.overallRiskScore)}40`
                        }}
                      >
                        {summaryData.overallRiskScore >= 80 ? 'CRITICAL' : summaryData.overallRiskScore >= 60 ? 'HIGH' : summaryData.overallRiskScore >= 40 ? 'MEDIUM' : 'LOW'} RISK
                      </div>
                    </div>

                    {/* Zero Trust Improvements */}
                    {summaryData.zeroTrustImprovements && (
                      <div className="col-span-2 bg-black/30 rounded-2xl p-5 border border-cyber-border">
                        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
                          <Shield size={16} className="text-risk-low" />
                          Zero Trust Impact
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: 'Risk Reduction', value: `${summaryData.zeroTrustImprovements.riskReduction}%`, color: '#10B981' },
                            { label: 'Attack Paths Blocked', value: summaryData.zeroTrustImprovements.attackPathsBlocked, color: '#EF4444' },
                            { label: 'Assets Protected', value: summaryData.zeroTrustImprovements.assetsProtected, color: '#00D4FF' },
                            { label: 'Annual Savings', value: summaryData.zeroTrustImprovements.estimatedAnnualSavings, color: '#F59E0B' }
                          ].map(({ label, value, color }) => (
                            <div key={label} className="bg-black/20 rounded-xl p-3">
                              <div className="font-bold text-lg leading-none" style={{ color }}>{value}</div>
                              <div className="text-xs text-gray-500 mt-1">{label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Key Attack Paths */}
                  {summaryData.keyAttackPaths?.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-risk-high" />
                        Key Attack Paths
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {summaryData.keyAttackPaths.map((path, i) => (
                          <div
                            key={i}
                            className="bg-black/20 rounded-xl p-4 border"
                            style={{ borderColor: `${getSeverityColor(path.severity)}30` }}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <span
                                className="text-xs font-bold px-2 py-0.5 rounded"
                                style={{
                                  backgroundColor: `${getSeverityColor(path.severity)}15`,
                                  color: getSeverityColor(path.severity),
                                  border: `1px solid ${getSeverityColor(path.severity)}30`
                                }}
                              >
                                {path.severity?.toUpperCase()}
                              </span>
                              <span className="text-xs text-gray-500">Likelihood: {path.likelihood}</span>
                            </div>
                            <div className="text-xs font-mono text-cyber-blue mb-1.5 leading-tight">
                              {path.path}
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">{path.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Strategic Recommendations */}
                  {summaryData.strategicRecommendations?.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
                        <CheckCircle size={16} className="text-risk-low" />
                        Strategic Recommendations
                      </h3>
                      <div className="space-y-3">
                        {summaryData.strategicRecommendations.map((rec, i) => (
                          <div key={i} className="bg-black/20 rounded-xl p-4 border border-cyber-border flex gap-4">
                            <div className="w-8 h-8 bg-cyber-blue/10 border border-cyber-blue/30 rounded-full flex items-center justify-center text-cyber-blue font-bold shrink-0">
                              {rec.priority}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-sm font-bold text-white">{rec.title}</h4>
                                <div className="flex gap-2 shrink-0">
                                  <span className="text-xs text-gray-400 bg-black/30 px-2 py-0.5 rounded">{rec.timeline}</span>
                                  <span className="text-xs text-risk-low bg-risk-low/10 border border-risk-low/20 px-2 py-0.5 rounded">
                                    Impact: {rec.impact}
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{rec.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CFO Summary */}
                  {summaryData.cfoSummary && (
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-5">
                      <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center gap-2">
                        <DollarSign size={16} />
                        Explain to CFO / CEO
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">{summaryData.cfoSummary}</p>
                    </div>
                  )}

                  {/* Compliance Status */}
                  {summaryData.complianceStatus && (
                    <div>
                      <h3 className="text-sm font-bold text-gray-300 mb-3">Compliance Status</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {Object.entries(summaryData.complianceStatus).map(([framework, status]) => {
                          const isOk = status.includes('Aligned') || status.includes('Compliant')
                          const isRisk = status.includes('Risk') || status.includes('Non-Compliant') || status.includes('Tier 1')
                          const color = isOk ? '#10B981' : isRisk ? '#EF4444' : '#F59E0B'
                          return (
                            <div key={framework} className="bg-black/20 rounded-xl p-3 text-center border border-cyber-border">
                              <div className="text-xs font-bold text-white mb-1">{framework}</div>
                              <div className="text-xs leading-tight" style={{ color }}>{status}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <FileText size={40} className="text-gray-600" />
                  <p className="text-gray-400 text-sm">No report data available. Generate a report first.</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

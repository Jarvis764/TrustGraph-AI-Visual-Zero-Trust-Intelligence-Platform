const RISK_LEVELS = [
  { level: 'critical', label: 'Critical', color: '#DC2626', bgColor: 'bg-risk-critical' },
  { level: 'high', label: 'High', color: '#EF4444', bgColor: 'bg-risk-high' },
  { level: 'medium', label: 'Medium', color: '#F59E0B', bgColor: 'bg-risk-medium' },
  { level: 'low', label: 'Low', color: '#10B981', bgColor: 'bg-risk-low' }
]

export default function RiskLegend({ nodes }) {
  const counts = RISK_LEVELS.reduce((acc, { level }) => {
    acc[level] = (nodes || []).filter(n => n.data?.riskLevel === level).length
    return acc
  }, {})

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-xl p-4">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Risk Legend</h3>
      <div className="space-y-2">
        {RISK_LEVELS.map(({ level, label, color }) => (
          <div key={level} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
              />
              <span className="text-xs text-gray-300 capitalize">{label}</span>
            </div>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${color}20`,
                color: color,
                border: `1px solid ${color}40`
              }}
            >
              {counts[level]}
            </span>
          </div>
        ))}
      </div>

      {/* Edge legend */}
      <div className="mt-3 pt-3 border-t border-cyber-border">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Connections</h4>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-risk-critical" style={{ boxShadow: '0 0 4px #DC2626' }} />
            <span className="text-xs text-gray-400">Critical Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 border-t border-dashed border-risk-high" />
            <span className="text-xs text-gray-400">High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-risk-medium opacity-60" />
            <span className="text-xs text-gray-400">Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-risk-low opacity-60" />
            <span className="text-xs text-gray-400">Low Risk</span>
          </div>
        </div>
      </div>
    </div>
  )
}

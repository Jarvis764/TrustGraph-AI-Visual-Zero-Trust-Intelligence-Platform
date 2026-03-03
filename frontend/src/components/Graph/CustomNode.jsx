import { Handle, Position } from 'reactflow'
import { getRiskGlowClass, getRiskBadgeClass } from '../../utils/riskCalculator'

const nodeIcons = {
  user: '👤',
  device: '💻',
  application: '📱',
  database: '🗄️',
  cloud: '☁️'
}

const riskColors = {
  critical: '#DC2626',
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#10B981'
}

export default function CustomNode({ data, selected }) {
  const icon = nodeIcons[data.nodeType] || '🔷'
  const riskColor = riskColors[data.riskLevel] || '#6B7280'
  const glowClass = getRiskGlowClass(data.riskLevel)
  const badgeClass = getRiskBadgeClass(data.riskLevel)

  return (
    <div
      className={`relative bg-cyber-card rounded-xl border-2 px-3 py-2.5 min-w-[140px] max-w-[160px] transition-all duration-300 ${glowClass} ${
        selected ? 'ring-2 ring-cyber-blue ring-offset-2 ring-offset-cyber-dark scale-105' : ''
      }`}
      style={{ borderColor: riskColor }}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-cyber-blue !border-cyber-dark !w-2.5 !h-2.5"
      />

      {/* Risk indicator bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
        style={{ backgroundColor: riskColor }}
      />

      <div className="flex items-start gap-2">
        {/* Icon */}
        <div
          className="text-xl leading-none mt-0.5 shrink-0"
          style={{ filter: `drop-shadow(0 0 4px ${riskColor})` }}
        >
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          {/* Label */}
          <div className="text-xs font-bold text-white leading-tight truncate" title={data.label}>
            {data.label}
          </div>

          {/* Type */}
          <div className="text-xs text-gray-500 capitalize mt-0.5">{data.nodeType}</div>

          {/* Risk badge */}
          <div className={`inline-flex items-center gap-1 text-xs font-bold px-1.5 py-0.5 rounded mt-1.5 ${badgeClass}`}>
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: riskColor }}
            />
            {data.riskLevel?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Risk score bar */}
      <div className="mt-2 bg-gray-800 rounded-full h-1 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${data.riskScore || 0}%`,
            backgroundColor: riskColor,
            boxShadow: `0 0 6px ${riskColor}`
          }}
        />
      </div>
      <div className="flex justify-between text-xs mt-0.5">
        <span className="text-gray-600">Risk Score</span>
        <span style={{ color: riskColor }} className="font-bold">{data.riskScore}</span>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-cyber-blue !border-cyber-dark !w-2.5 !h-2.5"
      />
    </div>
  )
}

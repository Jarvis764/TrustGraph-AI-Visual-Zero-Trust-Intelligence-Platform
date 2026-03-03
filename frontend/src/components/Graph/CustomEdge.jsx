import { useState } from 'react'
import { getBezierPath, EdgeLabelRenderer } from 'reactflow'
import { getRiskColor } from '../../utils/riskCalculator'

export default function CustomEdge({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition, data, markerEnd, style
}) {
  const [isHovered, setIsHovered] = useState(false)
  const riskLevel = data?.riskLevel || 'low'
  const color = getRiskColor(riskLevel)
  const isAnimated = data?.animated || riskLevel === 'critical'
  const isHighRisk = riskLevel === 'critical' || riskLevel === 'high'

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition
  })

  const strokeWidth = riskLevel === 'critical' ? 2.5 : riskLevel === 'high' ? 2 : 1.5
  const opacity = riskLevel === 'low' ? 0.5 : riskLevel === 'medium' ? 0.7 : 0.9

  return (
    <>
      {/* Glow layer for high-risk edges */}
      {isHighRisk && (
        <path
          d={edgePath}
          stroke={color}
          strokeWidth={strokeWidth + 4}
          fill="none"
          strokeOpacity={0.15}
          style={{ filter: `blur(4px)` }}
        />
      )}

      {/* Hover hit area */}
      <path
        d={edgePath}
        stroke="transparent"
        strokeWidth={12}
        fill="none"
        className="cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Main edge */}
      <path
        id={id}
        d={edgePath}
        stroke={color}
        strokeWidth={isHovered ? strokeWidth + 1 : strokeWidth}
        fill="none"
        strokeOpacity={isHovered ? 1 : opacity}
        strokeDasharray={isHighRisk ? '8 4' : undefined}
        markerEnd={markerEnd}
        style={{
          ...(style || {}),
          filter: isHovered ? `drop-shadow(0 0 4px ${color})` : undefined,
          animation: isAnimated ? `attackPathAnim 1.5s linear infinite` : undefined,
          transition: 'stroke-width 0.2s, stroke-opacity 0.2s'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Edge label on hover */}
      {isHovered && data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'none',
              zIndex: 1000
            }}
          >
            <div
              className="text-xs font-semibold px-2 py-1 rounded-lg border whitespace-nowrap"
              style={{
                backgroundColor: '#111827',
                color: color,
                borderColor: `${color}60`,
                boxShadow: `0 0 12px ${color}40`
              }}
            >
              {data.label}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

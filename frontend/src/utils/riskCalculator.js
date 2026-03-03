export const getRiskColor = (riskLevel) => {
  const colors = {
    critical: '#DC2626',
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981'
  }
  return colors[riskLevel] || '#6B7280'
}

export const getRiskGlowClass = (riskLevel) => {
  const classes = {
    critical: 'node-glow-critical',
    high: 'node-glow-high',
    medium: 'node-glow-medium',
    low: 'node-glow-low'
  }
  return classes[riskLevel] || ''
}

export const getRiskBadgeClass = (riskLevel) => {
  const classes = {
    critical: 'risk-badge-critical',
    high: 'risk-badge-high',
    medium: 'risk-badge-medium',
    low: 'risk-badge-low'
  }
  return classes[riskLevel] || 'risk-badge-low'
}

export const calculateOverallRisk = (nodes) => {
  if (!nodes || nodes.length === 0) return 0
  const scores = nodes.map(n => n.data?.riskScore || 0)
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  const maxScore = Math.max(...scores)
  return Math.round(avg * 0.6 + maxScore * 0.4)
}

export const getAttackPaths = (nodes, edges) => {
  if (!nodes || !edges) return []
  const criticalEdges = edges.filter(e => e.data?.riskLevel === 'critical')
  const paths = []
  criticalEdges.forEach(edge => {
    const sourceNode = nodes.find(n => n.id === edge.source)
    const targetNode = nodes.find(n => n.id === edge.target)
    if (sourceNode && targetNode) {
      paths.push({
        id: edge.id,
        source: sourceNode.data?.label || edge.source,
        target: targetNode.data?.label || edge.target,
        riskLevel: edge.data?.riskLevel,
        description: edge.data?.description || 'Critical access path'
      })
    }
  })
  return paths
}

export const filterZeroTrustEdges = (edges) => {
  if (!edges) return []
  return edges.filter(e => {
    const riskLevel = e.data?.riskLevel
    return riskLevel !== 'critical' && riskLevel !== 'high'
  })
}

export const getRiskLabel = (score) => {
  if (score >= 80) return 'critical'
  if (score >= 60) return 'high'
  if (score >= 40) return 'medium'
  return 'low'
}

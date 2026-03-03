import { useState, useCallback } from 'react'
import { useNodesState, useEdgesState } from 'reactflow'
import { initialNodes, initialEdges } from '../data/graphData'
import { filterZeroTrustEdges, calculateOverallRisk } from '../utils/riskCalculator'

export function useGraphData() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [isZeroTrustMode, setIsZeroTrustMode] = useState(false)
  const [selectedNode, setSelectedNode] = useState(null)
  const [selectedEdge, setSelectedEdge] = useState(null)

  const toggleZeroTrust = useCallback(() => {
    setIsZeroTrustMode(prev => {
      const next = !prev
      if (next) {
        const filtered = filterZeroTrustEdges(initialEdges)
        setEdges(filtered)
      } else {
        setEdges(initialEdges)
      }
      return next
    })
  }, [setEdges])

  const overallRisk = calculateOverallRisk(nodes)

  return {
    nodes,
    edges,
    isZeroTrustMode,
    toggleZeroTrust,
    onNodesChange,
    onEdgesChange,
    selectedNode,
    setSelectedNode,
    selectedEdge,
    setSelectedEdge,
    overallRisk
  }
}

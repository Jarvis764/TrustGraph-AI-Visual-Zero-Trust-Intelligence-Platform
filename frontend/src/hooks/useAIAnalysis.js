import { useState, useCallback } from 'react'
import { analyzeRisk, generateExecutiveSummary } from '../services/api'

export function useAIAnalysis() {
  const [isLoading, setIsLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [executiveSummary, setExecutiveSummary] = useState(null)
  const [error, setError] = useState(null)

  const analyzeNode = useCallback(async (nodeData) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await analyzeRisk({
        nodeId: nodeData.id,
        nodeType: nodeData.nodeType,
        nodeName: nodeData.label,
        riskLevel: nodeData.riskLevel,
        connections: nodeData.connections || [],
        isZeroTrustMode: nodeData.isZeroTrustMode || false
      })
      setAnalysisResult(result)
    } catch (err) {
      setError(err.message || 'Analysis failed')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const analyzeEdge = useCallback(async (edgeData) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await analyzeRisk({
        nodeId: edgeData.id || 'edge',
        nodeType: 'connection',
        nodeName: edgeData.label || 'Access Path',
        riskLevel: edgeData.riskLevel,
        connections: [edgeData.source, edgeData.target],
        isZeroTrustMode: false
      })
      setAnalysisResult(result)
    } catch (err) {
      setError(err.message || 'Analysis failed')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const generateSummary = useCallback(async (graphData) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await generateExecutiveSummary(graphData)
      setExecutiveSummary(result)
    } catch (err) {
      setError(err.message || 'Summary generation failed')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearResult = useCallback(() => {
    setAnalysisResult(null)
    setError(null)
  }, [])

  return {
    isLoading,
    analysisResult,
    executiveSummary,
    error,
    analyzeNode,
    analyzeEdge,
    generateSummary,
    clearResult
  }
}

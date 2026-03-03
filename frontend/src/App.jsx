import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import TrustGraph from './components/Graph/TrustGraph'
import AIInsightsPanel from './components/Panels/AIInsightsPanel'
import RiskLegend from './components/Panels/RiskLegend'
import ZeroTrustToggle from './components/Controls/ZeroTrustToggle'
import ExecutiveSummaryModal from './components/Modals/ExecutiveSummaryModal'
import Toast from './components/Common/Toast'
import { useGraphData } from './hooks/useGraphData'
import { useAIAnalysis } from './hooks/useAIAnalysis'
import { getRiskColor } from './utils/riskCalculator'

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState('graph')
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toasts, setToasts] = useState([])

  const {
    nodes, edges,
    isZeroTrustMode, toggleZeroTrust,
    onNodesChange, onEdgesChange,
    selectedNode, setSelectedNode,
    selectedEdge, setSelectedEdge,
    overallRisk
  } = useGraphData()

  const {
    isLoading, analysisResult, executiveSummary,
    error, analyzeNode, analyzeEdge,
    generateSummary, clearResult
  } = useAIAnalysis()

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000)
  }, [])

  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node)
    setSelectedEdge(null)
    setIsPanelOpen(true)
    clearResult()
  }, [setSelectedNode, setSelectedEdge, clearResult])

  const handleEdgeClick = useCallback((edge) => {
    setSelectedEdge(edge)
    setSelectedNode(null)
    setIsPanelOpen(true)
    clearResult()
  }, [setSelectedEdge, setSelectedNode, clearResult])

  const handleAnalyze = useCallback((itemData) => {
    const isEdge = itemData?.source !== undefined || itemData?.riskLevel && !itemData?.nodeType
    if (isEdge) {
      analyzeEdge(itemData)
    } else {
      analyzeNode(itemData)
    }
  }, [analyzeNode, analyzeEdge])

  const handleGenerateReport = useCallback(async () => {
    setIsModalOpen(true)
    await generateSummary({
      nodes,
      edges,
      isZeroTrustMode,
      overallRisk
    })
    addToast('Executive report generated successfully', 'success')
  }, [nodes, edges, isZeroTrustMode, overallRisk, generateSummary, addToast])

  const handleExportPDF = useCallback(() => {
    addToast('Export initiated — report downloading...', 'info')
    if (!executiveSummary) {
      handleGenerateReport()
    }
  }, [addToast, executiveSummary, handleGenerateReport])

  const handleZeroTrustToggle = useCallback(() => {
    toggleZeroTrust()
    const nextMode = !isZeroTrustMode
    addToast(
      nextMode
        ? '✓ Zero Trust Mode activated — high-risk paths blocked'
        : '⚠ Zero Trust Mode deactivated — all paths visible',
      nextMode ? 'success' : 'warning'
    )
  }, [toggleZeroTrust, isZeroTrustMode, addToast])

  const selectedItem = selectedNode || selectedEdge
  const riskAfter = Math.max(20, overallRisk - Math.round(overallRisk * 0.45))

  return (
    <div className="flex flex-col h-screen bg-cyber-dark overflow-hidden">
      {/* Header */}
      <Header onGenerateReport={handleGenerateReport} onExportPDF={handleExportPDF} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(prev => !prev)}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Controls Panel */}
          <div className="w-64 shrink-0 flex flex-col gap-3 p-3 border-r border-cyber-border overflow-y-auto">
            {/* Overall Risk Score */}
            <div className="bg-cyber-card border border-cyber-border rounded-xl p-4">
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Overall Risk</div>
              <div className="flex items-end gap-2">
                <div
                  className="text-4xl font-black leading-none"
                  style={{ color: getRiskColor(overallRisk >= 85 ? 'critical' : overallRisk >= 65 ? 'high' : overallRisk >= 40 ? 'medium' : 'low') }}
                >
                  {overallRisk}
                </div>
                <div className="text-gray-500 text-sm pb-1">/ 100</div>
              </div>
              <div className="mt-2 bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${overallRisk}%`,
                    backgroundColor: getRiskColor(overallRisk >= 85 ? 'critical' : overallRisk >= 65 ? 'high' : overallRisk >= 40 ? 'medium' : 'low'),
                    boxShadow: `0 0 8px currentColor`
                  }}
                />
              </div>
            </div>

            {/* Zero Trust Toggle */}
            <ZeroTrustToggle
              isEnabled={isZeroTrustMode}
              onToggle={handleZeroTrustToggle}
              nodeCount={nodes.length}
              edgeCount={edges.length}
              riskBefore={overallRisk}
              riskAfter={riskAfter}
            />

            {/* Risk Legend */}
            <RiskLegend nodes={nodes} />

            {/* Instructions */}
            <div className="bg-cyber-card border border-cyber-border rounded-xl p-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">How to Use</h3>
              <ul className="space-y-1.5 text-xs text-gray-500">
                <li className="flex items-start gap-1.5">
                  <span className="text-cyber-blue mt-0.5">→</span>
                  Click any node to view AI risk analysis
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-cyber-blue mt-0.5">→</span>
                  Click connections for path analysis
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-cyber-blue mt-0.5">→</span>
                  Toggle Zero Trust to see risk reduction
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-cyber-blue mt-0.5">→</span>
                  Generate executive report for board
                </li>
              </ul>
            </div>
          </div>

          {/* Graph Canvas */}
          <div className="flex-1 relative overflow-hidden">
            <TrustGraph
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={handleNodeClick}
              onEdgeClick={handleEdgeClick}
              isZeroTrustMode={isZeroTrustMode}
            />
          </div>

          {/* AI Insights Panel */}
          {isPanelOpen && selectedItem && (
            <AIInsightsPanel
              selectedItem={selectedItem}
              analysisResult={analysisResult}
              isLoading={isLoading}
              isOpen={isPanelOpen}
              onClose={() => {
                setIsPanelOpen(false)
                setSelectedNode(null)
                setSelectedEdge(null)
                clearResult()
              }}
              onAnalyze={handleAnalyze}
            />
          )}
        </div>
      </div>

      {/* Executive Summary Modal */}
      <ExecutiveSummaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        summaryData={executiveSummary}
        isLoading={isLoading && isModalOpen}
      />

      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

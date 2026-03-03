import ReactFlow, {
  Background,
  MiniMap,
  ReactFlowProvider,
  BackgroundVariant
} from 'reactflow'
import 'reactflow/dist/style.css'
import CustomNode from './CustomNode'
import CustomEdge from './CustomEdge'
import GraphControls from './GraphControls'
import { getRiskColor } from '../../utils/riskCalculator'

const nodeTypes = { custom: CustomNode }
const edgeTypes = { custom: CustomEdge }

function TrustGraphInner({
  nodes, edges, onNodesChange, onEdgesChange,
  onNodeClick, onEdgeClick, isZeroTrustMode
}) {
  const handleNodeClick = (event, node) => {
    if (onNodeClick) onNodeClick(node)
  }

  const handleEdgeClick = (event, edge) => {
    if (onEdgeClick) onEdgeClick(edge)
  }

  return (
    <div className="relative w-full h-full cyber-grid-bg">
      {/* Zero Trust Mode Banner */}
      {isZeroTrustMode && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 bg-risk-low/20 border border-risk-low/50 text-risk-low text-xs font-bold px-4 py-1.5 rounded-full backdrop-blur-sm">
          ✓ ZERO TRUST MODE ACTIVE — High-risk paths blocked
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'custom',
          animated: false
        }}
        style={{ background: 'transparent' }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="rgba(0, 212, 255, 0.08)"
        />

        <MiniMap
          nodeColor={(node) => getRiskColor(node.data?.riskLevel)}
          maskColor="rgba(11, 15, 25, 0.7)"
          style={{
            background: '#111827',
            border: '1px solid #1F2937',
            borderRadius: '8px'
          }}
        />

        {/* Custom controls - positioned top-right */}
        <div className="absolute top-3 right-3 z-10">
          <GraphControls nodeCount={nodes.length} edgeCount={edges.length} />
        </div>
      </ReactFlow>
    </div>
  )
}

export default function TrustGraph(props) {
  return (
    <ReactFlowProvider>
      <TrustGraphInner {...props} />
    </ReactFlowProvider>
  )
}

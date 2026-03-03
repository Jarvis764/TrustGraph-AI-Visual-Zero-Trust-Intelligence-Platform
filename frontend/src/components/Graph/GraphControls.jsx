import { useReactFlow } from 'reactflow'
import { ZoomIn, ZoomOut, Maximize, Grid } from 'lucide-react'

export default function GraphControls({ nodeCount, edgeCount }) {
  const { zoomIn, zoomOut, fitView } = useReactFlow()

  return (
    <div className="flex flex-col gap-2">
      {/* Zoom controls */}
      <div className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden">
        <button
          onClick={() => zoomIn({ duration: 300 })}
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-cyber-blue hover:bg-white/5 transition-all border-b border-cyber-border"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => zoomOut({ duration: 300 })}
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-cyber-blue hover:bg-white/5 transition-all border-b border-cyber-border"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={() => fitView({ duration: 500, padding: 0.2 })}
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-cyber-blue hover:bg-white/5 transition-all"
          title="Fit View"
        >
          <Maximize size={16} />
        </button>
      </div>

      {/* Stats */}
      <div className="bg-cyber-card border border-cyber-border rounded-xl p-2 text-center">
        <div className="text-cyber-blue font-bold text-sm">{nodeCount}</div>
        <div className="text-gray-600 text-xs">Nodes</div>
        <div className="h-px bg-cyber-border my-1.5" />
        <div className="text-blue-400 font-bold text-sm">{edgeCount}</div>
        <div className="text-gray-600 text-xs">Edges</div>
      </div>
    </div>
  )
}

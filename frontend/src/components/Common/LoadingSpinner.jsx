export default function LoadingSpinner({ size = 'md', text = 'Analyzing...' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`relative ${sizes[size]}`}>
        {/* Outer ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-transparent border-t-cyber-blue`}
          style={{ animation: 'spinnerRing 0.8s linear infinite' }}
        />
        {/* Middle ring */}
        <div
          className={`absolute inset-1 rounded-full border-2 border-transparent border-b-blue-500`}
          style={{ animation: 'spinnerRing 1.2s linear infinite reverse' }}
        />
        {/* Inner dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" />
        </div>
      </div>
      {text && (
        <span className="text-xs text-cyber-blue animate-pulse tracking-widest uppercase">
          {text}
        </span>
      )}
    </div>
  )
}

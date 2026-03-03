export default function GlowCard({ children, riskLevel, className = '', onClick }) {
  const glassClass = riskLevel ? `glass-card-${riskLevel}` : 'glass-card'

  return (
    <div
      className={`rounded-xl p-4 transition-all duration-300 ${glassClass} ${onClick ? 'cursor-pointer hover:scale-[1.01]' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

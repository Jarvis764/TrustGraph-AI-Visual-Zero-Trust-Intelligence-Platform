export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0B0F19',
        'cyber-card': '#111827',
        'cyber-border': '#1F2937',
        'cyber-blue': '#00D4FF',
        'cyber-blue-500': '#3B82F6',
        'risk-high': '#EF4444',
        'risk-medium': '#F59E0B',
        'risk-low': '#10B981',
        'risk-critical': '#DC2626',
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'attack-path': 'attackPath 1.5s linear infinite',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 5px currentColor' },
          '50%': { opacity: '0.7', boxShadow: '0 0 20px currentColor, 0 0 40px currentColor' },
        },
        attackPath: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    }
  },
  plugins: []
}

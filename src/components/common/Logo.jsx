import { Headphones } from 'lucide-react'

const Logo = ({ size = 'md', variant = 'dark' }) => {
  const iconSize = size === 'lg' ? 'w-14 h-14' : 'w-11 h-11'
  const iconInner = size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'
  const textSize = size === 'lg' ? 'text-3xl' : 'text-xl'
  const brandColor = variant === 'dark' ? 'text-white' : 'text-forest-900'

  return (
    <div className="flex items-center gap-3">
      <div className={`relative flex items-center justify-center ${iconSize} rounded-full bg-forest-800 ring-2 ring-golden-500/60 shadow-lg shadow-golden-500/20`}>
        <Headphones className={`${iconInner} text-golden-400`} />
      </div>

      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline gap-0.5">
          <span className={`${textSize} font-extrabold tracking-wide ${brandColor}`}>GOCS</span>
          <span className={`${textSize} font-extrabold tracking-wide text-golden-500`}>PX</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <div className="h-px flex-1 bg-golden-500/70" />
          <svg viewBox="0 0 24 8" className="w-6 h-2 shrink-0" fill="none">
            <rect x="0"  y="3" width="2" height="2" rx="1" fill="#c9a227" opacity="0.6"/>
            <rect x="3"  y="1" width="2" height="6" rx="1" fill="#c9a227"/>
            <rect x="6"  y="2" width="2" height="4" rx="1" fill="#c9a227" opacity="0.8"/>
            <rect x="9"  y="0" width="2" height="8" rx="1" fill="#c9a227"/>
            <rect x="12" y="2" width="2" height="4" rx="1" fill="#c9a227" opacity="0.8"/>
            <rect x="15" y="1" width="2" height="6" rx="1" fill="#c9a227"/>
            <rect x="18" y="3" width="2" height="2" rx="1" fill="#c9a227" opacity="0.6"/>
            <rect x="21" y="2" width="2" height="4" rx="1" fill="#c9a227" opacity="0.4"/>
          </svg>
          <div className="h-px flex-1 bg-golden-500/70" />
        </div>
      </div>
    </div>
  )
}

export default Logo

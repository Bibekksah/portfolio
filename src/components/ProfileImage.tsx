import React from 'react'

const ProfileImage: React.FC = () => {
  return (
    <div className="w-full h-full rounded-full overflow-hidden border border-green-400/20 bg-[#031306] p-2">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <radialGradient id="glow" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#5efc6a" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#0d1f0d" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#041106" stopOpacity="1" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="58" fill="url(#glow)" />
        <circle cx="60" cy="40" r="22" fill="#8cff96" fillOpacity="0.95" />
        <path d="M35 98c8-14 18-22 25-22s17 8 25 22" stroke="#8cff96" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M28 90c6-18 19-30 32-30s26 12 32 30" stroke="#44b55f" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.65" />
        <circle cx="60" cy="40" r="3" fill="#031306" />
        <path d="M45 108c8-10 18-16 27-16s19 6 27 16" stroke="#0ae87b" strokeWidth="3" fill="none" opacity="0.8" />
      </svg>
    </div>
  )
}

export default ProfileImage

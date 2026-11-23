import React from 'react'

interface ProfileImageProps {
  src?: string
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src }) => {
  const profileImageUrl = src ||  '/Gemini_Generated_Image_5e1v1w5e1v1w5e1v.png'

  return (
    <div className="w-full h-full rounded-full overflow-hidden border border-green-400/20 bg-[#031306] p-2">
      <img
        src={profileImageUrl}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export default ProfileImage

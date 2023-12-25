import './index.css'

const Profile = props => {
  const {ProfileData} = props
  const {name, profileImageUrl, shortBio} = ProfileData

  return (
    <div className="profileBg">
      <img src={profileImageUrl} alt="profile" className="profileImg" />

      <h1 className="profileName">{name}</h1>
      <p className="profilePara">{shortBio}</p>
    </div>
  )
}

export default Profile

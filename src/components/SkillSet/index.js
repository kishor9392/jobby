import './index.css'

const SkillSet = props => {
  const {jobs} = props
  const {name, imageUrl} = jobs

  return (
    <li className="skillList">
      <img src={imageUrl} alt={name} className="skillImg" />
      <p className="skillPar">{name}</p>
    </li>
  )
}

export default SkillSet

import './index.css'

const FilterGroup = props => {
  const {list, type} = props
  const {label, employmentTypeId} = list
  const onTap = event => {
    type(event)
  }

  return (
    <li className="EmploymentListSubContainer">
      <input
        type="checkbox"
        value={employmentTypeId}
        className="inputBox"
        id={employmentTypeId}
        onChange={onTap}
      />
      <label htmlFor={employmentTypeId} className="labelElement">
        {label}
      </label>
    </li>
  )
}

export default FilterGroup

import './index.css'

const Salary = props => {
  const {details, f} = props
  const {salaryRangeId, label} = details

  const on = event => {
    f(event)
  }

  return (
    <li className="salaryCon">
      <input
        type="radio"
        value={salaryRangeId}
        className="radio"
        id={salaryRangeId}
        onChange={on}
      />

      <label htmlFor={salaryRangeId} className="salaryLabel">
        {label}
      </label>
    </li>
  )
}

export default Salary

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const LogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="headerBackground">
      <li className="headerLogoContainer">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="headerLogo"
          />
        </Link>
      </li>

      <div className="subHeaderContainer">
        <ul className="iconContainer">
          <li className="listElement">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="listElement">
            <Link to="/jobs" className="link">
              Jobs
            </Link>
          </li>
        </ul>

        <button type="button" className="logoutButton" onClick={LogOut}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)

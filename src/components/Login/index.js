import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMSg: '',
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = msg => {
    this.setState({errorMSg: msg, showError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="labelElement" htmlFor="pass">
          PASSWORD
        </label>
        <input
          className="inputElement"
          type="password"
          id="pass"
          placeholder="Password"
          onChange={this.onPasswordChange}
          value={password}
        />
      </>
    )
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <>
        <label className="labelElement" htmlFor="username">
          USERNAME
        </label>

        <input
          className="inputElement"
          type="text"
          id="username"
          placeholder="Username"
          onChange={this.onUsernameChange}
          value={username}
        />
      </>
    )
  }

  render() {
    const {showError, errorMSg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginBackground">
        <form className="userDetailsBackground" onSubmit={this.onSubmitForm}>
          <div className="webLogoContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="webLogoImg"
            />
          </div>

          <div className="labelContainer">{this.renderUsername()}</div>
          <div className="passwordElement">{this.renderPasswordField()}</div>

          <div className="buttonContainer">
            <button className="loginButton" type="submit">
              Login
            </button>
          </div>

          <div className="errorContainer">
            {showError && <p className="error">*{errorMSg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default Login

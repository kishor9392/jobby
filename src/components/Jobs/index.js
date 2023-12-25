import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobItems from '../JobItems'
import Profile from '../Profile'

import FilterGroup from '../FilterGroup'
import Salary from '../Salary'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchElement: '',
    data: [],
    jobApiStatus: apiStatusConstants.initial,
    profileDetails: [],
    profileStatus: '',
    salaryRange: 0,
    employmentType: [],
  }

  componentDidMount() {
    this.getJobData()
    this.getProfile()
  }

  getProfile = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const profileData = await response.json()
      const d = profileData.profile_details
      const newData = {
        name: d.name,
        profileImageUrl: d.profile_image_url,
        shortBio: d.short_bio,
      }
      this.setState({profileDetails: newData, profileStatus: true})
    } else {
      this.setState({profileStatus: false})
    }
  }

  onAgainData = () => this.getJobData()

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureImg"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="failureBtn" onClick={this.onAgainData}>
        Retry
      </button>
    </div>
  )

  renderNoJob = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="noJobsImg"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  onAgain = () => this.getProfile()

  profileError = () => (
    <button type="button" className="profileBtn" onClick={this.onAgain}>
      Retry
    </button>
  )

  getProfileData = () => {
    const {profileDetails} = this.state
    return <Profile ProfileData={profileDetails} />
  }

  getProfileSection = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case true:
        return this.getProfileData()
      case false:
        return this.profileError()
      default:
        return null
    }
  }

  getJobData = async () => {
    this.setState({jobApiStatus: apiStatusConstants.inProgress})
    const {searchElement, employmentType, salaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&search=${searchElement}&minimum_package=${salaryRange}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const jsonData = await response.json()
      const newData = jsonData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({data: newData, jobApiStatus: apiStatusConstants.success})
    } else {
      this.setState({jobApiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  changeSearchValue = event => {
    this.setState({searchElement: event.target.value})
  }

  onEnter = event => {
    if (event.key === 'Enter') {
      this.getJobData()
    }
  }

  renderSearch = () => {
    const {searchElement} = this.state
    return (
      <div className="searchBackground">
        <input
          type="search"
          className="searchInput"
          placeholder="Search"
          value={searchElement}
          onChange={this.changeSearchValue}
          onKeyDown={this.onEnter}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="btn"
          onClick={this.getJobData}
        >
          <BsSearch className="search-icon" /> {}
        </button>
      </div>
    )
  }

  renderJobDetails = () => {
    const {data} = this.state

    return data.length === 0 ? (
      this.renderNoJob()
    ) : (
      <ul className="jobItemContainer">
        {data.map(each => (
          <JobItems key={each.id} items={each} />
        ))}
      </ul>
    )
  }

  onGetJobs = () => {
    const {jobApiStatus} = this.state
    switch (jobApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  typeEm = event => {
    const {employmentType} = this.state
    const check = employmentType.includes(event.target.id)
    if (check !== true) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.id],
        }),
        this.getJobData,
      )
    } else {
      const newType = employmentType.filter(each => each !== event.target.value)
      this.setState({employmentType: newType}, this.getJobData)
    }
  }

  renderEmploymentType = () => (
    <div className="employmentType">
      <hr className="employLine" />
      <h1 className="employmentTypeHeading">Type of Employment</h1>
      <ul className="EmploymentListContainer">
        {employmentTypesList.map(each => (
          <FilterGroup
            key={each.employmentTypeId}
            list={each}
            type={this.typeEm}
          />
        ))}
      </ul>
    </div>
  )

  onSalaryChange = event =>
    this.setState({salaryRange: event.target.id}, this.getJobData)

  renderSalaryRange = () => (
    <div className="employmentType">
      <hr className="employLine" />
      <h1 className="employmentTypeHeading">Salary Range</h1>
      <ul className="EmploymentListContainer">
        {salaryRangesList.map(each => (
          <Salary
            key={each.salaryRangeId}
            details={each}
            f={this.onSalaryChange}
          />
        ))}
      </ul>
    </div>
  )

  renderAllItems = () => (
    <>
      <Header />
      <div className="jobBackground">
        <div className="firstBg">
          {this.getProfileSection()}
          {this.renderEmploymentType()}
          {this.renderSalaryRange()}
        </div>

        <div className="secondBg">
          {this.renderSearch()}
          {this.onGetJobs()}
        </div>
      </div>
    </>
  )

  render

  render() {
    return this.renderAllItems()
  }
}

export default Jobs

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {IoIosStar} from 'react-icons/io'

import {IoLocationSharp} from 'react-icons/io5'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'

import SimilarJobs from '../SimilarJobs'
import SkillSet from '../SkillSet'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    JobData: [],
    SimilarJobData: [],
    Skills: [],
    lifeData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const jsonData = await response.json()
      console.log(jsonData)
      const data = {
        companyLogoUrl: jsonData.job_details.company_logo_url,
        companyWebsiteUrl: jsonData.job_details.company_website_url,
        employmentType: jsonData.job_details.employment_type,
        id: jsonData.job_details.id,
        jobDescription: jsonData.job_details.job_description,
        location: jsonData.job_details.location,
        packagePerAnnum: jsonData.job_details.package_per_annum,
        rating: jsonData.job_details.rating,
        title: jsonData.job_details.title,
      }

      const data2 = jsonData.job_details.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))

      const data3 = {
        description: jsonData.job_details.life_at_company.description,
        imageUrl: jsonData.job_details.life_at_company.image_url,
      }
      const data4 = jsonData.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
        id: each.id,
      }))
      this.setState({
        JobData: data,
        Skills: data2,
        lifeData: data3,
        SimilarJobData: data4,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  lifeCon = () => {
    const {lifeData} = this.state
    const {description, imageUrl} = lifeData

    return (
      <div className="lifeCon1">
        <p className="lifePara">{description}</p>
        <img src={imageUrl} alt="life at company" className="lifeImg" />
      </div>
    )
  }

  renderJobDetails = () => {
    const {JobData, Skills} = this.state
    const {
      companyLogoUrl,
      employmentType,
      packagePerAnnum,
      companyWebsiteUrl,
      location,
      jobDescription,
      rating,
      title,
    } = JobData

    return (
      <div className="detailsBg">
        <div className="cLogoContainer">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="cLogo"
          />
          <div className="titleContainer">
            <h1 className="itemTitle">{title}</h1>
            <div className="titleSubContainer">
              <IoIosStar className="IconStar" />
              <p className="ratingItem">{rating}</p>
            </div>
          </div>
        </div>

        <div className="itemTypeContainer">
          <div className="xContainer">
            <div className="typeSub">
              <IoLocationSharp className="location" />
              <p className="jobLocation">{location}</p>
            </div>

            <div className="typeSub">
              <BsFillBriefcaseFill className="location" />
              <p className="jobLocation">{employmentType}</p>
            </div>
          </div>

          <p className="itemTitle">{packagePerAnnum}</p>
        </div>

        <hr className="hrLine" />

        <div className="descriptionContainer1">
          <div>
            <h1 className="jobDescriptionHeading1">Description</h1>
            <p className="jobDescription1">{jobDescription}</p>
          </div>
          <div className="vbg">
            <a className="visit" href={companyWebsiteUrl}>
              Visit
            </a>
            <BiLinkExternal size={20} className="i" />
          </div>
        </div>

        <nav className="skillCon">
          <h1 className="jobDescriptionHeading1">Skills</h1>
          <ul className="skillUl">
            {Skills.map(each => (
              <SkillSet key={each.name} jobs={each} />
            ))}
          </ul>
        </nav>

        <div className="lifeCon">
          <h1 className="jobDescriptionHeading1">Life at Company</h1>
          {this.lifeCon()}
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {SimilarJobData} = this.state

    return (
      <>
        <h1 className="jobDescriptionHeading1">Similar Jobs</h1>
        <ul className="sUl">
          {SimilarJobData.map(each => (
            <SimilarJobs key={each.id} jobs={each} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container1" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onTap = () => {
    this.getJobDetails()
  }

  renderFailure = () => (
    <div className="eCon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="f2"
      />
      <h1 className="e1">Oops! Something Went Wrong</h1>
      <p className="e2">We cannot seem to find the page you are looking for.</p>
      <button type="button" className="profileBtn" onClick={this.onTap}>
        Retry
      </button>
    </div>
  )

  renderJ = () => (
    <div className="bg24">
      {this.renderJobDetails()}
      {this.renderSimilarJobs()}
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()

      case apiStatusConstants.success:
        return this.renderJ()

      case apiStatusConstants.failure:
        return this.renderFailure()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderAll()}
      </>
    )
  }
}

export default JobDetails

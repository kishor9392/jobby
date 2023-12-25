import {Link} from 'react-router-dom'

import {IoIosStar} from 'react-icons/io'

import {IoLocationSharp} from 'react-icons/io5'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItems = props => {
  const {items} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = items

  return (
    <Link to={`/jobs/${id}`} className="pip">
      <li className="itemListCon">
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

          <h1 className="itemTitle">{packagePerAnnum}</h1>
        </div>

        <hr className="hrLine" />

        <div className="descriptionContainer">
          <h1 className="jobDescriptionHeading">Description</h1>
          <p className="jobDescription">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItems

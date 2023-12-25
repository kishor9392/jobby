import {IoIosStar} from 'react-icons/io'

import {IoLocationSharp} from 'react-icons/io5'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {jobs} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobs

  return (
    <li className="similarCon">
      <div className="cLogoContainer">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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

      <div className="sdCon">
        <h1 className="dh1">Description</h1>
        <p className="dPar">{jobDescription}</p>
      </div>

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
    </li>
  )
}

export default SimilarJobs

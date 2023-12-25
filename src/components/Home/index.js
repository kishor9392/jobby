import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="homeBackground">
      <h1 className="homeHeading">
        Find The Job That <br /> Fits Your Life
      </h1>

      <p className="homePara">Millions of people are searching for jobs</p>

      <Link to="/jobs">
        <button type="button" className="homeBtn">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home

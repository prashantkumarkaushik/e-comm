import './navigation.styles.scss'
// import Crwn from './crown.svg'
import {Fragment} from 'react'
import { Outlet, Link} from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../src/assets/crown.svg'

const Navigation = () => {
  return(
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/'>
          {/* <div>Logo</div>     */}
          <CrwnLogo className='logo' />
        </Link>
        <div className="nav-links-container">
         <Link className="nav-link" to='/shop'>
          SHOP
        </Link> 
         <Link className="nav-link" to='/sign-in'>
          SignIn
        </Link> 
      </div>
    </div>
    <Outlet />
    </Fragment>
  )
}

export default Navigation

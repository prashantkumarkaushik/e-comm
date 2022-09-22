import './navigation.styles.scss'
import CartIcon from '../../src/components/cart-icon/cart-icon.component.jsx'
import CartDropdown from '../../src/components/cart-dropdown/cart-dropdown.component.jsx'
// import Crwn from './crown.svg'
import {Fragment, useContext} from 'react'
import { Outlet, Link} from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../src/assets/crown.svg'
import {UserContext } from '../../src/contexts/user.context.jsx'
import {CartContext} from '../../src/contexts/cart.context.jsx'
import {signOutUser} from '../../src/utils/firebase/firebase.utils.js'

const Navigation = () => {
  const {currentUser} = useContext(UserContext)
  const {isCartOpen} = useContext(CartContext)

  const signOutHandler = async () => {
    await signOutUser();
  }
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
        {
          currentUser ? (
            <span className='nav-link' onClick={signOutHandler}>Sign Out</span> ):
            (
             <Link className="nav-link" to='/auth'>
              SignIn
             </Link> 
            )
        } 
          <CartIcon />
      </div>
      {isCartOpen && <CartDropdown />}
    </div>
    <Outlet />
    </Fragment>
  )
}

export default Navigation

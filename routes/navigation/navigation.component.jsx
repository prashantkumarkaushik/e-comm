import CartIcon from '../../src/components/cart-icon/cart-icon.component.jsx'
import CartDropdown from '../../src/components/cart-dropdown/cart-dropdown.component.jsx'
// import Crwn from './crown.svg'
import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../src/assets/crown.svg'
import { UserContext } from '../../src/contexts/user.context.jsx'
import { CartContext } from '../../src/contexts/cart.context.jsx'
import { signOutUser } from '../../src/utils/firebase/firebase.utils.js'
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

  const signOutHandler = async () => {
    await signOutUser();
  }
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutHandler}>Sign Out</NavLink>) :
              (
                <NavLink to='/auth'>
                  SignIn
                </NavLink>
              )
          }
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation

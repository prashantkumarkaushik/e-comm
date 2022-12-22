import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../../src/components/cart-icon/cart-icon.component.jsx";
import CartDropdown from "../../src/components/cart-dropdown/cart-dropdown.component.jsx";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { selectIsCartOpen } from "../../src/store/cart/cart.selector.js";
import { ReactComponent as CrwnLogo } from "../../src/assets/crown.svg";
import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles";
import { selectCurrentUser } from "../../src/store/user/user.selector";
import { signOutStart } from "../../src/store/user/user.action.js";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const signOutHandler = () => dispatch(signOutStart());
  // const signOutUser = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutHandler}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="/auth">SignIn</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

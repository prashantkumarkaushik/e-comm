import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../contexts/cart.context'
import Button from '../button/button.component.jsx'
import './cart-dropdown.styles.scss'
import CartItem from '../cart-item/cart-item.component.jsx'

const CartDropdown = () => {
  const navigate = useNavigate()
  const goToCheckoutPage = () => {
    navigate('/checkout')
  }
  const { cartItems } = useContext(CartContext)
  return (
    <div className='cart-dropdown-container' >
      <div className='cart-items'>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}

      </div>
      <Button onClick={goToCheckoutPage}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown

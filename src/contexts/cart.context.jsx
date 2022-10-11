import { createContext, useState, useEffect } from 'react'

const addCartItems = (cartItems, productToAdd) => {
  // here we need to find the cartitem contains the product to add
  const existingCart = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

  // if it contains then increment its quantity by one else add item to the cartitem
  if (existingCart) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  // return new modified array with modified cartitem 1and quantity
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}


const removeCartItem = (cartItems, productToRemove) => {
  // here we need to find the cartitem contains the product to add
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
  }

  // if it contains then increment its quantity by one else add item to the cartitem
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id)

}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  clearItemFromCart: () => { },
  removeItemFromCart: () => { },
  cartCount: 0,
  cartTotal: 0
})


export const CartProvider = ({ children }) => {

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  // here we use useeffect:
  // whenever the cartItem component changes then this useeffect takes place
  // reduce function is used to calculate some specific task in the code
  // reduce takes two parameter 
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 0
    )
    setCartCount(newCartCount)
  }, [cartItems])


  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
    )
    setCartTotal(newCartTotal)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItems(cartItems, productToAdd))
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove))
  }


  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
} 

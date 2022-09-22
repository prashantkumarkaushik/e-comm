import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.scss'
import {UserProvider} from '../src/contexts/user.context.jsx'
import {ProductsProvider} from '../src/contexts/products.context.jsx'
import {CartProvider} from '../src/contexts/cart.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter>
        <UserProvider>
            <ProductsProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </ProductsProvider>
        </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)

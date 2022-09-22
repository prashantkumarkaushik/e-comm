import {useContext} from 'react'
import {ProductsContext} from '../../src/contexts/products.context.jsx'
import ProductCard from '../../src/components/product-card/product-card.component.jsx'
import './shop.styles.scss' 

const Shop = () => {
  const {products} = useContext(ProductsContext)
  return(
    <div className='products-container'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default Shop

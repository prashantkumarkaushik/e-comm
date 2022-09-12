import './directory.styles.scss' 
import CategoryItem from '../category-items/category-item.component.jsx'

const Directory =({categories}) => {
  return(
    <div>
      <div className="directory-container">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}


export default Directory

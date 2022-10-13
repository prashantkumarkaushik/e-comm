import './directory.styles.scss'
import DirectoryItem from '../category-items/directory-item.component'

const Directory = ({ categories }) => {
  return (
    <div>
      <div className="directory-container">
        {categories.map((category) => (
          <DirectoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}


export default Directory

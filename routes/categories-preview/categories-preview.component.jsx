import { Fragment } from "react";
import { useSelector } from "react-redux";
// import { CategoriesContext } from '../../src/contexts/categories.context'
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../src/store/categories/categories.selector";
import CategoryPreview from "../../src/components/category-preview/category-preview.component.jsx";
import Spinner from "../../src/components/spinner/spinner.component";

const CategoriesPreview = () => {
  // const { categoriesMap } = useContext(CategoriesContext)
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;

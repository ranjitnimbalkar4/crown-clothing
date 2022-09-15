import { useContext, Fragment} from "react";
import { CatergoriesContext } from "../../components/contexts/categories.context";
import CategoryPreviw from "../../components/category-preview/category-preview.component";


const CategoriesPreview = () => {
  const { catergoriesMap } = useContext(CatergoriesContext);
  console.log(Object.keys(catergoriesMap));
  return (
      <Fragment>
        {Object.keys(catergoriesMap).map( title => {
          const products = catergoriesMap[title];
          return <CategoryPreviw key={title} title={title} products={products}/>

        })}      
      </Fragment>  
  );
};

export default CategoriesPreview;

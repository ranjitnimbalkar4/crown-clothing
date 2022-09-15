import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CatergoriesContext } from '../../components/contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';

const Category = () => {
   const {category} = useParams();
   const {catergoriesMap} = useContext(CatergoriesContext);
   
   const [products, setProducts] = useState([]);

   useEffect(() => {
        setProducts(catergoriesMap[category]);
   }, [category, catergoriesMap])

   return (
    <div  className='category-container'>
        {
           products && products.map(product => <ProductCard key={product.id} product={product}/> )
        }
    </div>
   );
};

export default Category;
import { createContext, useState , useEffect} from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util.js";


export const CatergoriesContext = createContext({
    catergoriesMap: {}    
});

export const CatergoriesProvider = ({children}) => {
    const [catergoriesMap, setCatergoriesMap] = useState({});

    // useEffect(() => {
    //     addCollectionAndDocuments('catergories', SHOP_DATA);
    // }, []);

    useEffect(() => {
        const getCategoryMap = async () => {
           const catergoryMap = await getCategoriesAndDocuments();
           setCatergoriesMap(catergoryMap);
           console.log(catergoryMap);
        }
        getCategoryMap();              
    },[]);

    const  value = { catergoriesMap };
   
    return (<CatergoriesContext.Provider value={value}>{children}</CatergoriesContext.Provider>);
}


import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener } from "../../utils/firebase/firebase.util";

//as actual value you want to access
export const UserContext = createContext({
  currentUser : null,
  setCurrentUser: () => null
});

//
export const UserProvide = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}; 

    useEffect(() => {
       const unsubscrib = onAuthStateChangedListener((user) => {        
         setCurrentUser(user);
       });
    
       return unsubscrib;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
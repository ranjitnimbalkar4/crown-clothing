import { Outlet} from "react-router-dom";
import { Fragment, useContext } from "react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from "./navigation.styles";
import { UserContext } from "../../components/contexts/user.context";
import { singOutUser } from "../../utils/firebase/firebase.util";
import { CartContext } from "../../components/contexts/cart.context";

const Navigation = () => {

  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

  //const signOutUserHandler = async () => {
   //  const res = await singOutUser();
     //setCurrentUser(null);
  //}

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
            <CrownLogo className="logo"/>
        </LogoContainer>
        <NavLinksContainer>
            <NavLink to='/shop'>
               SHOP
            </NavLink>
            {
              currentUser ? 
                (<NavLink as='span' onClick={singOutUser}> SING OUT</NavLink>):
                (<NavLink to='/auth'>SIGN-IN</NavLink>)
            }  
            <CartIcon/>          
        </NavLinksContainer>   
        { isCartOpen && <CartDropdown/>}    
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

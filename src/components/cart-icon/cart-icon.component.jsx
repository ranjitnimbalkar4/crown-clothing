import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";
import { CartContext } from "../contexts/cart.context";
import { useContext } from "react";

const CartIcon = () => {

  const {isCartOpen, setIsCartOpen, cardCount} = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon'/>
      <ItemCount>{cardCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';
import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';

const CartDropdown = () => {

    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                { cartItems.length ?
                     cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem}/>) :
                     (<EmptyMessage>Your Cart is empty..</EmptyMessage>)
                }
            </CartItems>
            <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;
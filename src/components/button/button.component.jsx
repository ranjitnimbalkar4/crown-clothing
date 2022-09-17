import { BaseButton, GoogleSingInButton, InvertedButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>(
    {
        [BUTTON_TYPE_CLASSES.base] : BaseButton,
        [BUTTON_TYPE_CLASSES.google] : GoogleSingInButton,
        [BUTTON_TYPE_CLASSES.inverted] : InvertedButton
    }[buttonType]
);

const Button = ({children, buttonType, ...otherPros}) => {
    console.log(buttonType);
    const CustomeButton = getButton(buttonType);  
    console.log(CustomeButton);
    return (
        <CustomeButton {...otherPros}>{children}</CustomeButton>
    );
}

export default Button;
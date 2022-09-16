import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, singInAuthUserWithUserAndPassword} from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss';
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
//import { UserContext } from "../contexts/user.context";

const defauldFormFields = {  
    email: '',
    password: ''  
}

const SingInForm = () => {

    const [formFields, setFormFields] = useState(defauldFormFields);
    const { email, password } = formFields;

    //const {setCurrentUser} = useContext(UserContext);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
      };


    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name] : value});
        console.log(formFields);
    }

    const resetFormFields = () => {
        setFormFields(defauldFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
         try {     
            const {user} = await singInAuthUserWithUserAndPassword(email, password);
            //setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password or email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
           
            console.log(error);
        }    
     
    }

    return (
        <div className="sign-in-container">
            <h2>Alread have an account?</h2>
            <span>Sing In with your email and password</span>
            <form onSubmit={handleSubmit}>               
                             
                <FormInput label='Email' type='email' required name="email" value={email} onChange={handleChange}/>

                <FormInput label='Password' type='password' required name="password" value={password} onChange={handleChange}/>
                
                <div className="buttons-container">
                    <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type="submit">Sing In</Button>
                    <Button type={BUTTON_TYPE_CLASSES.google}  onClick={logGoogleUser}>Google Sign In</Button>  
                </div>    
            </form> 
        </div>
    );
}

export default SingInForm;
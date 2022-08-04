import { useState } from "react";
import { createAuthUserWithUserAndPassword , createUserDocumentFromAuth} from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss';
import Button from "../button/button.component";

const defauldFormFields = {
    displayName : '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SingUpForm = () => {

    const [formFields, setFormFields] = useState(defauldFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

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
        if(password !== confirmPassword){
            alert("Passwords do not match.");
            return;
        } 
        try {
            const {user} = await createAuthUserWithUserAndPassword(email, password);
            console.log(user);
            await createUserDocumentFromAuth(user, {displayName} );
            resetFormFields();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert("Cannot create user, email already used.")
            }

            console.log(error.message);
        }    
     
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sing Up with your email and password</span>
            <form onSubmit={handleSubmit}>
               
                <FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName}/>
                
                <FormInput label='Email' type='email' required name="email" value={email} onChange={handleChange}/>

                <FormInput label='Password' type='password' required name="password" value={password} onChange={handleChange}/>

                <FormInput  label='Confirm Password' type='password' required name="confirmPassword" value={confirmPassword} onChange={handleChange}/>

                <Button buttonType='inverted' type="submit">Sing Up</Button>
            </form>
        </div>
    );
}

export default SingUpForm;
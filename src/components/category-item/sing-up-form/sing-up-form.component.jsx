import { useState } from "react";
import { createAuthUserWithUserAndPassword , createUserDocumentFromAuth} from "../../../utils/firebase/firebase.util";

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
        <div>
            <h1>Sing Up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type='text' required name="displayName" value={displayName} onChange={handleChange}/>

                <label>Email</label>
                <input type='email' required name="email" value={email} onChange={handleChange}/>

                <label>Password</label>
                <input type='password' required name="password" value={password} onChange={handleChange}/>

                <label>Confirm Password</label>
                <input type='password' required name="confirmPassword" value={confirmPassword} onChange={handleChange}/>

                <button type="submit">Sing Up</button>
            </form>
        </div>
    );
}

export default SingUpForm;
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SingUpForm from "../../components/sing-up-form/sing-up-form.component";

const SingIn = () => {
  useEffect(() => {
    async function getRedirectResponse() {
      // You can await here
      const result = await getRedirectResult(auth);
      if (result) {
        const userDocRef = await createUserDocumentFromAuth(result.user);
      }
      // ...
    }
    getRedirectResponse();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  // const logGoogleRedirect = async () => {
  //     const {user} = await signInWithGoogleRedirect();
  //     //const userDocRef = await createUserDocumentFromAuth(user);
  //     console.log(user);
  // }

  return (
    <div>
      <h1>Sing In Page</h1>
      <button onClick={logGoogleUser}>Sing In Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sing In Google Redirect
      </button>
      <SingUpForm />
    </div>
  );
};

export default SingIn;

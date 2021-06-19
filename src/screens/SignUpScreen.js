import React, {useRef} from 'react'
import { auth } from '../firebase';
import "./SignUpScreen.css"

function SignUpScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((authUser) => {
            console.log(authUser);
        })
        .catch((error) => {
            alert(error.message);
        });
    };

    const SignIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((authUser) => {
            console.log(authUser);
        })
        .catch((error) => {
            alert(error.message);
        });
    };

    return (
        <div className="SignUpScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} placeholder="Email" type="email" />
                <input ref={passwordRef} placeholder="Password" type="password" />
                <button type="submit" onClick={SignIn}> Sign In</button>
                <p>
                    <span className="SignUpScreen__gray">
                        New to Netflix?
                    </span> 
                    <span className="SignUpScreen__whiteLink" onClick={register}>
                        Sign up now
                    </span>
                </p>
            </form>
            
        </div>
    )
}

export default SignUpScreen

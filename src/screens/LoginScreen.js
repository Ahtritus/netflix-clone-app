import React, { useState, useEffect } from 'react'
import './LoginScreen.css'
import SignUpScreen from './SignUpScreen';

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);


    return (
        <div className="LoginScreen">
            <div className="LoginScreen__background">
                <img 
                    className="LoginScreen__logo"
                    src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
                    alt="" 
                />
                <button 
                    onClick={() => setSignIn(true)}
                    className="LoginScreen__button"
                >
                    Sign In
                </button>
                <div className="LoginScreen__gradient" />
            </div>

            {signIn ? (
                <SignUpScreen />
                ) : (
                        <div className="LoginScreen__body">
                        <h1>Unlimited movies, TV shows and more.</h1> 
                        <h2>Watch anywhere. Cancel any time.</h2>
                        <h3>Ready to watch? Enter your email address to create or restart your membership.</h3>

                        <div className="LoginScreen__input">
                            <form>
                                <input type="email" placeholder="Email address"/>
                                <button 
                                    onClick={() => setSignIn(true)}
                                    className="LoginScreen__getStarted"
                                >
                                    GET STARTED
                                </button>
                            </form>
                        </div>
                    
                    </div>
                )
            }
        </div>
    );
}

export default LoginScreen

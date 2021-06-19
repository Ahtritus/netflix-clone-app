import React, { useEffect, useState } from 'react';
import './PlansScreen.css';
import db from '../firebase';
import { useSelector} from 'react-redux';
import { selectUser } from "../features/userSlice";
import { loadStripe } from '@stripe/stripe-js';

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        
        db.collection("customers")
        .doc(user.uid)
        .collection("subscriptions")
        .get()
        .then((querySnapshot) => {
            
            querySnapshot.forEach(async (subscription) => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                });
            });
        });
    }, [user.uid]);

    useEffect(() => {
        db.collection("products")
            .where("active", "==", true)
            .get()
            .then((querySnapshot) => {
                if(!querySnapshot.empty){
                    const newProducts = {};
                    
                    querySnapshot.forEach(async (productDoc) => {
                        
                        newProducts[productDoc.id] = productDoc.data();

                        const priceSnap = await productDoc.ref.collection("prices").get();
                        priceSnap.docs.forEach(price => {
                            newProducts[productDoc.id].prices = {
                                priceId: price.id,
                                priceData: price.data()
                            }
                        })
                    });
                    setProducts(newProducts);
                }
                else{
                    console.log("No products")
                }
                
            });
    }, [])

    
    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers')
        .doc(user.uid)
        .collection("checkout_sessions")
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async(snap) => {
            const {error, sessionId } = snap.data();
            if(error) {
                alert(`An error occurred: ${error.message}`);
            }

            if(sessionId) {
                const stripe = await loadStripe("pk_test_51J3zDsSAQvV4KZxZPeBBxxaBR90WxeltLCgVy2zyKzKkBgzFd2xeJsNGMDGUW52t59IPj1IEgKOZbovlFazmpfGD00pzWoQ4oL");
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    return (
        <div className="plansScreen">
            {subscription && <p>Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId, productData]) => {
                const isCurrentPlan = productData.name
                    ?.toLowerCase()
                    .includes(subscription?.role);
                
                return (
                    <div 
                        key={productId}
                        className={`${
                            isCurrentPlan && "plansScreen__plan--disabled"
                        } plansScreen__plan`}
                    >

                        <div className="plansScreen__info">
                            <h4>{productData.name}</h4>
                            <h5>{productData.description}</h5>
                        </div>

                        <button onClick={() => !isCurrentPlan && loadCheckout(productData.prices.priceId)}>
                            {isCurrentPlan? "Current Plan" : "Subscribe"}
                        </button>
                    </div>
                );
            })}
            
        </div>
    )
}
export default PlansScreen;

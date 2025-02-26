import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import SigninScreen from './screens/SigninScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import { signout } from './actions/userAction.js';
import ShippingAddressScreen from './screens/ShippingAddressScreen.jsx';
import PaymentMethodScreen from './screens/PaymentMethodScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import OrderHisotyScreen from './screens/OrderHisotyScreen.js';
import ProfileScreen from './screens/ProfileScreen.jsx';

function App () {
    // get cart from redux store using useSelector
    const cart = useSelector(state => state.cart);
    // decontructure cart to get cartItems
    const {cartItems} = cart;
    //get userInfo from redux store
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    //signout handler 
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    };

    // console.log(userInfo);
    return (
        <BrowserRouter>
            <div className='grid-container'>
                <header className='row'>
                    <div>
                        <Link className='brand' to='/'>
							Zankoo
                        </Link>
                    </div>
                    <div>
                        <Link to='/cart'>
                            Cart
                            {
                                cartItems.length > 0 && (
                                    <span className='badge'>{ cartItems.length }</span>
                                )
                            }  
                        </Link>
                        {
                            userInfo 
                                ? (
                                    <div className='dropdown'>
                                        <Link to="#">
                                            { userInfo.name } 
                                            <i className="fa fa-caret-down"></i>{ ' ' }
                                        </Link> 
                                        <ul className='dropdown-content'>
                                            <li>
                                                <Link to="/profile">Profile</Link>
                                            </li>
                                            <li>
                                                <Link to="/orderhistory">Orders</Link>
                                            </li>
                                            <li>
                                                <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                )
                                : <Link to='/signin'>Sign In</Link>
                        }
                      
                    </div>
                </header>
                <main>                  
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/signin' component={SigninScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/shipping' component={ShippingAddressScreen} />
                    <Route path='/payment' component={PaymentMethodScreen} />
                    <Route path='/placeorder' component={PlaceOrderScreen} />
                    <Route path='/order/:id' component={OrderScreen} />
                    <Route path='/orderhistory' component={OrderHisotyScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route exact path='/' component={HomeScreen} />
                </main>
                <footer className='row center'>All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
1. Lets install react app;
2. Lets install firebase project and configure its database + storage;
3. Lets install tailwind css in react project;
4. Lets install some packages:
    => npm install firebase framer-motion react-icons react-router-dom;
5. Lets have component folder for diffrent diffrent components like header footer etc etc;
6. Lets import BrowerRouter in index.js and inside BrowserRouter tag lets have App component;
7. In App.js lets have header component routes for screen changes;
8. Lets do authentication->
    8.1: lets have .env file in main folder;
    8.2: inside it lets have->
        REACT_APP_FIREBASE_API_KEY =  "AIzaSyBaMArkpBNh4Tb-knf2Rhho-9GjwzJp0VA",
        REACT_APP_FIREBASE_AUTH_DOMAIN =  "restaurant-app-f70e7.firebaseapp.com",
        REACT_APP_FIREBASE_DB_URL =  "https://restaurant-app-f70e7-default-rtdb.firebaseio.com",
        REACT_APP_FIREBASE_PROJECT_ID =  "restaurant-app-f70e7",
        REACT_APP_FIREBASE_STORAGE_BUCCKET =  "restaurant-app-f70e7.appspot.com",
        REACT_APP_FIREBASE_MESSAGING_ID =  "595679339723",
        REACT_APP_FIREBASE_APP_ID =  "1:595679339723:web:55d153ed14627ebc3d674e"

    #* code inside ("") should come from firebase/projectSetting/const firebaseConfig ={} *#

    8.3: inside src folder lets have a file name it->firebase.config.js;
    8.4: inside this file lets have some code=>
        import {getApp, getApps, initializeApp} from 'firebase/app';
        import {getFirestore} from 'firebase/firestore';
        import {getStorage} from 'firebase/storage'; 
        const firebaseConfig = {
            collect code from firebase project setting;
        };
        const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
        const firestore = getFirestore(app);
        const storage = getStorage(app);
        export {app, firestore, storage};

    8.5: In this project we are using firebase google login option.For that in login button lets have onClick={randomFunction}
    8.6: 8.5 login button situated in which file in that file before return lets call some file and 8.5 randomFunction;
        -> 
            import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
            import { app } from "../firebase.config";
            import { async } from "@firebase/util";
            const firebaseAuth = getAuth();
            const provider = new GoogleAuthProvider();

            const login = async () => {
                const response = await signInWithPopup(firebaseAuth, provider);
                console.log(response);
            };

    
    9. after gmail login for get the login information of user lets have some help form redux=>
        9.1: Lets have context folder in src folder;
        9.2: context/StateProvider.js=>
            import React, {createContext, useContext, useReducer} from 'react'

            export const StateContext = createContext();

            export const StateProvider = ({reducer, initialState, children}) => (
                <StateContext.Provider value={useReducer(reducer, initialState)}>
                    {children}
                </StateContext.Provider>
            );

            export const useStateValue = () => useContext(StateContext);

        9.3: context/reducer.js=>
            export const actionType = {
                SET_USER: 'SET_USER'
            }

            const reducer = (state, action) => {
                console.log(action);

                switch(action.type){
                    case actionType.SET_USER:
                        return {
                            ...state,
                            user: action.user,
                        };
                    default:
                        return state;
                }
            };

            export default reducer;

        9.4: context/initialState.js=>
            export const initialState = {
                user: null,
            }

        9.5: in 8.6 before 8.5 function lets have->
            const [{ user }, dispatch] = useStateValue();
            in 8.5 function instance of console.log lets have->
                dispatch({
                    type: actionType.SET_USER,
                    user: providerData[0],
                });

        9.6: 

        9.7:
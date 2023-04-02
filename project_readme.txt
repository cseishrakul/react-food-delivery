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

        9.6: after login in navbar if we want to show login users pic then in navbar img tag src: {user ? user.photoURL : defaultImage};
        9.7: after login if we want to save data even after login as well then->
            
            9.7.1: in 8.5 functions after dispatch lets have->
                localStorage.setItem('user',JSON.stringify(providerData[0])); [it will collect user info in localStorage]
            
            9.7.2: In src folder lets have another folder called utlis and inside this lets have a file called fetchLocalStoargeData.js->
                export const fetchUser = () => {
                const userInfo =
                    localStorage.getItem("user") !== "undefined"
                    ? JSON.parse(localStorage.getItem("user"))
                    : localStorage.clear();

                return userInfo;
                };

            9.7.3: Then in context folder initialState.js file->
                import { fetchUser } from "../utils/fetchLocalStroageData"
                const userInfo = fetchUser();
                export const initialState = {
                    user: userInfo,
                }

            * This will save save user info even after reload as well;
        
        9.8: even after 9.7 as well if anyone click in user profile image they will see login option.To close that=>
            9.8.1: inside 8.5 function lets have if statement and in if statement lets have all the code of 8.5 function->
                if(!user){
                    code of 8.5 function;
                }

        9.9: User profile pic onClick if we wanna have a dropdown then:
            9.9.1: in navbar inside a div lets have some link;
            9.9.2: in header funtion after useStateValue line lets have->
                const [isMenu, setisMenu] = useState(false);
            9.9.3: after 9.8.1 if statement in else{
                setisMenu(!isMenu);
            }

            9.9.4: lets wrap 9.9.1 div ->
            {
                isMenu && (
                    9.9.1 div
                )
            }

            9.9.5: in dropdown if we have any link which can only seen by admin then lets wrap this link with->
            {
                user && user.email == "admin@email" && (
                    Link tag
                )
            }
        9.10: Lets responsive for mobile device and make logout option for user->
            9.10.1: for that lets have onClick in logout link.=>
                <p onClick={logout}>
                  Logout <MdLogout />
                </p>

            9.10.2: and lets make this function->
                const logout = () => {
                    setisMenu(false)
                    localStorage.clear()
                    dispatch({
                    type: actionType.SET_USER,
                    user: null
                    })
                }
            
            9.10.3: and lets this function inside createItem Link->p tag:
                    onClick={() => setisMenu(false)} && also add this inside every li tag of mobile device;

    10. Lets Do Header Part with responsive mode..

    Lets Create CreateContainer part 

    11. Lets make CreateContainer component;
    12. Inside this component before return lets have->
        const [title, setTitle] = useState("");
        const [calories, setCalories] = useState("");
        const [price, setPrice] = useState("");
        const [category, setCategory] = useState(null);
        const [imageAsset, setImageAsset] = useState(null);
        const [fields, setFields] = useState(false);
        const [alertStatus, setAlertStatus] = useState("danger");
        const [msg, setMsg] = useState(null);
        const [isLoading, setIsLoading] = useState(false);

        for change the states;
    
    13. Lets have some input fields in this component for adding title image category of products;
    14. utils->data.js lets have ->
        export const categories = [
            {
                id: 1,
                name: "Chicken",
                urlParamName: "chicken"
            },
            {
                id: 2,
                name: "Currry",
                urlParamName: "curry"
            },
            {
                id: 3,
                name: "Rice",
                urlParamName: "rice"
            },
            {
                id: 4,
                name: "Fish",
                urlParamName: "fish"
            },
            {
                id: 5,
                name: "Fruits",
                urlParamName: "fruits"
            },
            {
                id: 6,
                name: "Icecreams",
                urlParamName: "icecreams"
            },
            {
                id: 7,
                name: "Soft Drinks",
                urlParamName: "drinks"
            },
        ];->This all are categories.Lets use this all categories inside select tag to select the category;


    15. Lets import data in firebase cloud firestore of create Item:
        title,price,category,image
        
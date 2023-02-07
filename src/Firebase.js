import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
 const firebaseConfig = {
    apiKey: "AIzaSyBJz10NV5u_yK9mrdeNd70iBnL2uwxGqKA",
    authDomain: "registration-72300.firebaseapp.com",
    databaseURL: "https://registration-72300-default-rtdb.firebaseio.com",
    projectId: "registration-72300",
    storageBucket: "registration-72300.appspot.com",
    messagingSenderId: "616732186119",
    appId: "1:616732186119:web:830eb83f5f3b188e0cfca2"
  };
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  export {auth }
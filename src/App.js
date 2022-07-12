import React, { Component } from 'react'
import SignUp from './forms/SignUp'
import SignIn from './forms/SignIn'
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword,  
  signInWithEmailAndPassword, 
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  // signInWithRedirect,
 } from "firebase/auth";
// import { getDatabase } from "firebase/database";
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

export default class App extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        // page: 1= signUp, 0=signin
          page:1,
          message:'',
        //  type: 1=sucess, 0=failure
          type:1,
      }
    }
    pageSwitchHandlar =(r)=>{
      r.preventDefault();
      this.setState({page: !this.state.page, message:null})
    }
    registerHandlar =(event)=>{ 
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
      const cpassword = event.target.cpassword.value;
      if(password !== cpassword) {
       this.setState({message:"Passwords do not match", type:0});
        return;
      };

      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, email, password)
      .then((success) => {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          this.setState({message:"Please Verify your Email", type:0});
        });
        this.setState({message:"User created successfully", types:1});
        event.target.email.value="";
        event.target.password.value="";
        event.target.cpassword.value="";
      })
      
      .catch((error) => {
        this.setState({message:error.message, types:0});
        console.log(error);
      });
    }

    signinHandlar =(i)=>{
      i.preventDefault();
      const email = i.target.email.value;
      const password = i.target.password.value;
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, email, password)
      .then((success) => {
        console.log(success);

          this.setState({message:"Login successfully", types:1});

        i.target.email.value="";
        i.target.password.value="";
      })
      .catch((error) => {
        console.log(error);
        this.setState({message:error.message, types:0});
      });

    };

    googleHandlar =(event)=>{
      event.preventDefault();
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      signInWithPopup(auth, provider)
      .then((success) => {
        console.log(success.user);
        this.setState({message:"Successfully", types:1});
      }).catch((error) => {
      console.log(error);
      this.setState({message:error.message, types:0});
      });
    };

    facebookHandlar=(event)=>{
      event.preventDefault();
      const provider = new FacebookAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result);
          this.setState({message:"Successfully", types:1});
        })
        .catch((error) => {
          console.log(error);
          this.setState({message:error.message, types:0});
        });
    }
  
  render() {
    return (<>
    {this.state.page ?
     <SignUp 
     switch={this.pageSwitchHandlar} 
     register={this.registerHandlar} 
     messages={this.state.message} 
     types={this.state.type}
     google={this.googleHandlar}
     facebook={this.facebookHandlar}/> : 
     <SignIn 
     switch={this.pageSwitchHandlar} 
     signin={this.signinHandlar} 
     messages={this.state.message} 
     types={this.state.type}
     google={this.googleHandlar}
     facebook={this.facebookHandlar}/>} 
   
    </>)
  }
}

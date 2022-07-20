import React, { useState } from 'react'
import SignUp from './forms/SignUp'
import SignIn from './forms/SignIn'
import { auth } from './Firebase';
import { 
  createUserWithEmailAndPassword,  
  signInWithEmailAndPassword, 
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
 } from "firebase/auth";

  const inittials ={
    page:1,
    message:'',
    type:1,
  }
  export default function App(){
    const [state, setState] =useState(inittials)
  
    const pageSwitchHandlar =(r)=>{
      r.preventDefault();
      setState({page: !state.page, message:null})
    }
    const registerHandlar =(event)=>{ 
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
      const cpassword = event.target.cpassword.value;
      if(password !== cpassword) {
       setState({message:"Passwords do not match", type:0});
        return;
      };

      createUserWithEmailAndPassword(auth, email, password)
      .then((success) => {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          setState({message:"Please Verify your Email", type:0});
        });
        setState({message:"User created successfully", types:1});
        event.target.email.value="";
        event.target.password.value="";
        event.target.cpassword.value="";
      })
      
      .catch((error) => {
        setState({message:error.message, types:0});
        console.log(error);
      });
    }

    const signinHandlar =(i)=>{
      i.preventDefault();
      const email = i.target.email.value;
      const password = i.target.password.value;
      signInWithEmailAndPassword(auth, email, password)
      .then((success) => {
        console.log(success);

          setState({message:"Login successfully", types:1});

        i.target.email.value="";
        i.target.password.value="";
      })
      .catch((error) => {
        console.log(error);
        setState({message:error.message, types:0});
      });

    };

    const googleHandlar =(event)=>{
      event.preventDefault();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
      .then((success) => {
        console.log(success.user);
        setState({message:"Successfully", types:1});
      }).catch((error) => {
      console.log(error);
      setState({message:error.message, types:0});
      });
    };

    const facebookHandlar=(event)=>{
      event.preventDefault();
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result);
          setState({message:"Successfully", types:1});
        })
        .catch((error) => {
          console.log(error);
          setState({message:error.message, types:0});
        });
    }
  
    return (<>
    {state.page ?
     <SignUp 
     switch={pageSwitchHandlar} 
     register={registerHandlar} 
     messages={state.message} 
     types={state.type}
     google={googleHandlar}
     facebook={facebookHandlar}/> : 
     <SignIn 
     switch={pageSwitchHandlar} 
     signin={signinHandlar} 
     messages={state.message} 
     types={state.type}
     google={googleHandlar}
     facebook={facebookHandlar}/>} 
   
    </>)
  }

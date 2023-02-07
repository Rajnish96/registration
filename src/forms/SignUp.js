import React from 'react'

export default function SignUp(props) {
    let msgClass =['text-center'];
    if(props.types){
        msgClass.push('text-success');
    } else {
        msgClass.push('text-info'); 
    }
  return(<>
  <div className='container-fluid'>
    <div className='row justify-content-evenly'>
        <div className='col-md-6 card mt-5 mb-5 p-3 '>
            <form onSubmit={props.register}>
                <div className='text-center mb-3'>
                    <h3>Create Account </h3>
                    <h5>lets Start with your free Account</h5>
                </div>
                <div> 
                    <button type='button' onClick={props.google} className='btn btn-primary form-control mb-2' >SignUp via Google</button>
                    <button type='button' onClick={props.facebook} className='btn btn-info form-control mb-2' >SignUp via Facebook</button>
                </div>
                <hr />
                <p className={msgClass.join(" ")}>{props.messages}</p>
                <div className='mb-3'>
                    <input type='email' required className='form-control mb-1' placeholder='Email Address' name='email' />
                    <input type='password' required className='form-control mb-1' placeholder='Create Password' name='password' />
                    <input type='password' required className='form-control mb-1' placeholder='Confirm Password' name='cpassword' />
                </div>
                <div>
                <button type='submit' className='btn btn-success form-control mb-2' >Create Account</button>
                </div>
                <div className='text-center mb-2'>
                    <p>Have an Account ?<a href='/' onClick={props.switch}>LogIn</a></p>
                </div>
            </form> 
        </div>
    </div>
  </div>
  
  </>)
}

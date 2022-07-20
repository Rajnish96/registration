import React from 'react'

export default function signIn(props) {
    let msgClass =['text-center'];
    if(props.types){
        msgClass.push('text-success');
    } else {
        msgClass.push('text-danger');
    }
  return (<>  
  <div className='container-fluid'> 
    <div className='row justify-content-evenly'>
        <div className='col-md-6 card mt-5 mb-5 p-3 '> 
            <form onSubmit={props.signin}>
                <div className='text-center mb-3'>
                    <h3>LogIn</h3>
                </div>
                <div> 
                    <button type='button' onClick={props.google} className='btn btn-primary form-control mb-2' >LogIn via Google</button>
                    <button type='button' onClick={props.facebook} className='btn btn-info form-control mb-2' >LogIn via Facebook</button>
                </div>
                <hr />
                <p className={msgClass.join(" ")}>{props.messages}</p>
                <div className='mb-3'>
                    <input type='email' required className='form-control mb-1' placeholder='Email Address' name='email' />
                    <input type='password' required className='form-control mb-1' placeholder='Password' name='password' />
                </div>
                <div>
                <button type='submit' className='btn btn-success form-control mb-2' >LogIn</button>
                </div>
                <div className='text-center mb-2'>
                    <p><a href='/' onClick={props.switch}>Create</a> an Account
                    </p>
                </div>
            </form>
        </div>
    </div>
  </div>
  
  </>)
}

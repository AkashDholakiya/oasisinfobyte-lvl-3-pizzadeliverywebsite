import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import '../css/loginsignup.css'
import {AiOutlineEyeInvisible} from 'react-icons/ai'
import {AiOutlineEye} from 'react-icons/ai'

const Login = (props) => {
    const [cred, setcred] = useState({ nameemail: '', password: '', role: 'user' });
    const [eyeshow, seteyeshow] = useState(false);
    let Navigate = useNavigate();
    const handle = async (e) => {
        let validation = true;
        if(cred.nameemail === '' || cred.password === '' ) {
            alert("Please fill all the fields");
            validation = false;
        }
        
        if(validation){
            e.preventDefault();
            const response = await fetch(`http://localhost:4000/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nameemail: cred.nameemail, password: cred.password,role:cred.role })
            })
            const json = await response.json();
            console.log(json);
            if (json.success) {
                localStorage.setItem('token', json.token);
                alert("Login Successful");
                // props.showAlert("Login Successful", "success");
                Navigate("/");
            } else {
                alert("Invalid Credentials");
                //     // props.showAlert("Invalid Credentials", "danger");
            }
        }else{
            e.preventDefault();
        }
    }
    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
    }
    const addstyle = {
        fontweight: 'bold'
    }
    return (
        <div className='container logsig'>
            <h1 className='my-4'>Login</h1>
            <form onSubmit={handle}>
                <div className="mb-2">
                    <label htmlFor="text" className="form-label">Username or Email</label>
                    <input type="nameemail" className="form-control" value={cred.nameemail} onChange={onChange} id="nameemail" name="nameemail" aria-describedby="nameemailHelp" />
                </div>
                <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group passeye">
                        <input type="password" className="form-control" value={cred.password} onChange={onChange} id="password" name='password' />
                        {!eyeshow ? <span className='eye' onClick={() => {seteyeshow(!eyeshow)
                        document.getElementById('password').type = eyeshow ? 'password' : 'text';}}><AiOutlineEye/></span>
                        : <span className='eye' onClick={() => {seteyeshow(!eyeshow)
                        document.getElementById('password').type = eyeshow ? 'password' : 'text';
                        }}><AiOutlineEyeInvisible/></span>}
                    </div>
                </div>
                <div className="form-check my-2 mb-3">
                    <input className="form-check-input" type="checkbox" name="role" id="admin" onChange={() => cred.role = cred.role === 'user' ? 'admin' : 'user'} />
                        <label className="form-check-label" htmlFor="admin">
                            Admin
                        </label>
                </div>
                <div className="center">
                <Link className='link' to='/forgot-password'>Forgot Password?</Link>
                </div>
                <div className='center'>
                    <p style={addstyle}>Don't Have an Account? <Link className='link' to='/signup'>Signup</Link></p>
                </div>
                <div className="submit">
                <button type="submit" className="btn btn-primary my-2">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
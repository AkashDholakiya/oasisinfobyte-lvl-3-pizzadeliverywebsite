import React, { useState } from 'react'
// import { useNavigate,Link } from 'react-router-dom'
import '../css/loginsignup.css'

const ForgotPass = () => {
    const [cred, setcred] = useState({ email: '',role: 'user' });
    // let Navigate = useNavigate();
    const handle = async (e) => {
        let validation = true;
        if(cred.email === '') {
            alert("Please fill all the fields");
            validation = false;
        }
        if(validation){
            e.preventDefault();
            const response = await fetch(`http://localhost:4000/api/v1/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email:cred.email,role:cred.role })
            })
            const json = await response.json();
            console.log(json);
            if (json.success) {
                alert("Email Sent Successfully to your email id");    
            } else {
                alert("Invalid Credentials");
            }
        }else{
            e.preventDefault();
        }
    }
    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <div className='container logsig'>
            <h1 className='my-4'>Forgot Password</h1>
            <form onSubmit={handle}>
                <div className="mb-2">
                    <label htmlFor="text" className="form-label">Email</label>
                    <input type="email" className="form-control" value={cred.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" style={{width:'400px'}} />
                </div>
                <div className="form-check my-2 mb-3">
                    <input className="form-check-input" type="checkbox" name="role" id="admin" onChange={() => cred.role = cred.role === 'user' ? 'admin' : 'user'} />
                        <label className="form-check-label" htmlFor="admin">
                            Admin
                        </label>
                </div>
                <div className="submit">
                <button type="submit" className="btn btn-primary my-2">Send</button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPass;

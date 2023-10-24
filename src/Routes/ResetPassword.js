import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { id, token } = useParams();
    const [cred, setcred] = useState({ password: ''});
    const validateUser = async () => {
        const res = await fetch(`http://localhost:4000/api/v1/auth/reset-password/${id}/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json();
        console.log(data);
        if (data.success) {
            console.log("User Valid");
        } else {
            alert("TOKEN EXPIRED!!");
        }
    }
    const handle = async (e) => {
        let validation = true;
        if(cred.password === '') {
            alert("Please fill all the fields");
            validation = false;
        }
        if(validation){
            e.preventDefault();
            const response = await fetch(`http://localhost:4000/api/v1/auth/reset-password/${id}/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: cred.password })
            })
            const json = await response.json();
            console.log(json);
            if (json.success) {
                alert("Password Changed Successfully");
            } else {
                alert("Invalid Credentials");
            }
        }
        else{ 
            console.log("Invalid Credentials");
            e.preventDefault();
        }   
    }

    useEffect(() => {
        validateUser();
        // eslint-disable-next-line
    }, [])
    console.log(cred);
    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
    }
  return (
    <div>
      <div className='container logsig'>
            <h1 className='my-4'>Reset Password</h1>
            <form onSubmit={handle}>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input type="password" className="form-control" value={cred.password} onChange={onChange} id="password" name='password' />
                </div>
                <div className="submit">
                <button type="submit" className="btn btn-primary my-2">Send</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ResetPassword

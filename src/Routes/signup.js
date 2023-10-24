import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/loginsignup.css'

const Signup = (props) => {
    const [cred, setcred] = useState({username : '',email : '',password : '',cpassword: '',role : 'user'})
    let Navigate = useNavigate(); 
    const handle = async (e) => {
        let validation = true;
        const regexUsername = /^[a-zA-Z0-9]+([_]?[a-zA-Z0-9])*$/;
        if(cred.username === '' || cred.email === '' || cred.password === '' || cred.cpassword === '' || cred.role === '') {
            alert("Please fill all the fields");
            validation = false;
        }
        else if(regexUsername.test(cred.username) === false){
            alert("Username must be alphanumeric");
            validation = false;
        }
        else if(cred.password !== cred.cpassword){
            alert("Password and Confirm Password must be same");
            validation = false;
        }
        if(validation){
            e.preventDefault();
            const {username,email,password,role} = cred;
            const response = await fetch(`http://localhost:4000/api/v1/auth/register`,{
                method : 'POST',
                headers : { 
                    'Content-Type' : 'application/json',
                }, 
                body : JSON.stringify({username,email,password,role})
            })  
            const json = await response.json();
            console.log(json);  
            if(json.success){
                localStorage.setItem('token',json.token);
                alert("Account Created Successfully");
                // props.showAlert("Account Created Successfully","success");
                Navigate("/");
            }else{
                alert("Invalid Credentials");
                // props.showAlert("Invalid Credentials","danger");
            }
        }else{
            e.preventDefault();
        }
    }
    const onChange = (e) => {
        setcred({...cred, [e.target.name] : e.target.value})
    }
    return (
        <div className='container logsig'>
            <h1 className='my-4'>Sign Up</h1>
            <form onSubmit={handle}> 
                <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control"  value={cred.name} onChange={onChange} id="username" name="username" aria-describedby="emailHelp" />
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={cred.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={cred.password} onChange={onChange} id="password" name='password' minLength={5} required />
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={cred.cpassword} onChange={onChange} id="cpassword" name='cpassword' minLength={5} required />
                </div>
                <div className="form-check my-2 mb-3">
                    <input className="form-check-input" type="checkbox" name="role" id="admin" onChange={() => cred.role = cred.role === 'user' ? 'admin' : 'user'} />
                        <label className="form-check-label" htmlFor="admin">
                            Admin
                        </label>
                </div>
                <div className='center'> 
                    <p>Already Have an Account? <Link className='link' to='/login'>Login</Link></p>
                </div>
                <div className="submit">
                <button type="submit" className="btn btn-primary my-1">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
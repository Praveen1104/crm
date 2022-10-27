import {useState} from 'react';
import {DropdownButton,Dropdown} from 'react-bootstrap';
import { UserSignin, UserSignup } from '../api/auth';
import {useNavigate} from 'react-router-dom';

function Login(){
    const [showsignup, setsignup] = useState(false);
    const [userType, setusertype] = useState("CUSTOMER");
    const [userId, setuserid] = useState("");
    const [password, setpassword] = useState("");
    const [username,setusername]=useState("");
    const [email,setemail]=useState("");
    const [message,setmessage]=useState("");
        console.log(userType)
    const navigate=useNavigate();
    const updatesignupdata=(e)=>{
        if(e.target.id === "userid"){
            setuserid(e.target.value)
        }
        else if(e.target.id === "password"){
            setpassword(e.target.value)
        }
        else if(e.target.id === "email"){
            setemail(e.target.value)
        }
        else if(e.target.id === "username"){
            setusername(e.target.value)
        }

    }
    const toggle =()=>{
        setsignup(! showsignup)
    }
    const handleselect=(e)=>{
            setusertype(e)
    }
    const signupfn=(e)=>{
        e.preventDefault();
        const data={
            userId:userId,
            password:password,
            name:username,
            userTypes:userType,
            email:email

        }
        console.log(data.userTypes)
        UserSignup(data).then((response)=>{
            console.log("success");
            console.log(response.data)

            if(response.data.userTypes === "CUSTOMER")
                navigate('/customer')
            else if(response.data.userTypes === "ENGINEER")
                navigate('/engineer')
            else if(response.data.userTypes === "ADMIN")
                navigate('/admin')
            else 
               navigate('/')
        }).catch((error)=>{
            console.log(error)
        })
    }
    
    const loginfn=(e)=>{
        e.preventDefault();
        const data={
            userId:userId,
            password:password
        }
        UserSignin(data).then((response)=>{
            //setItem("name", value)
            console.log(response.data)
            localStorage.setItem("name",response.data.name);
            localStorage.setItem("userId",response.data.userId);
            localStorage.setItem("email",response.data.email);
            localStorage.setItem("userTypes",response.data.userTypes);
            localStorage.setItem("userStatus",response.data.userStatus);
            localStorage.setItem("token",response.data.accessToken);

            if(response.data.userTypes === "CUSTOMER")
                window.location.href="/customer"
            else if(response.data.userTypes === "ENGINEER")
                window.location.href="/engineer"
            else if(response.data.userTypes === "ADMIN")
                window.location.href="/admin"
            else 
                window.location.href="/"
            
        }).catch((error)=>{
            console.log(error)
            setmessage(error.response.data.message)
        })
    }
    
    return(
        <div className='bg-info d-flex justify-content-center align-items-center vh-100'>
            <div className='card p-3 rounded-4 shadow-lg'  style={{width:20 +'rem'}}>
            <h4 className='text-center text-info'>{showsignup ? 'Sign Up' :' Log In'}</h4>
            <form onSubmit={showsignup ? signupfn : loginfn}>
            <div className='input-group'>
                    <input type="text" className="form-control m-1"  placeholder='User id' id="userid" value={userId} onChange={updatesignupdata}/>
                </div>
                {
                    showsignup && 
                    <>
                     <div className='input-group'>
                        <input type="email" className="form-control m-1" id='email' onChange={updatesignupdata}  placeholder='Email'/>
                      </div>
                      <div className='d-flex justify-content-between m-1'>
                      <span className='my-1'>User Type</span>
                        <DropdownButton 
                        align="end"
                        title={userType}
                        id="userType"
                        variant='light'
                        onSelect={handleselect}>
                            <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                            <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                        </DropdownButton>
                      </div>
                      <div className='input-group'>
                        <input type="text" className="form-control m-1" id="username" onChange={updatesignupdata} placeholder='username'/>
                      </div>  
                    </>
                }
                <div className='input-group'>
                    <input type="password" className="form-control m-1"  placeholder='password' id='password' value={password} onChange={updatesignupdata}/>
                </div>
                <div className='input-group'>
                    <input type="submit" className="btn btn-info form-control m-1 text-white fw-bolder rounded-4"  placeholder='submit' value={showsignup
                    ? "Sign Up" : "Log In"}/>
                </div>
                <div className="m-1 text-center" onClick={toggle}>
                        {showsignup ? "Already have an account ? Login " : " Don't have an account ? Signup"}
                </div>

                <div className="text-center text-danger">{message}</div>
            </form>
                
                
            </div>
        </div>
    )
}

export default Login 
import { useState } from 'react/cjs/react.development';
import InputBox from '../../components/input_box';
import './style.css';

export default function LoginScreen(props){
    let [username, setUserName] = useState("");
    let [password, setPassword] = useState("");

    const authUser = async ()=>{
        await fetch(
            "http://localhost:3001/api/authAdmin",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                accept: "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    uname: username,
                    pass: password
                })
            }
        ).then(response => response.json())
          .then(response => {
              if(response.code === 200){
                  props.loginState(true);
              } else if(response.code === 499 || response.code === 498){
                  props.loginState(false);
              }
          })
    }

    return (
        <>
            <div className='loginRoot'>
                <h2>Sign in to continue</h2>
                <div className='form'>
                <InputBox label="Username" hint="Enter your username" value={username} onChange={(e)=>{setUserName(e.target.value)}} />
                <InputBox label="Password" hint="Enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />

                <button className='loginBtn clickable' onClick={authUser}>Login</button>
                </div>
            </div>
        </>
    );
}
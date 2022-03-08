import { useState, useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/home_screen/'
import LoginScreen from './screens/login_screen';

function App() {
  let [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn);
  useEffect(async ()=>{
    await fetch(
      "http://localhost:3001/api/authAdmin",
      {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          accept: "application/json"
          },
          credentials: 'include'
      }
  ).then(response => response.json())
    .then(response => {
        if(response.code === 200){
            setLoggedIn(true);
        } else if(response.code === 499 || response.code === 498){
            setLoggedIn(false);
        }
    })
}, [])

  return (
    <div className="App">
      {loggedIn === true ? <HomeScreen loginState={(x)=>{setLoggedIn(x)}}/> : <LoginScreen loginState={(x)=>{setLoggedIn(x)}}/>}
    </div>
  );
}

export default App;

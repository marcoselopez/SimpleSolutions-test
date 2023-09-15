import { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import Welcome from './Welcome';


function App() {

  // STATES
  const [loggedIn, setLoggedIn] = useState(false);
  
  // METHODS
  const handleLogin = () => {
    let username = 'asd';
    let password = '12345';

    fetch('../loginResponse.json', {
      // method: 'POST',
      headers: { 
        'Authorization': `Basic ${btoa(username + ":" + password)}`
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log('Login response:', json)
      sessionStorage.setItem('token', json.response.token);
      sessionStorage.setItem('expiresIn', json.response.expiresIn);
      sessionStorage.setItem('username', json.response.user.username);
      setLoggedIn(true);
    })
  };

  return (
    <>
      {
        loggedIn ? (
          <ProductList setLoggedIn={setLoggedIn} />
        ) : (
          <Welcome onLoginClick={handleLogin} />
        )
      }
    </>
  )
}

export default App;

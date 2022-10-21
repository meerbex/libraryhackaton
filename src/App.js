import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import io from 'socket.io-client';
import Routers from './routes'
import { setAuthToken } from './helpers/setAuthToken'
const socket = io("https://hackaton-round2.herokuapp.com/");

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('connnnnnection')
  //     setIsConnected(true);
  //   });

  //   socket.on('disconnect', () => {
  //     setIsConnected(false);
  //   });

  //   return () => {
  //     socket.off('connect');
  //     socket.off('disconnect');
  //     socket.off('pong');
  //   };
  // }, []);

  //check jwt token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, [])
  

  return (
    <div className="App">
      <Routers />
    </div>
  );
}

export default App;

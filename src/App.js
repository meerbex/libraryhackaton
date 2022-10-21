import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import io from 'socket.io-client';
import Routers from './routes'
import { AuthContext } from "./contexts/AuthContext";

import { setAuthToken } from './helpers/setAuthToken'
// const socket = io("https://hackaton-round2.herokuapp.com/");
import Modal from 'react-bootstrap/Modal';

function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [lastPong, setLastPong] = useState(null);

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

  const context = React.useContext(AuthContext);
  //check jwt token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    async function fetchMyAPI() {
      const settings = await context.getSettings();
      settings.forEach(setting => {
        context.updateState(setting.name, setting.value)
      });
    }
    fetchMyAPI()
  }, [])


  return (
    <div className="App">
      <Routers />

      <Modal show={context.show} >
        <Modal.Header >
          <Modal.Title>{context.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{context.modalBody}</Modal.Body>
        <Modal.Footer>
          <a className="btn btn-secondary" onClick={() => context.updateState('show', false)}>
            Закрыть
          </a>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default App;

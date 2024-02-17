/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-restricted-globals */
import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket
const Chat=()=>{
    const [name, setName] =useState('');
    const [room, setRoom] =useState('');
    const [message,setMessage] =useState('');
    const [messages,setMessages] =useState([]);

const ENDPOINT= 'https://manichat777.onrender.com/';
    useEffect(() => {
        const {name, room }=queryString.parse(location.search.substring(location.search));

        // eslint-disable-next-line no-restricted-globals
       socket= io(ENDPOINT);
        setName(name);
       setRoom(room);
        socket.emit('join',{name, room}, ()=>{
            

        });
        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

useEffect(()=>{
    socket.on('message',(message)=>{
        setMessages([...messages, message]);

    })
}, [messages]);

const sendMessage=(event)=>{

    event.preventDefault();
    if(message){
        socket.emit('sendMessage',message,()=>setMessage(''))
    }
}
console.log(message,messages);
    return (
          <div className="outerContainer">
      <div className="container">
      <InfoBar room={room} />
      <Messages messages={messages}/>

      <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>



     
      </div>
    
    </div>
    )
}

export default Chat;

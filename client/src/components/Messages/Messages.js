import React from 'react';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';
import './Messages.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message/Message'
const Messages=({messages, name})=>(
    <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}

    </ScrollToBottom>

  
   
)

export default Messages;

import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import { AttachFile, InsertEmoticon, MicOutlined, MoreVert,SearchOutlined } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Chat() {
    const [seed,setSeed] = useState('')
    const [input, setInput] = useState('');
    const  { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessage] = useState([])
    const [{ user }, dispatch] = useStateValue()
    useEffect(()=>{
      if (roomId){
        db
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => 
          setRoomName(snapshot.data().name)        
        );
        db.collection('rooms')
        .doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
          setMessage(snapshot.docs.map(doc => doc.data()))
        ))
      }
    }, [roomId])
    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000));
    },[roomId]);

    const sendMessage = (e) =>{
      e.preventDefault();
      db.collection('rooms').doc(roomId).collection('messages').add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput('')
    }
  return (
    <div className='chat'>
        <div className='chat_header'>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
          <div className="chat_headerInfo">
            <h3>{roomName}</h3>
            <p>Last seen {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}
            </p>
          </div>
          <div className="chat_headerRight">
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
        <div className="chat_body">
          {messages.map((message) =>(
              <p className={`chat_message ${ message.name === user.displayName && 'chat_reciever'}`}>
              <span className="chat_name">{message.name}</span>
             {message.message}  
              <span className="chat_timestamp">
                {new Date(message.timestamp?.toDate()).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}
                </span>
            </p> 
          ))}
            
        </div>
        <div className="chat_footer">
          <InsertEmoticon />
          <form>
            <input 
            value={ input }
            onChange={e => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"/>
            <button 
            onClick={sendMessage}
            type="submit"
            >Send a message</button>
          </form>
          <MicOutlined />
        </div>
    </div>
  )
}

export default Chat;
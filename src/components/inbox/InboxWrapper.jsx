import { SendRounded } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import './inbox-wrapper.css'

const InboxWrapper = () => {
  const { isAuthed } = useSelector((state) => state.auth);
  const admin = isAuthed ? JSON.parse(localStorage.getItem('admin')): []

  const [messages, setMessages] = useState([])
  const [chat, setChat] = useState([])
  const [selectedChat, setSelectedChat] = useState(0)
  const bottomRef = useRef(null)
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:9090/api/conversations")
      .then((res) => { setChat(res.data.reverse()) })
      .catch((err) => { console.log(err) })

    if (selectedChat !== 0) {
      axios.get(`http://localhost:9090/api/conversations/${selectedChat}`)
      .then((res) => {
        setMessages(res.data)
      })
      .catch((err) => {console.log(err)})
    }
  }, [chat, messages, selectedChat])

  const textRef = useRef()

  const handleSendMessage = () => {
    if (textRef.current.value) {
      const body = {
        chatId: messages.id,
        senderId: admin.username,
        text: textRef.current.value
      }

      axios.post(`http://localhost:9090/api/messages`, body)
        .then((res) => {
          if (res.data === true) {
            textRef.current.value = ''
            setIsScrolling(false)
          }
        })
        .catch((err)=> {console.log(err)})
    }
  }

  const handleScroll = () => {
    if (bottomRef.current) {
      const isAtBottom = bottomRef.current.getBoundingClientRect().bottom <= window.innerHeight;
      setIsScrolling(!isAtBottom);
    }
  };

  useEffect(() => {
    if (selectedChat !== 0) {
      const conversationContainer = document.querySelector('.conversation');
      conversationContainer.addEventListener('scroll', handleScroll);

      return () => {
        conversationContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [selectedChat]);

  useEffect(() => {
    if (!isScrolling && bottomRef.current) {
      bottomRef.current?.scrollIntoView(isScrolling ? { behavior: 'smooth' } : {});
    }
  }, [messages, isScrolling])

  return (
    <div className='inbox-wrapper'>
      <div className="inbox-list">
        {
          chat && chat.map((c) => (
            <div key={c.id} className="chat" onClick={(e) => setSelectedChat(c.username)}>
              <img src={c.avatar} alt={c.username} className="avatar" />
              <div className="username">{c.username}</div>
            </div>
          ))
        }
      </div>

      <div className='inbox'>
        {selectedChat !== 0 && (
          <>
          <div className="inbox-header">{messages.username}</div>

          <div className="conversation">
          {
            messages.messages && messages.messages.map((m) => (
              m.senderId === selectedChat ? (
                <div className="user-message">{m.text}</div>
              ) : (
                <div className="my-message">{m.text}</div>
              )
            ))
          }
            <div className="lastMessage" ref={bottomRef} />
          </div>

          <div className="send-text-section">
            <TextField inputRef={textRef} autoComplete='off' type="text" size='small' />
            <Button variant='contained' size='small' onClick={handleSendMessage}><SendRounded /></Button>
          </div>
          </>
        )}
      </div>
    </div>
  )
}

export default InboxWrapper

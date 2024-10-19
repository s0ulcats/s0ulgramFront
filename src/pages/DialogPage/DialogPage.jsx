import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineSend, AiOutlineMessage } from 'react-icons/ai'; // Importing icons
import axios from '../../utils/axios';
import s from './DialogPage.module.css'; // Importing CSS module

const DialogPage = () => {
    const { id: dialogId } = useParams(); // Get dialogId from route parameters
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        if (!dialogId) {
            console.error('dialogId is undefined');
            return;
        }

        try {
            const response = await axios.get(`/messages/${dialogId}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [dialogId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!dialogId || !message.trim()) {
            console.error("dialogId is undefined or message is empty");
            return;
        }

        try {
            const response = await axios.post(`/messages/${dialogId}`, { 
                message, 
                dialogId // Pass dialogId
            });
            console.log('Message sent:', response.data);
            setMessage(''); // Clear input field
            fetchMessages(); // Refresh messages list after sending
        } catch (error) {
            console.error('Error sending message:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className={s.dialogPage}>
            <h1 className={s.title}>Диалог</h1>
            <div className={s.messagesContainer}>
                {messages.map(msg => (
                    <div key={msg._id} className={s.message}>
                        <AiOutlineMessage className={s.messageIcon} /> {/* Message icon */}
                        <strong className={s.author}>{msg.author?.username || 'Unavailable author'}</strong>: 
                        <span className={s.content}>{msg.message || 'Not message'}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className={s.inputForm}>
                <input 
                    type="text" 
                    value={message} 
                    onChange={e => setMessage(e.target.value)} 
                    placeholder="Enter message" 
                    className={s.inputField}
                />
                <button type="submit" className={s.sendButton}>
                    Send <AiOutlineSend className={s.sendIcon} /> {/* Send icon */}
                </button>
            </form>
        </div>
    );
};

export default DialogPage;
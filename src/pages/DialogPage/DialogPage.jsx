import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineSend, AiOutlineMessage } from 'react-icons/ai';
import axios from '../../utils/axios';
import s from './DialogPage.module.scss';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';

const DialogPage = () => {
    const { id: dialogId } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { theme } = useContext(ThemeContext);

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
                dialogId 
            });
            console.log('Message sent:', response.data);
            setMessage('');
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className={`${s.dialogPage} ${theme === 'dark' ? s.dark : s.light}`}>
            <div className={`${s.messagesContainer} ${theme === 'dark' ? s.dark : s.light}`}>
                {messages.map(msg => (
                    <div key={msg._id} className={`${s.message} ${theme === 'dark' ? s.dark : s.light}`}>
                        <AiOutlineMessage className={s.messageIcon} />
                        <strong className={`${s.author} ${theme === 'dark' ? s.dark : s.light}`}>{msg.author?.username || 'Unavailable author'}:</strong>
                        <span className={`${s.content} ${theme === 'dark' ? s.dark : s.light}`}>{msg.message || 'Not message'}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className={`${s.inputForm} ${theme === 'dark' ? s.dark : s.light}`}>
                <input 
                    type="text" 
                    value={message} 
                    onChange={e => setMessage(e.target.value)} 
                    placeholder="Enter message" 
                    className={`${s.inputField} ${theme === 'dark' ? s.dark : s.light}`}
                />
                <button type="submit" className={`${s.sendButton} ${theme === 'dark' ? s.dark : s.light}`}>
                    Send <AiOutlineSend className={s.sendIcon} />
                </button>
            </form>
        </div>
    );
};

export default DialogPage;

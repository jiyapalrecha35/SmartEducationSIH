import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from './Messages';
import { useSelector } from 'react-redux';
import './Chats.css'
import Categories from './Categories';
const socket = io.connect('http://localhost:1001');

export default function Chat({ index, text, changeSelected }) {
    // console.log(index,text);
    const [room, setRoom] = useState("");
    const [name, setName] = useState('');
    const userEmail = useSelector(store => store.user.email);
    const userName = useSelector(store => store.user.displayName)
    // Messages States
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState([]);

    const joinRoom = () => {
        console.log('Join room');
        if (room !== "") {
            socket.emit("join_room", {
                room: room,
                name: name,
                email: userEmail
            });
        }
    };

    useEffect(()=>{
        socket.emit('join_room',{
            room : index,
            name : name,
            email : userEmail
        })
        setMessageReceived([]);
    },[index])

    const sendMessage = () => {
        socket.emit("send_message", { message, room : index, userEmail, name });
        const temp = [{
            name: name,
            room : index,
            message: message,
            sentByMe: true
        }]
        setMessageReceived([...messageReceived, ...temp]);
        // console.log(messageReceived);
    };

    socket.on('join_conf', (data) => {
        // console.log(data);
        // console.log('joined ',index);
        const temp = data.map(d =>
            JSON.parse(JSON.stringify({
                name: d.name,
                message: d.message,
                sentByMe: false
            }))
        )
        // console.log(temp);
        setMessageReceived([...messageReceived, ...temp]);
        // console.log(data);
    })

    socket.on("receive_message", (data) => {
        // const message = messageReceived;
        // message.push(data.message);
        // console.log(data);
        const temp = [{
            name: data.name,
            message: data.message,
            sentByMe: false
        }]
        setMessageReceived([...messageReceived, ...temp]);
        // console.log(message);
    });

    return (
        <>
            <Categories changeSelected={changeSelected}/>   
            <div className="messageBox">
                <div className='flex-container'>
                    {/* <div className='input-container'>
                        <input
                            className='custom-input'
                            placeholder="Room Number..."
                            onChange={(event) => {
                                setRoom(event.target.value);
                            }}
                        />
                        <button
                            className='custom-button'
                            onClick={joinRoom}
                        >
                            Join Room
                        </button>
                    </div> */}
                    <div className='input-container text-white'>
                        <h1>{text}</h1>
                    </div>
                    <div className='input-container'>
                        <input
                            className='custom-input'
                            placeholder="Your name"
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                        <button
                            className='custom-button'
                        >
                            Enter name
                        </button>
                    </div>
                    <div className='input-container'>
                        <input
                            className='custom-input'
                            placeholder="Message..."
                            onChange={(event) => {
                                setMessage(event.target.value);
                            }}
                        />
                        <button
                            className='custom-button'
                            onClick={sendMessage}
                        >
                            Send Message
                        </button>
                    </div>
                    <div className='bg-slate-400 rounded-md shadow-md'>
                        <div className='flex justify-center items-center bg-slate-500 rounded-t-md p-4'>
                            <h1> Discussion forum </h1>
                        </div>
                        <div className='p-3 '>
                            <Messages messages={messageReceived} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
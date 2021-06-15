import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux'
import { w3cwebsocket as W3CWebSocket } from "websocket"
import $ from "jquery";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { BASE_API, getToken } from '../../config/api/Security';
import { Telegram, QuestionAnswer } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    chat: {
        "&:hover": {
            color: "#6c757d"
        },
        marginTop: 10,
    },
    send: {
        color: "#5fcbc4"
    }
});

const Chat = () => {
    const status = {
        connecting: "Connecting",
        condected: "Online",
        disconect: "Offline",
        bot: "Bot"
    }
    const [statusConnect, setStatusConnect] = useState(status.bot)

    const classes = useStyles();
    // New implementation
    const [activeBot, setActiveBot] = useState(true)
    const [activeAdmin, setActiveAdmin] = useState(false)
    const [clientMessage, setClientMessage] = useState("")
    const [lstMensajes, setLstMensajes] = useState([]);
    /*  const [oldMensajes, setOldMensajes] = useState([]); */

    const { register, handleSubmit, errors } = useForm();
    //const WS_SERVER = "ws://" + BASE_API.split('/')[2]
    const WS_SERVER = `${BASE_API.split('/')[0].charAt(4) === 's' ? 'wss' : 'ws'}://${BASE_API.split('/')[2]}`;

    const [client, setClient] = useState(null);
    const lastChild = useRef(null);

    const { login, user } = useSelector(state => ({
        login: state.auth.login,
        user: state.auth.user
    }))

    //info user
    const [infoUser, setInfoUser] = useState({
        first_name: "",
        last_name: "",
        email: ""
    })
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendServer(clientMessage)
            setClientMessage("")
        }
    }
    // const [isConnected, setIsConnected] = useState(false);


    const addMensaje = (direccion, msg) => {
        if (direccion === "client") {
            setLstMensajes(prevState => [...prevState, {
                direction: "client",
                message: msg
            }])
        } else {
            setLstMensajes(prevState => [...prevState, {
                direction: "server",
                message: msg
            }])
        }

    }
    const sendServer = async (msg) => {
        if (activeBot) {
            try {
                const { status, data } = await axios.post('chatbot/answer', { question: msg }, {
                    validateStatus: (status) => {
                        return status >= 200 && status < 500;
                    }
                })
                if (status === 200) {
                    if (data.code === "IDontKnowError") {
                        addMensaje('client', msg)
                        setLstMensajes(prevState => [
                            ...prevState, {
                                direction: "server",
                                message: data.message,
                                active_button: true
                            }])
                    } else if ("ANSWER") {
                        addMensaje('client', msg)
                        addMensaje('server', data.message)
                    }
                }
            } catch (error) {
                console.error(error);
            }
        } else if (activeAdmin) {
            addMensaje('client', msg)
            const messageToSend = {
                type: "MESSAGE",
                message: msg,
            };
            console.log("Mensaje a enviar", messageToSend);
            client.send(JSON.stringify(messageToSend));
            //Abrir el sokect
        }
    }

    //Cargar greeting
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/chatbot/greatings', {
                    validateStatus: (status) => {
                        return status >= 200 && status < 500;
                    }
                })
                if (res.status >= 200) {
                    setLstMensajes([{
                        direction: "server",
                        message: res.data.message
                    }])
                    setActiveAdmin(false)
                }
            } catch (error) {
            }
        })()
    }, [login])

    useEffect(() => {
        if (activeAdmin) {
            chatAdmin();
        }
    }, [activeAdmin])

    if (client) {
        client.onopen = () => {
            const authMessage = {
                type: "OAUTH",
            };
            if (login.isAuthenticated) {
                authMessage.token = getToken();
            } else {
                authMessage.firstName = infoUser.first_name;
                authMessage.lastName = infoUser.last_name;
                authMessage.email = infoUser.email;
            }
            client.send(JSON.stringify(authMessage));
            setStatusConnect(status.condected)
        };

        client.onmessage = (message) => {
            const msgReceived = JSON.parse(message.data);
            console.log("Mensaje type sasdasdasd asda sda sd asdas", msgReceived.type);
            if (msgReceived.type === "MESSAGE") {
                //Pintar el mensajes server
                addMensaje("server", msgReceived.message)
            } else if (msgReceived.type === "GET_ALL_MESSAGES") {
                let oldM = msgReceived.command.map(item =>
                ({
                    direction: item.received ? "server" : "client",
                    message: item.message,
                }));
                setLstMensajes(prevState => [...oldM, ...prevState]);
            }
        };

        client.onclose = () => {
            setStatusConnect(status.disconect)
        };

        client.onerror = function () {
            console.log('Connection Error');
        };

    }

    const chatAdmin = () => {
        setClient(new W3CWebSocket(WS_SERVER));
        setStatusConnect(status.connecting)
    }

    const show = () => {
        /*  $('.prime').toggleClass('zmdi-comment-outline');
         $('.prime').toggleClass('zmdi-close');
         $('.prime').toggleClass('is-active');
         $('.prime').toggleClass('is-visible'); */
        $('#prime').toggleClass('is-float');
        $('.chat').toggleClass('is-visible');
        $('.fab').toggleClass('is-visible');
        /*  $('.chat').toggleClass('acojone');
         $('.fab').toggleClass('acojone'); */
    }

    //Mantener el chat en el ultimo mensaje
    /* const divRef = useRef(null)
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [divRef]) */
    const onSubmit = (data) => {
        setInfoUser({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
        })
    }

    /* console.log(lstMensajes); */

    const onAdmin = (index) => {
        setActiveAdmin(true)
        setActiveBot(false)
        setLstMensajes(prevState => {
            /*    console.log('prevstate', prevState[index]) */
            prevState[index] = {
                direction: prevState[index].direction,
                message: prevState[index].message
            }
            /*  console.log('nextState', prevState[index]) */
            return prevState;
        })
    }

    console.info(' a;sldjflasjdf', lastChild.current?.children[lastChild.current?.children.length - 1]);
    lastChild.current?.children[lastChild.current?.children.length - 1]?.scrollIntoView({ behavior: "smooth" })

    return (
        <div className="fabs">
            <div className="chat">
                <div className="chat_header">
                    <div className="chat_option">
                        <div className="header_img">
                            <img
                                src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"
                            />
                        </div>
                        <span id="chat_head">{user.firstName || "anonymous"}</span>
                        <br />
                        <span className="agent">Agent</span>
                        <span className="online">({statusConnect})</span>
                    </div>
                </div>
                <div id="chat_form" className="chat_converse chat_form">
                    {/* <span className="chat_msg_item chat_msg_item_admin">
                        <div className="chat_avatar">
                            <img
                                src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"
                            />
                        </div>
                          Hey there! Any question?
                     </span> */}
                    {/*     <span className="chat_msg_item chat_msg_item_user"> Hello!</span> */}

                    {!login.isAuthenticated && infoUser.first_name === "" ? (
                        <div>
                            <span className="chat_msg_item chat_msg_item_admin">
                                <div className="chat_avatar">
                                    <img
                                        src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"
                                    />
                                </div>
                                Please enter your personal information.
                                <div>
                                    <form className="message_form" onSubmit={handleSubmit(onSubmit)}>
                                        <input
                                            type="text"
                                            className={`text_input ${errors.first_name ? "error_border" : ""}`}
                                            name="first_name"
                                            ref={register({ required: true })}
                                            placeholder="First Name"
                                        />
                                        <span className="error-message">
                                            {errors.first_name && "First name is required"}
                                        </span>

                                        <input
                                            type="text"
                                            className={`text_input ${errors.last_name ? "error_border" : ""}`}
                                            name="last_name"
                                            ref={register({ required: true })}
                                            placeholder="Last Name"
                                        />
                                        <span className="error-message">
                                            {errors.last_name && "Last name is required"}
                                        </span>
                                        <input
                                            type='text'
                                            name="email"
                                            className={`text_input ${errors.email ? "error_border" : ""}`}
                                            ref={register({
                                                required: true,
                                                pattern: /^\S+@\S+$/i,
                                            })}
                                            placeholder="Your email"
                                        />
                                        <span className="error-message">
                                            {errors.email && "Please enter proper email address"}
                                        </span>
                                        <button type='submit'>Send</button>
                                    </form>
                                </div>
                            </span>

                            {lstMensajes.length > 0 && lstMensajes.map((message, index) => (
                                <div key={index}>
                                    {message.direction === "server" ? (
                                        <span className="chat_msg_item chat_msg_item_admin">
                                            <div className="chat_avatar">
                                                <img
                                                    src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"
                                                />
                                            </div>
                                            {message.message}
                                        </span>
                                    )
                                        : (
                                            <span className="chat_msg_item chat_msg_item_user" >{message.message}</span>
                                        )
                                    }
                                </div>
                            ))}
                        </div>
                    ) :
                        (<div ref={lastChild}>
                            {lstMensajes && lstMensajes.map((message, index) => (<div key={index}>
                                {message.direction === "server" ? (
                                    <span className="chat_msg_item chat_msg_item_admin">
                                        <div className="chat_avatar">
                                            <img
                                                src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg"
                                            />
                                        </div>
                                        {message.message}
                                        <br />
                                        {message.active_button && <button onClick={() => onAdmin(index)}> Contact admin</button>}
                                    </span>
                                )
                                    : (
                                        <span className="chat_msg_item chat_msg_item_user" >{message.message}</span>
                                    )
                                }
                            </div>
                            ))}
                        </div>)
                    }

                </div>
                <div className="fab_field">
                    <a id="fab_send" className="fab" onClick={() => clientMessage !== "" && (sendServer(clientMessage.trim()), setClientMessage(""))}>
                        <Telegram fontSize="large" />
                    </a>
                    <textarea
                        id="chatSend"
                        value={clientMessage}
                        name="chat_message"
                        placeholder="Send a message"
                        className="chat_field chat_message"
                        rows={3}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setClientMessage(e.target.value)}
                    ></textarea>
                </div>
            </div>
            <a id="prime" className="fab" onClick={() => show()}>
                <QuestionAnswer className={classes.chat} fontSize="large" />
            </a>
        </div >
    )
};
export default Chat;
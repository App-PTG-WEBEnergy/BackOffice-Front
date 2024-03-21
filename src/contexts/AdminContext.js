/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from 'react'
import { get, post } from 'services/callAPI';
import c from 'constant';
import { HubConnectionBuilder, HttpTransportType, LogLevel } from '@aspnet/signalr';
import { useRefState } from 'hooks/useRefState';


//create admin Context
export const AdminContext = createContext();

/**
 * Provid Book Data
 */
// const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const updateScroll = () => {
    var element = document.getElementById("messages");
    if (element !== null && element !== undefined) {
        element.scrollTop = element.scrollHeight;
    }
}

const AdminContextProvider = ({ children }) => {
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    const [viewChat, setViewChat] = useState(false);
    const initCollapse = getWindowDimensions().width <= 1000;
    const [collapse, setCollapse] = useState(initCollapse);
    const [activeChat, setActive] = useState(false);
    const [viewItem, setViewItem] = useState({});
    const [users, userRef, setUsers] = useRefState([]);
    const [hubConnection, setHubConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [identity_id, setIdentity_id] = useState("3");
    const [message, setMessage] = useState('');
    const view = (item) => {
        item.read = true;
        setViewItem(item);
        console.log(item);
        localStorage.setItem('view', JSON.stringify(item));
        post('messages/getMessage', { identity_id: item.identitY_ID }).then((result) => {
            setMessages(result);
            setTimeout(updateScroll, 200);
        })

        toggleView();
    }
    const toggle = () => {
        setCollapse(!collapse);
    }
    const toggleView = () => {
        setViewChat(!viewChat);
    }
    const toggleChat = () => {
        setActive(!activeChat);
    }
    const fetchData= () => {
        get(c.IdentityUrl).then((result) => {
            setUsers(result.map(item => {
                item.read = true;
                return item;
            }))
        })
    }
    useEffect(() => {
        console.log("HTTP", HttpTransportType)
        console.log("Log", LogLevel)
        localStorage.removeItem('view');
        const createHubConnection = async () => {
            console.log(c);

            // Build new Hub Connection, url is currently hard coded.
            let hubConnect = new HubConnectionBuilder()
                .configureLogging(LogLevel.Debug)
                .withUrl(c.HubUrl, {
                    skipNegotiation: true,
                    transport: HttpTransportType.WebSockets
                })
                .build();
            hubConnect.serverTimeoutInMilliseconds = 100000;

            try {

                hubConnect.start().then(() => {
                    hubConnect.invoke("IdentifyAdmin", 1).catch(function (err) {
                        return console.error(err.toString());
                    });
                    hubConnect.on("IdentityAdmin", function (status, identity_id) {
                        console.log(status, identity_id);
                    });
                    hubConnect.on('onReceivedMessage', function (status, role, identity, message) {
                        identity = JSON.parse(identity)
                        var storage = localStorage.getItem('view');
                        console.log(identity);
                        if (identity.IDENTITY_ID !== identity_id) {
                            if (storage !== null && !viewChat) {
                                storage = JSON.parse(storage);
                                if (identity.IDENTITY_ID === storage.identitY_ID) {
                                    setMessages(messages => {
                                        console.log(messages);

                                        return [...messages, {
                                            "sender_id": identity.IDENTITY_ID,
                                            "receiver_id": identity_id,
                                            "msg_text": message,
                                            "msg_type": "U"
                                        }];

                                    })
                                    setTimeout(updateScroll, 200)
                                } else {
                                    let index = -1;
                                    // console.log()
                                    let u = [...userRef.current]

                                    u.forEach((item, i) => {
                                        if (item.identitY_ID === identity.IDENTITY_ID) {
                                            index = i;
                                        }
                                    })
                                    let { EMAIL, IDENTITY_ID, INFO, MOBILE_NO, NAME, STATUS } = identity
                                    if (index === -1) {
                                        console.log([{ name: NAME, email: EMAIL, identitY_ID: IDENTITY_ID, info: INFO, mobilE_NO: MOBILE_NO, status: STATUS, read: false }, ...u])
                                        setUsers(users => [{ name: NAME, email: EMAIL, identitY_ID: IDENTITY_ID, info: INFO, mobile_no: MOBILE_NO, status: STATUS, read: false }, ...u])
                                    } else {

                                        let user = u.splice(index, 1);
                                        console.log(user)
                                        u = [{ ...user[0], read: false }, ...u];
                                        console.log(u);
                                        setUsers(u);
                                    }
                                }
                            } else {
                                let index = -1;
                                let u = [...userRef.current]

                                u.forEach((item, i) => {
                                    if (item.identitY_ID === identity.IDENTITY_ID) {
                                        index = i;
                                    }
                                })
                                let { EMAIL, IDENTITY_ID, INFO, MOBILE_NO, NAME, STATUS } = identity
                                if (index === -1) {
                                    console.log([{ name: NAME, email: EMAIL, identitY_ID: IDENTITY_ID, info: INFO, mobile_no: MOBILE_NO, status: STATUS, read: false }, ...u])
                                    setUsers(users => [{ name: NAME, email: EMAIL, identitY_ID: IDENTITY_ID, info: INFO, mobile_no: MOBILE_NO, status: STATUS, read: false }, ...u])
                                } else {

                                    let user = u.splice(index, 1);
                                    console.log(user)
                                    u = [{ ...user[0], read: false }, ...u];
                                    console.log(u);
                                    setUsers(u);
                                }
                            }
                        }


                    })
                })

                console.log('Connection successful!')
            }
            catch (err) {
              
            }
            setHubConnection(hubConnect);

        }

        createHubConnection();
        fetchData();
        setInterval(fetchData,60000);
        
    }, [])
    
    return (
        <AdminContext.Provider value={{ collapse, toggle, getWindowDimensions, activeChat, toggleChat, viewChat, toggleView, viewItem, view, users, hubConnection, identity_id, setIdentity_id, messages, setMessages, message, setMessage, updateScroll }}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;

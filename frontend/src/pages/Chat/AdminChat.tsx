  
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import AdminChatC from '../../components/AdminChatC';
import ReturnFooter from '../../components/ReturnFooter';
import { Flex } from "@chakra-ui/react";
import { useUser } from '../../context/UserContext';





interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: string;
    telephone: string;
    oldPassword: string;
    promotion: number;
    year: string;
    company: {
        name: string;
        address: string;
        city: string;
        zipCode: string;
    };
  };
  



const AdminChat: React.FC = () => {
    // const user = useUser();
    const [linkPage, setLinkPage] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'Student1', text: 'I have some questions about internship’s contract.' },
        { sender: 'Admin', text: 'What’s your questions ?' },
        { sender: 'Student1', text: 'Blablabla...' },
        { sender: 'Admin', text: 'Blablabla...' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const handleSendMessage = () => {
        setMessages([...messages, { sender: 'You', text: newMessage }]);
        setNewMessage('');
    };
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log("TEST user.promotion: ", `${user?.promotion}`);
            console.log("User ID from localStorage:", JSON.parse(storedUser)?.id);
        };
    }, []);


    return (

    <Flex
        direction="column"
        minHeight="100vh" 
    >
        <Header userFirstName={user?.firstName} userLastName={user?.lastName} userEmail={user?.email} message="" />

        <Flex
        direction="column"
        flex="1"
        overflowY="auto" 
        paddingBottom="250px"
        >
        <AdminChatC />
        </Flex>

        <ReturnFooter linkPage="/admin/home"/>
    </Flex>
    );
};

export default AdminChat;
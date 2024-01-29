  
import React, {useState} from 'react';
import Header from '../../components/Header';
import AdminChatC from '../../components/AdminChatC';
import ReturnFooter from '../../components/ReturnFooter';
import { Flex } from "@chakra-ui/react";
import { useUser } from '../../context/UserContext';

const AdminChat: React.FC = () => {
    const user = useUser();
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

    return (

    <Flex
        direction="column"
        minHeight="100vh" 
    >
        <Header userFirstName={user?.user?.firstName} userLastName={user?.user?.lastName} userEmail={user?.user?.email} message="" />

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
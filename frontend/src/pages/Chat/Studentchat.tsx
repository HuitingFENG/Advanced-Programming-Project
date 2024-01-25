  
import React, { useState }  from 'react';
import Header from '../../components/Header';
import { Flex } from "@chakra-ui/react";
import ReturnFooter from '../../components/ReturnFooter';
import StudentChatC from '../../components/StudentChatC';

const StudentChat: React.FC = () => {
    const [linkPage, setLinkPage] = useState('');

    return (
    <Flex
        direction="column"
        minHeight="100vh" 
    >
        <Header userName="student" userEmail="student@efrei.net" message=""/>

        <Flex
        direction="column"
        flex="1"
        overflowY="auto" 
        paddingBottom="250px"
        >
        <StudentChatC />
        </Flex>

        <ReturnFooter linkPage="/student/home" />
    </Flex>
    );
};

export default StudentChat;
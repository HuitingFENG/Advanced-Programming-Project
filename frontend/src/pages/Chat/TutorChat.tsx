  
import React, { useState, useEffect, useContext, ReactNode } from 'react';
import Header from '../../components/Header';
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import TutorChatC from '../../components/TutorChatC';
import ReturnFooter from '../../components/ReturnFooter';



const TutorChat: React.FC = () => {
    const [linkPage, setLinkPage] = useState('');
    return (
    <Flex
        direction="column"
        minHeight="100vh" 
    >
        <Header userName="tutor" userEmail="tutor@efrei.com" message=""/>

        <Flex
        direction="column"
        flex="1"
        overflowY="auto" 
        paddingBottom="250px"
        >
        <TutorChatC />
        </Flex>

        <ReturnFooter linkPage="/tutor/home" />
    </Flex>
    );
};

export default TutorChat; 
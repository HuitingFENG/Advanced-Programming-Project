  
import React, { useState, useEffect, useContext, ReactNode }  from 'react';
import Header from '../../components/Header';
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import Footer from '../../components/Footer';
import ReturnFooter from '../../components/ReturnFooter';
import AdminViewEditC from '../../components/AdminViewEditC';

const AdminViewEdit: React.FC = () => {
    const [linkPage, setLinkPage] = useState('');


    return (

    <Flex
        direction="column"
        minHeight="100vh" 
    >
        <Header userName="admin" userEmail="admin@efrei.fr" message="! The intermediate evaluation form should be filled before 12/31/2023 00:00:00." />

        <Flex
        direction="column"
        flex="1"
        overflowY="auto" 
        paddingBottom="250px"
        >
        <Text>AdminViewEdit</Text>
        <AdminViewEditC />
        
        </Flex>

        <ReturnFooter linkPage="/admin/home" />
    </Flex>
    );
};

export default AdminViewEdit; 
  
import React, { useState } from 'react';
import Header from '../../components/Header';
import { Flex } from "@chakra-ui/react";
import ReturnFooter from '../../components/ReturnFooter';
import AdminEditDeadlinesC from '../../components/AdminEditDeadlinesC';

const AdminEditDeadlines: React.FC = () => {
    const [linkPage, setLinkPage] = useState('');

    return (
    <Flex
        direction="column"
        minHeight="100vh" 
    >
        <Header userName="admin" userEmail="admin@efrei.fr" message="!!! The intermediate evaluation form should be filled before 12/31/2023 00:00:00."/>

        <Flex
        direction="column"
        flex="1"
        overflowY="auto" 
        paddingBottom="250px"
        >
        <AdminEditDeadlinesC />
        </Flex>

        <ReturnFooter linkPage="/admin/home" />
    </Flex>
    );
};

export default AdminEditDeadlines;
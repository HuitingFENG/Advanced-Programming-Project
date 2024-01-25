  
import React, {useState} from 'react';
import Header from '../../components/Header';
import {Link as RouterLink, BrowserRouter as Router } from "react-router-dom";
import { Flex,Link,Text,Button } from "@chakra-ui/react";
import Footer from '../../components/Footer';

const AdminHome: React.FC = () => {
    const [chatLinkPage, setChatLinkPage] = useState('');

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
        gap={10}
        justify="center"
        align="center"
        >
            <Flex>
                <Text color="#0C2340" fontSize="6xl" fontWeight="bold" >ADMIN SPACE</Text>
            </Flex>
            <Flex gap={10}>
                <Link as={RouterLink} to="/reset"><Button p={8} bgColor="#0C2340" color="white" ><Text fontSize="3xl" fontWeight="bold">RESET PASSWORD</Text></Button></Link>
                <Link as={RouterLink} to="/admin/manageinternships"><Button p={8}  bgColor="#0C2340" color="white" ><Text fontSize="3xl" fontWeight="bold">MANAGE INTERNSHIPS</Text></Button></Link>
                <Link as={RouterLink} to="/admin/managenotifications"><Button p={8} bgColor="#0C2340" color="white" ><Text fontSize="3xl" fontWeight="bold">MANAGE NOTIFICATIONS</Text></Button></Link>
            </Flex>
            <Flex gap={10}>
                <Link as={RouterLink} to="/admin/managedeadlines"><Button p={8} bgColor="#0C2340" color="white" ><Text fontSize="3xl" fontWeight="bold">MANAGE DEADLINES</Text></Button></Link>
                <Link as={RouterLink} to="/admin/viewallstatus"><Button p={8} bgColor="#0C2340" color="white" ><Text fontSize="3xl" fontWeight="bold">VIEW ALL STATUS</Text></Button></Link>
                <Link as={RouterLink} to="/admin/viewallfiles"><Button p={8} bgColor="#0C2340" color="white" ><Text fontSize="3xl" fontWeight="bold">VIEW ALL FILES</Text></Button></Link>
            </Flex>
        </Flex>
        <Footer chatLinkPage="/chat/adminChat" />
    </Flex>
    );
};

export default AdminHome;
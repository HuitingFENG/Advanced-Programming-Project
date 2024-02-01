import React, {useEffect, useState}  from 'react';
import Header from '../../components/Header';
import { Flex,Link,Text,Button } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, } from "react-router-dom";
import Footer from '../../components/Footer';
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



const TutorHome: React.FC = () => {
  const [chatLinkPage, setChatLinkPage] = useState('');
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
      <Header userFirstName={user?.firstName} userLastName={user?.lastName} userEmail={user?.email} message="" /* message="!!! The intermediate evaluation form should be filled before 12/31/2023 00:00:00." */ />

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
              <Text color="#0C2340" fontSize="6xl" fontWeight="bold" >TUTOR SPACE</Text>
          </Flex>

          <Flex gap={10} justify="space-even" flexDir="row" >
              <Link as={RouterLink} to="/reset"><Button p={8} bgColor="#0C2340" color="white" ><Text fontSize="3xl" fontWeight="bold">RESET PASSWORD</Text></Button></Link>
              {/* <Link as={RouterLink} to="/tutor/viewallfiles"><Button p={8} bgColor="#0C2340" color="white" ><Text fontSize="3xl" fontWeight="bold">VIEW ALL FILES</Text></Button></Link> */}
          </Flex>

          <Flex>
              <Link as={RouterLink} to="/tutor/manageinternships"><Button p={8}  bgColor="#0C2340" color="white" ><Text fontSize="3xl" fontWeight="bold">MANAGE INTERNSHIPS (STUDENTS, MEETINGS, FORMS)</Text></Button></Link>
          </Flex>
          
          <Flex gap={10}>
              <Link as={RouterLink} to="/tutor/manageallfiles"><Button p={8} bgColor="#0C2340" color="white" ><Text fontSize="3xl" fontWeight="bold">MANAGE ALL FILES (VALIDATE / INVALIDATE)</Text></Button></Link>
          </Flex>
      </Flex>

      <Footer chatLinkPage="/chat/tutorChat" />
    </Flex>
  );
};

export default TutorHome;

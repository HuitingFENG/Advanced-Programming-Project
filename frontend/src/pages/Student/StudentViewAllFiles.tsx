import React, { useState, useEffect, useContext }  from 'react';
import Header from '../../components/Header';
import { Flex } from "@chakra-ui/react";
import ReturnFooter from '../../components/ReturnFooter';
import StudentViewAllFilesC from '../../components/StudentViewAllFilesC';
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



const StudentViewAllFiles: React.FC = () => {
  // const user = useUser();
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
      <Header userFirstName={user?.firstName} userLastName={user?.lastName} userEmail={user?.email}  message="" /* message="!!! Deadline of CDC 12/10/2023 00:00 - Deadline of Final Report 12/31/2023 00:00" */ />
      
      <Flex
        direction="column"
        flex="1"
        overflowY="auto" 
        paddingBottom="250px"
        >
        <StudentViewAllFilesC /> 
      </Flex>

      <ReturnFooter linkPage="/student/home"/>
    </Flex>
  );
};


export default StudentViewAllFiles;

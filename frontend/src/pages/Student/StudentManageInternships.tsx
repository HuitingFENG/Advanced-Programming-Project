import React, { useState, useEffect, useContext }  from 'react';
import Header from '../../components/Header';
import { Flex,Text } from "@chakra-ui/react";
import ReturnFooter from '../../components/ReturnFooter';


const StudentManageInternships: React.FC = () => {
    const [linkPage, setLinkPage] = useState('');

    return (

      <Flex
        direction="column"
        minHeight="100vh"
      >
        <Header userName="student" userEmail="student@efrei.net" message="!!! The second self-evaluation form should be filled before 12/31/2023 00:00:00." />

        <Flex
          direction="column"
          flex="1"
          overflowY="auto" 
          paddingBottom="250px"
        >
          <Text>StudentManageInternships</Text>
        </Flex>

        <ReturnFooter linkPage="/student/home"  />
      </Flex>
    );
  };
  
  export default StudentManageInternships;
  
import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import { Flex } from "@chakra-ui/react";
import ReturnFooter from '../../components/ReturnFooter';
import StudentAddNewInternshipC from '../../components/StudentAddNewInternshipC';

const StudentAddNewInternship: React.FC = () => {
  
  return (
    <Flex direction="column" minHeight="100vh">
      <Header userName="student" userEmail="student@efrei.net" message="!!! The second self-evaluation form should be filled before 12/31/2023 00:00:00." />

      <Flex
        direction="column"
        flex="1"
        overflowY="auto" 
        paddingBottom="250px"
        >
        <StudentAddNewInternshipC /> 
      </Flex>

      <ReturnFooter linkPage="/student/home"/>
    </Flex>
  );
};

  
export default StudentAddNewInternship;
   
import React, { useState } from 'react';
import { Flex } from "@chakra-ui/react";
import Header from '../../components/Header';
import ReturnFooter from '../../components/ReturnFooter';
import StudentManageMeetingC from '../../components/StudentManageMeetingC';



const StudentManageMeeting: React.FC = () => {
  
  return (
    <Flex
      direction="column"
      minHeight="100vh"
    >
      <Header userName="student" userEmail="student@efrei.net" message="!!! Deadline of CDC 12/10/2023 00:00 - Deadline of Final Report 12/31/2023 00:00" />
      
      <Flex
        direction="column"
        flex="1"
        overflowY="auto" 
        paddingBottom="250px"
        >
        <StudentManageMeetingC /> 
      </Flex>

      <ReturnFooter linkPage="/student/home/"/>
    </Flex>
  );
};

export default StudentManageMeeting;

import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import { Flex } from "@chakra-ui/react";
import ReturnFooter from '../../components/ReturnFooter';
import StudentUploadFilesC from '../../components/StudentUploadFilesC';
//import { FileUpload } from '../../components/FileUpload';// ASSUMING WE HAVE THE COMPONENT, WHICH WE DO NOT HAVE!!!!

const StudentUploadFiles: React.FC = () => {

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
        <StudentUploadFilesC /> 
      </Flex> 


      <ReturnFooter linkPage="/student/home"/>
  </Flex>
  );
};

export default StudentUploadFiles;
  
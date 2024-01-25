import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import { Flex } from "@chakra-ui/react";
import ReturnFooter from '../../components/ReturnFooter';
import TutorManageAllReportsC from '../../components/TutorManageAllReportsC';


const TutorManageAllReports: React.FC = () => {
  const [linkPage, setLinkPage] = useState('');
  
  return (
    <Flex
      direction="column"
      minHeight="100vh"
    >
      <Header userName="tutor" userEmail="tutor@efrei.com" message="!!! The intermediate evaluation form should be filled before 12/31/2023 00:00:00." />

      <Flex
        direction="column"
        flex="1"
        overflowY="auto" 
        paddingBottom="250px"
      >
        <TutorManageAllReportsC />
      </Flex>

      <ReturnFooter linkPage="/tutor/home" />
    </Flex>
  );
};

export default TutorManageAllReports;

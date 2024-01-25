import React from 'react';
import { Flex, Text } from "@chakra-ui/react";
import ProfilHeader from '../../components/ProfilHeader';
import ProfilFooter from '../../components/ProfilFooter';
import RegisterC from '../../components/RegisterC';


const Register: React.FC = () => {
    return (

      <Flex
        direction="column"
        minHeight="100vh" 
        >
        <ProfilHeader />
        <Flex
          direction="column"
          flex="1"
          overflowY="auto" 
          paddingBottom="250px"
        >
          <Flex gap={20} flexDirection="column" justify="space-between" align="center" mt={20}>
            <Text fontWeight="bold" fontSize="4xl">Register</Text>
            <RegisterC />
         </Flex>
        </Flex>
        <ProfilFooter />
      </Flex>
    );
  };
  
  export default Register; 
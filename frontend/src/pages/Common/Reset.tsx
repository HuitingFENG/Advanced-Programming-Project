import React from 'react';
import { Flex, Text } from "@chakra-ui/react";
import ProfilHeader from '../../components/ProfilHeader';
import ResetC from '../../components/ResetC';


const Reset: React.FC = () => {
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
            <Text fontWeight="bold" fontSize="4xl">Reset</Text>
            <ResetC />
         </Flex>
        </Flex>
      </Flex>
    );
  };
  
  export default Reset; 
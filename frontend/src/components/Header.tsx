import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser, FaChartBar, FaRegLightbulb, FaUserPlus, FaSignInAlt, FaFileUpload, FaHandshake, FaClipboardList, FaCheckCircle } from "react-icons/fa";

interface HeaderProps {
  userName: string;
  userEmail: string;
  message: string;
}


const Header: React.FC<HeaderProps> = ({userName, userEmail, message}) => {

  return (
    <Flex justify="space-between"  flexDir="column" width="100%" height="300px">
        
        <Flex flexDir="row"  bg="#0C2340" align="center"  justify="space-between" height="200px" p={4} >
          <Flex align="center" justify="space-between" gap={10} p={1}>
              <Link as={RouterLink} to="/">
                  <Image src="../../../assets/efrei.png" alt="icon" width="400px" />
              </Link>
          </Flex>
          <Flex align="center" gap={10} mr={4}>
              <Link as={RouterLink} to="/">
                <Flex align="center">
                  <Icon as={FaFileUpload} boxSize={6} mr={2} color="white" />
                  <Text fontWeight="bold" fontSize="xl" color="white">Upload files</Text>
                </Flex>
              </Link>
              <Link as={RouterLink} to="/">
                <Flex align="center">
                  <Icon as={FaHandshake} boxSize={6} mr={2} color="white" />
                  <Text fontWeight="bold" fontSize="xl" color="white">Meeting</Text>
                </Flex>
              </Link>
              <Link as={RouterLink} to="/">
                <Flex align="center">
                  <Icon as={FaClipboardList} boxSize={6} mr={2} color="white" />
                  <Text fontWeight="bold" fontSize="xl" color="white">Evaluation Form</Text>
                </Flex>
              </Link>
              <Link as={RouterLink} to="/">
                <Flex align="center">
                  <Icon as={FaCheckCircle} boxSize={6} mr={2} color="white" />
                  <Text fontWeight="bold" fontSize="xl" color="white">Report Validation</Text>
                </Flex>
              </Link>
          </Flex>
        </Flex>

        <Flex flexDir="column" justify="flex-start"  mt={-300} p={3} gap={2}>
          <Flex flexDir="row" align="center" justify="flex-start" gap={20} >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="grey" 
              color="white" 
              borderRadius="full" 
              width="100px" 
              height="50px" 
              padding="30px"
            >
              <Text fontSize="xl" fontWeight="bold">{userName}</Text>
            </Box>
            <Text fontSize="xl" fontWeight="bold" mb={-15} color="green" p={2} >{message}</Text>
          </Flex>
          
          <Flex justify="flex-start" gap={20} alignItems="center" >
            <Text fontSize="xl" fontWeight="bold">{userEmail}</Text>
            <Flex flexDir="column" alignItems="center"  justify="center" bgColor="pink">
            </Flex>
          </Flex>
        </Flex> 
    </Flex>
  );
};

export default Header;
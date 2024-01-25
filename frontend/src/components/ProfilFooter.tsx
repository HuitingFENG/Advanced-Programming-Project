import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser, FaMobileAlt, FaPhone, FaComment, FaEnvelope, FaRegCommentDots, FaUserPlus, FaRedo } from "react-icons/fa";
import { AiOutlineCopyright, AiOutlineMail } from "react-icons/ai";
import { FiLink } from "react-icons/fi";
import { GiEarthAmerica } from "react-icons/gi";

const ProfilFooter = () => {

  return (
    <Flex p={10} flexDir="row" align="center" justify="flex-end" bg="#dddddd" as="footer" /* position="fixed" bottom="0" width="100%" left="0" */ height="200px" >
      <Link as={RouterLink} to="/reset">
        <Button bgColor="#0C2340" gap={3}  p={8} width="200px" >{/* <FaUserPlus color="white" /> */}<Text fontWeight="bold"  fontSize="3xl" color="white">Reset</Text><FaRedo color="white" /></Button>
      </Link> 
    </Flex>

  );
};

export default ProfilFooter;
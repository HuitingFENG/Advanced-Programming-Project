import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser, FaMobileAlt, FaPhone, FaComment, FaEnvelope, FaRegCommentDots } from "react-icons/fa";
import { AiOutlineCopyright, AiOutlineMail } from "react-icons/ai";
import { FiLink } from "react-icons/fi";
import { GiEarthAmerica } from "react-icons/gi";

interface ReturnFooterProps {
    linkPage: string;
}


const ReturnFooter : React.FC<ReturnFooterProps> = ({ linkPage })=> {

  return (
    <Flex p={10} align="center" justify="flex-end" bg="#dddddd" as="footer" position="fixed" bottom="0" width="100%" left="0" height="200px" >
        <Flex align="center" justify="flex-end" gap={10} p={1}>
            <Button bgColor="#0C2340" p={7} ><Icon as={FaRegCommentDots} boxSize={8} mr={4} color="white" /><Text fontWeight="bold"  fontSize="2xl" color="white">Return</Text></Button>
        </Flex>
    </Flex>

  );
};

export default ReturnFooter;
import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser, FaMobileAlt, FaPhone, FaComment, FaEnvelope, FaRegCommentDots, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineCopyright, AiOutlineMail } from "react-icons/ai";
import { FiLink } from "react-icons/fi";
import { GiEarthAmerica } from "react-icons/gi";

interface ChatLinkPageProps {
    chatLinkPage: string;
}

const Footer : React.FC<ChatLinkPageProps> = ({ chatLinkPage }) => {

  return (
    <Flex p={10} align="center" justify="space-around" bg="#dddddd" as="footer" /* position="fixed" bottom="0" width="100%" left="0" */ height="200px" >
        <Flex align="center" justify="flex-start" gap={10} p={1}>
          <Link as={RouterLink} to="/" >
            <Button bgColor="darkred" p={7} ><Icon as={FaSignOutAlt} boxSize={8} mr={4} color="white" /><Text fontWeight="bold"  fontSize="2xl" color="white">Logout</Text></Button>
          </Link>
        </Flex>
        <Flex align="center" justify="flex-end" gap={10} p={1}>
            <Link as={RouterLink} to={chatLinkPage}>
              <Button bgColor="#0C2340" p={7} ><Icon as={FaRegCommentDots} boxSize={8} mr={4} color="white" /><Text fontWeight="bold"  fontSize="2xl" color="white">CHAT</Text></Button>
            </Link>
        </Flex>
    </Flex>
  );
};

export default Footer;
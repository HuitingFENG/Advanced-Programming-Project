import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser, FaChartBar, FaRegLightbulb, FaUserPlus, FaSignInAlt } from "react-icons/fa";

const Header = () => {

  return (
    <Flex p={4} align="center" justify="space-start" bg="#0C2340">
        <Flex align="center" justify="space-between" gap={10} p={1}>
            <Link as={RouterLink} to="/">
                <Image src="../../../assets/efrei.png" alt="icon" width="500px" height="200px" />
            </Link>
            <Text fontWeight="bold" fontSize="5xl" color="white">INTERNSHIP MANAGEMENT SYSTEM</Text>
        </Flex>

    </Flex>

  );
};

export default Header;
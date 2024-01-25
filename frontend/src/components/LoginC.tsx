import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  VStack,
  useToast,
  Flex,
  Center,
} from "@chakra-ui/react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useUser } from "../context/UserContext";

const LoginC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const userContext = useUser();

  if (!userContext) {
    return <div>Context not available</div>;
  }

  const { login } = userContext;

  const sendUser = () => {
    fetch("http://localhost:3001/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        console.log("TEST response: ", response);
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        toast({
          title: "Connexion réussie.",
          description: "Content de vous revoir !",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        login(data);
        navigate("/profil", { state: { user: data } });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          title: "Connexion échouée.",
          description: error.message,
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    sendUser();
  };

  return (
    <Center height="50vh">
      <VStack
        spacing={4}
        as="form"
        onSubmit={handleSubmit}
        width="50%"
        bgColor="#f8f8f8" // Light and soft background color
        border="2px" // Elegant thin border
        borderColor="#0C2340"
        borderRadius="lg" // Rounded corners for a polished look
        boxShadow="sm" // Subtle shadow for depth
        p={6} // Adjusted padding for spacing
      >
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          borderColor="#cccccc" // Softened border color
          _hover={{ borderColor: "#0C2340" }} // Change border color on hover
          _focus={{ borderColor: "#0C2340", boxShadow: "outline" }} // Focus effect
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          borderColor="#cccccc"
          _hover={{ borderColor: "#0C2340" }}
          _focus={{ borderColor: "#0C2340", boxShadow: "outline" }}
        />

        <Button
          colorScheme="blue"
          type="submit"
          leftIcon={<FaSignInAlt />}
          bgColor="#0C2340" // Changed button color
          color="white" // Text color for contrast
          _hover={{ bgColor: "#003153" }} // Hover effect
        >
          Login
        </Button>
        <Link to="/signup">
          <Button
            bgColor="#f2f2f2" // Lighter color for the secondary button
            color="#0C2340"
            _hover={{ bgColor: "#e2e2e2" }} // Hover effect
            leftIcon={<FaUserPlus />}
          >
            Register
          </Button>
        </Link>
      </VStack>
    </Center>
  );
};

export default LoginC;

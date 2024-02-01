import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box,Button,Input,VStack,useToast,Flex,Center,InputGroup,InputRightElement,IconButton } from "@chakra-ui/react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaEye, FaEyeSlash  } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import RegisterC from "./RegisterC";

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
    fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/user/login`, {
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
        switch (data.type) {
          case 'admin':
              navigate('/admin/home', { state: { user: data } });
              break;
          case 'tutor':
              navigate('/tutor/home', { state: { user: data } });
              break;
          case 'student':
              navigate('/student/home', { state: { user: data } });
              break;
          default:
              navigate('/'); 
        }
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
        bgColor="#f8f8f8" 
        border="2px" 
        borderColor="#0C2340"
        borderRadius="lg" 
        boxShadow="sm" 
        p={6} 
      >
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          borderColor="#cccccc" 
          _hover={{ borderColor: "#0C2340" }} 
          _focus={{ borderColor: "#0C2340", boxShadow: "outline" }} 
        />
{/* 
        <Input
          placeholder="Password"
          // type="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          borderColor="#cccccc"
          _hover={{ borderColor: "#0C2340" }}
          _focus={{ borderColor: "#0C2340", boxShadow: "outline" }}
        />
        <Button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"}
        </Button> */}
        <InputGroup>
          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            borderColor="#cccccc"
            _hover={{ borderColor: "#0C2340" }}
            _focus={{ borderColor: "#0C2340", boxShadow: "outline" }}
          />
          <InputRightElement>
            <IconButton
              aria-label={showPassword ? "Hide password" : "Show password"}
              icon={showPassword ? <FaEyeSlash /> : <FaEye />}
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>

        <Button
          colorScheme="blue"
          type="submit"
          leftIcon={<FaSignInAlt />}
          bgColor="#0C2340" 
          color="white" 
          _hover={{ bgColor: "#003153" }} 
        >
          Login
        </Button>
        <Link to="/register">
          <Button
            bgColor="#f2f2f2" 
            color="#0C2340"
            _hover={{ bgColor: "#e2e2e2" }} 
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

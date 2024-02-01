import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { Button, IconButton, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import { FaUserPlus, FaRedo, FaEyeSlash, FaEye } from "react-icons/fa";


interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: string;
    telephone: string;
    oldPassword: string;
    promotion: number;
    year: string;
    company: {
        name: string;
        address: string;
        city: string;
        zipCode: string;
    };
};


const ResetC = () => {
    const [user, setUser] = useState<User | null>(null);
    const toast = useToast();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
 

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log("User ID from localStorage:", JSON.parse(storedUser)?.id);
        };
    }, []);


    const resetPassword = () => {
        // return ;
        if (!currentPassword.trim() || !newPassword.trim()) {
            toast({
                title: 'Error',
                description: 'Please fill in all fields.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
           
        if (!user) {
            toast({
                title: 'User not found',
                description: 'Unable to reset password without user information.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
    
        fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/user/resetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.id,
                currentPassword,
                newPassword,
            }),
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    console.error("Server error response:", text); 
                    throw new Error('Password reset failed. Please try again.'); 
                });
            }
            return response.json();
        })
        .then(() => {
            toast({
                title: 'Password Reset Successful',
                description: 'Your password has been updated.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setCurrentPassword(''); 
            setNewPassword('');
        })
        .catch(error => {
            toast({
                title: 'Password Reset Failed',
                description: error.toString(),
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            console.log("TEST Password Reset Failed: ", error.toString());
        });
    };



    const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault(); 
        resetPassword();
    };

    return (

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
                readOnly
                placeholder="First Name"
                value={user?.firstName}
                borderColor="#cccccc" 
                _hover={{ borderColor: "#0C2340" }} 
                _focus={{ borderColor: "#0C2340", boxShadow: "outline" }} 
            />
            <Input 
                readOnly
                placeholder="Last Name"
                value={user?.lastName.toUpperCase()}
                borderColor="#cccccc" 
                _hover={{ borderColor: "#0C2340" }} 
                _focus={{ borderColor: "#0C2340", boxShadow: "outline" }} 
            />
            <Input 
                placeholder="Email"
                value={user?.email}
                borderColor="#cccccc"
                _hover={{ borderColor: "#0C2340" }}
                _focus={{ borderColor: "#0C2340", boxShadow: "outline" }}
            />


            <InputGroup>
                <Input
                    placeholder="Current Password"
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
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


            <InputGroup>
                <Input
                    placeholder="New Password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                leftIcon={<FaRedo />}
                bgColor="#0C2340" 
                color="white" 
                _hover={{ bgColor: "#003153" }} 
            >
                Reset
            </Button>
            <Link to="/login">
                <Button
                    bgColor="#f2f2f2" 
                    color="#0C2340" 
                    _hover={{ bgColor: "#e2e2e2" }} 
                    leftIcon={<FaUserPlus />}
                >
                    Login
                </Button>
            </Link>
        </VStack>



    );
};

export default ResetC;
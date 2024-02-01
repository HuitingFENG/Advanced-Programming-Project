import React, { useContext, useState } from 'react';
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { Button, Input, VStack, useToast, InputGroup,InputRightElement,IconButton } from '@chakra-ui/react';
import { FaUserPlus, FaEye, FaEyeSlash  } from "react-icons/fa";





const RegisterC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const [promotion, setPromotion] = useState('');






    const sendUser = () => {
        if (!lastName.trim() || !firstName.trim() || !email.trim() || !password.trim()) {
            toast({
                title: 'Erreur',
                description: 'Veuillez remplir tous les champs.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return; 
        }


        fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password, promotion }),
        })
        .then(response => {
            console.log("TEST response: ", response);
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) }); 
            }
            return response.json();
        })
        .then(data => {
            toast({
                title: 'Inscription réussie.',
                description: 'Bienvenue chez nous !',
                status: 'success',
                duration: 1000,
                isClosable: true,
            });
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setTimeout(() => {
                navigate('/login'); 
            }, 1000);
        })
        .catch((error) => {
            console.error('Error:', error);
            toast({
                title: 'Inscription échouée.',
                description: error.message,
                status: 'error',
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
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                borderColor="#cccccc" 
                _hover={{ borderColor: "#0C2340" }} 
                _focus={{ borderColor: "#0C2340", boxShadow: "outline" }} 
            />
            <Input 
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                borderColor="#cccccc" 
                _hover={{ borderColor: "#0C2340" }} 
                _focus={{ borderColor: "#0C2340", boxShadow: "outline" }} 
            />
            <Input 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                borderColor="#cccccc"
                _hover={{ borderColor: "#0C2340" }}
                _focus={{ borderColor: "#0C2340", boxShadow: "outline" }}
            />
            <Input 
                placeholder="Promotion (Optional for students)"
                value={promotion}
                onChange={(e) => setPromotion(e.target.value)}
                borderColor="#cccccc"
                _hover={{ borderColor: "#0C2340" }}
                _focus={{ borderColor: "#0C2340", boxShadow: "outline"}}
            />


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
                leftIcon={<FaUserPlus />}
                bgColor="#0C2340" 
                color="white" 
                _hover={{ bgColor: "#003153" }} 
            >
                Register
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

export default RegisterC;
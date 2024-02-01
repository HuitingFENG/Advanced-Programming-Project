import React, { useEffect, useState } from 'react';
import { Box, VStack, Divider, Input, Button, InputGroup, InputRightElement, Text, Stack, Flex } from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons';



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



const AdminChatC = () => {
  const [messages, setMessages] = useState([
    { sender: 'Student1', text: 'I have some questions about internship’s contract.' },
    { sender: 'Admin', text: 'What’s your questions ?' },
    { sender: 'Student1', text: 'Blablabla...' },
    { sender: 'Admin', text: 'Blablabla...' },
  ]);

  const [newMessage, setNewMessage] = useState(''); 
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
        console.log("TEST user.promotion: ", `${user?.promotion}`);
        console.log("User ID from localStorage:", JSON.parse(storedUser)?.id);
    };
  }, []);



  const handleSendMessage = () => {
    setMessages([...messages, { sender: 'You', text: newMessage }]);
    setNewMessage('');
  };

  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing={4} p={4}>
      <VStack
        divider={<Divider orientation="horizontal" />}
        spacing={4}
        align='stretch'
        width={{ base: '100%', md: '30%' }}
        border='1px'
        borderColor='gray.200'
        p={4}
      >
        {['Student1', 'Student2', 'Student1', 'Tutor1', 'Tutor3', '...'].map((name, index) => (
          <Text key={index}>{name}</Text>
        ))}
      </VStack>

      <VStack
        width={{ base: '100%', md: '70%' }}
        border='1px'
        borderColor='gray.200'
        p={4}
        spacing={4}
        align='stretch'
      >
        <VStack
          spacing={4}
          align='stretch'
          height='400px'
          overflowY='auto'
        >
            {messages.map((message, index) => (
            <Flex
                key={index}
                alignSelf={message.sender === 'Admin' ? 'flex-end' : 'flex-start'}
                bg={message.sender === 'Admin' ? 'blue.100' : 'green.100'}
                borderRadius='md'
                p={2}
                maxWidth="80%"
            >
                <VStack align={message.sender === 'Admin' ? 'flex-end' : 'flex-start'}>
                <Text fontWeight='bold'>{message.sender}:</Text>
                <Text textAlign={message.sender === 'Admin' ? 'right' : 'left'}>{message.text}</Text>
                </VStack>
            </Flex>
            ))}            


        </VStack>
        <InputGroup>
          <Input
            placeholder='...'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <InputRightElement children={
            <Button size='sm' onClick={handleSendMessage}>
              <ArrowForwardIcon />
            </Button>
          } />
        </InputGroup>
      </VStack>
    </Stack>
  );
};

export default AdminChatC;

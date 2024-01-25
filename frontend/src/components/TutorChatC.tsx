import React, { useState } from 'react';
import { Box, VStack, Divider, Input, Button, InputGroup, InputRightElement, Text, Stack, Flex } from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons';

const TutorChatC = () => {
  const [selectedUser, setSelectedUser] = useState('Admin');
  const [messages, setMessages] = useState([
    { sender: 'Admin', text: 'Blablabla...' },
    { sender: 'Tutor', text: 'Blablabla...' },
    { sender: 'Admin', text: 'Blablabla...' },
    { sender: 'Tutor', text: 'Blablabla...' }
  ]);
  const [newMessage, setNewMessage] = useState('');

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
          {/* {messages.map((message, index) => (
            <Box key={index} bg={message.sender === 'Admin' ? 'blue.100' : 'green.100'} p={2} borderRadius='md'>
              <Text fontWeight='bold'>{message.sender}:</Text>
              <Text>{message.text}</Text>
            </Box>
          ))} */}
            {messages.map((message, index) => (
            <Flex
                key={index}
                alignSelf={message.sender === 'Tutor' ? 'flex-end' : 'flex-start'}
                bg={message.sender === 'Tutor' ? 'blue.100' : 'green.100'}
                borderRadius='md'
                p={2}
                maxWidth="80%"
            >
                <VStack align={message.sender === 'Tutor' ? 'flex-end' : 'flex-start'}>
                <Text fontWeight='bold'>{message.sender}:</Text>
                <Text textAlign={message.sender === 'Tutor' ? 'right' : 'left'}>{message.text}</Text>
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

export default TutorChatC;

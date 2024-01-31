// AdminEditDeadlinesC


import React, { useEffect, useState } from 'react';
import { Box,Flex,Select,Button,VStack,HStack,Text,FormControl,FormLabel, Input, useToast } from "@chakra-ui/react";


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


interface Internship {
  id?: number;
  duration: number;
  type: string;
  jobTitle: string;
  mission: string;
  salary: number;
  startDate: Date | string;
  endDate: Date | string;
  TutorID?: number;
  tutorID: number;
  meetingList: {
      type: string;
      date: string;
      location: string;
      finished: boolean;
  }[];
  files: [
      {category: 1, type: "final report", content: [], confidential: 1, finished: false, deadline: "", message: ""}, 
      {category: 2, type: "CdC", content: [], confidential: 1, finished: false, deadline: "", message: ""},
      {category: 3, type: "fiche visit", content: [], confidential: 0, finished: false, deadline: "", message: ""},
      {category: 4, type: "first self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
      {category: 5, type: "second self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
      {category: 6, type: "third self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
      {category: 7, type: "intermediate evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
      {category: 8, type: "final evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
  ];
  status: string;
  student: User;
  tutor: User;
};

const formatDateForInput = (date: string | number | Date | undefined) => {
  if (!date) return '';
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};


const AdminEditDeadlinesC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [internshipType, setInternshipType] = useState('');
  const [fileType, setFileType] = useState('');
  const [deadline, setDeadline] = useState('');
  const currentYear = new Date().getFullYear();
  const toast = useToast();


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser)); 
        console.log("TEST user.promotion: ", `${user?.promotion}`);
        console.log("User ID from localStorage:", JSON.parse(storedUser)?.id);
    };
  }, []);


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const data = { internshipType, fileType, deadline };
    console.log(data);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internship/updateDeadline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Deadline updated successfully');
        toast({
          title: 'Deadline updated successfully.',
          description: "The deadline has been updated for the selected file type.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error('Failed to update deadline');
        toast({
          title: 'Failed to update deadline.',
          description: "The server responded with an error.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error updating deadline:', error);
      toast({
        title: 'Error updating deadline.',
        description: "An error occurred while trying to update the deadline.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };



  return (
    <Flex direction="column" p={5} w="full" maxW="960px" mx="auto">
      <Box as="form" onSubmit={handleSubmit} w="full" p={5} borderWidth="1px" borderRadius="lg">
        <VStack spacing={4}>

          <FormControl id="internship-type">
            <FormLabel>Internship Type (Year {currentYear}) </FormLabel>
            <Select placeholder="Select internship type" onChange={(e) => setInternshipType(e.target.value)} >
              <option value="M2">M2</option>
              <option value="M1">M1</option>
              <option value="L2">L2</option>
              <option value="L1">L1</option>
            </Select>
          </FormControl>

          <FormControl id="deadline-type">
            <FormLabel>File Type</FormLabel>
            <Select placeholder="Select file type" onChange={(e) => setFileType(e.target.value)} >
              <option value="final report">final report</option>
              <option value="CdC">CdC</option>
              <option value="fiche visit">fiche visit</option>
              <option value="first self-evaluation form">first self-evaluation form</option>
              <option value="second self-evaluation form">second self-evaluation form</option>
              <option value="third self-evaluation form">third self-evaluation form</option>
              <option value="intermediate evaluation form">intermediate evaluation form</option>
              <option value="final evaluation form">final evaluation form</option>
            </Select>
          </FormControl>

          <HStack w="full" justify="space-between">
            <FormControl id="deadline-date" flex="1">
            <FormLabel>Deadline (hand in the file before this date)</FormLabel>
            <Input 
                type="date"
                value={formatDateForInput(deadline)}
                onChange={(e) => setDeadline(e.target.value)}
            />
            </FormControl>
          </HStack>
         

          <HStack w="full" justify="center" align="center" spacing={4}>
            <Button colorScheme="blue" type="submit">Save</Button>
          </HStack>

        </VStack>
      </Box>
    </Flex>
  );
};

export default AdminEditDeadlinesC;


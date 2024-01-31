// AdminManageDeadlinesC

import React, { useContext, useEffect, useState } from 'react';
import { Box,Flex,Text,Button,Table,Thead,Tbody,Tr,Th,Td,VStack,HStack, Input  } from "@chakra-ui/react";
import axios from 'axios'; 

// AdminEditDeadlinesC

import AdminEditDeadlinesC from './AdminEditDeadlinesC';

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



const AdminManageDeadlinesC = () => {
    const [showViewEdit, setShowViewEdit] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [internshipId, setInternshipId] = useState<number | null>(null);
    const [filesDeadline, setFilesDeadline] = useState<{ final_report: string }>({ final_report: "" });



    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log("TEST user.promotion: ", `${user?.promotion}`);
            console.log("User ID from localStorage:", JSON.parse(storedUser)?.id);
        };
    }, []);


    const updateFileDeadlines = async () => {
        try {
            if (internshipId) {
                await axios.put(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internships/updateFileDeadlines/${internshipId}`, { filesDeadline });
            }
        } catch (error) {
            console.error('Error updating file deadlines:', error);
        }
    };

    const handleAddClick = () => {
        setShowViewEdit(true);
    };

    return (
        <Flex direction="column" p={5} w="full" maxW="1200px" mx="auto">
            {/* <Box w="full" p={5} borderWidth="1px" borderRadius="lg">
                <Text fontSize="2xl" fontWeight="bold" mb={4}>ADMIN SPACE</Text>
                
                <Table variant="simple">
                    <Thead bg="blue.500">
                        <Tr>
                            <Th color="white">NAME</Th>
                            <Th color="white">Promotion</Th>
                            <Th color="white">TYPE</Th>
                            <Th color="white">ACTION</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>L1 internship</Td>
                            <Td>2028</Td>
                            <Td>Final Report</Td>
                            <Td>
                                <HStack spacing={2}>
                                    <Button size="sm" colorScheme="blue">View / Edit</Button>
                                    <Button size="sm" colorScheme="green">Validate</Button>
                                    <Button size="sm" colorScheme="red">Remove</Button>
                                </HStack>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>L1 internship</Td>
                            <Td>2028</Td>
                            <Td>Final Report</Td>
                            <Td>
                                <HStack spacing={2}>
                                    <Button size="sm" colorScheme="blue">View / Edit</Button>
                                    <Button size="sm" colorScheme="green">Validate</Button>
                                    <Button size="sm" colorScheme="red">Remove</Button>
                                </HStack>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>L1 internship</Td>
                            <Td>2028</Td>
                            <Td>Final Report</Td>
                            <Td>
                                <HStack spacing={2}>
                                    <Button size="sm" colorScheme="blue">View / Edit</Button>
                                    <Button size="sm" colorScheme="green">Validate</Button>
                                    <Button size="sm" colorScheme="red">Remove</Button>
                                </HStack>
                            </Td>
                        </Tr>

                    </Tbody>
                </Table>
            </Box> */}

            {/* <VStack mt={4} spacing={4}>
                <Button colorScheme="blue"  onClick={handleAddClick} >Add</Button>
            </VStack>

            {showViewEdit && <AdminEditDeadlinesC />} */}


           
            <AdminEditDeadlinesC />
            
            
            <Flex direction="column" p={5} w="full" maxW="1200px" mx="auto">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>Set File Deadlines</Text>
            <Input
                type="number"
                placeholder="Internship ID"
                value={internshipId || ''}
                onChange={(e) => setInternshipId(parseInt(e.target.value))}
            />
            <Input
                type="text"
                placeholder="File Type (e.g., final report)"
                value={filesDeadline['final_report'] || ''}
                onChange={(e) => setFilesDeadline({ ...filesDeadline, final_report: e.target.value })}

            />
            <Button colorScheme="blue" onClick={updateFileDeadlines}>Update Deadlines</Button>
        </Flex>




        </Flex>
    );
}; 


export default AdminManageDeadlinesC;
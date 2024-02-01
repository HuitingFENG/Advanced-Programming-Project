// AdminManageInternshipsC

import React, { useContext, useEffect, useState } from 'react';
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon, Table, Thead, Tbody, Tr, Th, Td, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaSearch } from 'react-icons/fa';
import AdminViewEditC from './AdminViewEditC';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
// import { format } from 'date-fns';






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
    studentID?: number;
    tutorID: number;
    meetingList: {
        type: string;
        date: string;
        location: string;
        finished: boolean;
        deadline: "";
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






const AdminManageInternshipsC = () => {
    const [showViewEdit, setShowViewEdit] = useState(false);
    // const currentPage = 1;
    // const totalPages = 200; 
    const [internships, setInternships] = useState<Internship[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
    const [searchQuery, setSearchQuery] = useState('');




    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log("TEST user.promotion: ", `${user?.promotion}`);
            console.log("User ID from localStorage:", JSON.parse(storedUser)?.id);
        };
    }, []);


    useEffect(() => {
        fetchInternships();
    }, []);
    
    const fetchInternships = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internship`);
            if (!response.ok) {
                throw new Error('Failed to fetch internships');
            }
            const data = await response.json();
            setInternships(data);
            console.log("TEST internships: ", internships);
        } catch (error) {
            console.error('Error fetching internships:', error);
        }
    };



    const validateInternship = async (internshipId: any) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internship/${internshipId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Validated' }),
            });
            if (!response.ok) {
                throw new Error('Failed to validate internship');
            }
            fetchInternships(); 
        } catch (error) {
            console.error('Error validating internship:', error);
        }
    };
    
    const invalidateInternship = async (internshipId: any) => {
        console.log("TEST invalidateInternship...");

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internship/${internshipId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({status: 'Invalidated' }), 
            });
            if (!response.ok) {
                throw new Error('Failed to invalidate internship');
            }
            fetchInternships(); 
        } catch (error) {
            console.error('Error invalidating internship:', error);
        }
    };
    




    const handleAddClick = () => {
        setShowViewEdit(true);
    };

    const handleViewDetails = (internship: Internship) => {
        setSelectedInternship(internship);
        setIsViewModalOpen(true);
    };
      

    return (
        <Flex flexDir="column" gap={10} justify="center" align="center">
            <Flex width="80%" gap={10} justify="flex-end" align="center">
              <FaSearch size={24} color="grey"  />
              <Input
                    placeholder="Type keyword..."
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Flex>

            <Flex width="80%" mb={-8} >
                <Text bgColor="blue.500" color="white" textAlign="center" p={3} width="100%" fontSize="2xl" fontWeight="bold">MANAGE INTERNSHIPS</Text>
            </Flex>

            <Flex flexDir="row" gap={20} width="80%">
                
                <Flex flex="1" >
                    <Box overflowX="auto" overflowY="auto" maxH="1800px" w="100%">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Type</Th>
                                <Th>Student</Th>
                                <Th>Company</Th>
                                <Th>Tutor</Th>
                                <Th>Status</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {internships.map(internship => (
                                <Tr key={internship.id}>
                                    <Td>{internship.type} internship</Td>
                                    <Td>Promo {internship.student.promotion}, {internship.student.firstName} {internship.student.lastName.toUpperCase()}, {internship.student.email}</Td>
                                    <Td>{internship.tutor.company.name}, {internship.tutor.company.address}, {internship.tutor.company.zipCode}, {internship.tutor.company.city}</Td>
                                    <Td>{internship.tutor.firstName} {internship.tutor.lastName.toUpperCase()}, {internship.tutor.email}, {internship.tutor.telephone}</Td>
                                    <Td>{internship.status}</Td>
                                    <Td>
                                        <Button onClick={() => handleViewDetails(internship)}>View</Button>
                                        {internship.status === 'Pending' && (
                                            <>
                                                
                                                <Button onClick={() => validateInternship(internship.id)}>Validate</Button>
                                                <Button onClick={() => invalidateInternship(internship.id)}>Invalidate</Button>
                                            </>
                                        )}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    </Box>
                </Flex>
            </Flex>

            
            {/* <Flex justifyContent="center" alignItems="center" mt={4}>
                <Button disabled={currentPage <= 1}>{"<"}</Button>
                <Text mx={2}>
                    Page {currentPage} of {totalPages}
                </Text>
                <Button disabled={currentPage >= totalPages}>{">"}</Button>
            </Flex> */}

{/*             
            <Flex justifyContent="center" alignItems="center" mt={4}>
                <Button bgColor="#0C2340"  color="white" onClick={handleAddClick} >
                    <Text fontSize="xl" fontWeight="bold">Add</Text>
                </Button>
            </Flex> */}


       

            <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
                <ModalOverlay />
                <ModalContent maxW="60vw">
                    <ModalHeader>Internship Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    {selectedInternship && (
                        <Box>
                        <Text mb={2}><strong>Type: </strong> {selectedInternship.type}</Text>
                        <Text mb={2}><strong>Duration: </strong> {selectedInternship.duration} weeks</Text>
                        <Text mb={2}><strong>Job Title: </strong> {selectedInternship.jobTitle}</Text>
                        <Text mb={2}><strong>Mission: </strong> {selectedInternship.mission}</Text>
                        <Text mb={2}><strong>Salary: </strong> {selectedInternship.salary} euros per month</Text>
                        <Text mb={2}>
                            <strong>Start Date: </strong> 
                            {selectedInternship.startDate ? new Intl.DateTimeFormat('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                timeZone: 'Europe/Paris'
                            }).format(new Date(selectedInternship.startDate)) : 'N/A'}
                        </Text>
                        <Text mb={2}>
                            <strong>End Date: </strong> 
                            {selectedInternship.endDate ? new Intl.DateTimeFormat('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                timeZone: 'Europe/Paris'
                            }).format(new Date(selectedInternship.endDate)) : 'N/A'}
                        </Text>

                        <Text mb={2}><strong>Student Email: </strong> {selectedInternship.student.email}</Text>
                        <Text mb={2}><strong>Tutor Email: </strong> {selectedInternship.tutor.email}</Text>
                        <Text mb={2}><strong>Meetings:</strong></Text>
                        {selectedInternship.meetingList.map((meeting, index) => (
                            <Text key={index}  mb={2}>
                                <strong>Type:</strong> {meeting.type} - <strong>Date:</strong> {meeting.date} - <strong>Location:</strong> {meeting.location} - <strong>Finished:</strong> {meeting.finished ? 'true' : 'false'}
                            </Text>
                        ))}
                        <Text mb={2}><strong>Files:</strong></Text>
                        {selectedInternship.files.map((file, index) => (
                            <Text key={index}  mb={2}>
                                <strong>File Type:</strong> {file.type}   -   <strong>Finished:</strong> {file.finished ? 'true' : 'false'}
                            </Text>
                        ))}
                        </Box>
                    )}
                    </ModalBody>
                    <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => setIsViewModalOpen(false)}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>



        </Flex>
    );
}; 

export default AdminManageInternshipsC;
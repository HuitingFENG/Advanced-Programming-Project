// TutorManageMeetingC


import React, { useContext, useEffect, useState } from 'react';
import { Box,Flex,Table,Thead,Tbody,Tr,Th,Td,Button,Text,Container,Radio,RadioGroup,Stack, useToast } from "@chakra-ui/react";
  

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
    student: {
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
    }[];
};


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
  

interface TutorManageMeetingProps {
    meetingType: string;
    selectedInternship: Internship;
    onSubmissionSuccess: () => void;
}




const TutorManageMeetingC : React.FC<TutorManageMeetingProps> = ({ meetingType, selectedInternship, onSubmissionSuccess }) => {
    const [user, setUser] = useState<User | null>(null);
    const toast = useToast();
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});


    useEffect(() => {
        console.log("selectedInternship: ", selectedInternship);
    }, [selectedInternship]);

    useEffect(() => {
        console.log("Latest Tutor updated: ", user);
    }, [user]);


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log("TEST user.promotion: ", `${user?.promotion}`);
            console.log("User ID from localStorage:", JSON.parse(storedUser)?.id);
        };
    }, []);

    const meetingsOfType = selectedInternship.meetingList.filter(meeting => meeting.type === meetingType);

    const validateMeeting = async (meetingIndex: number) => {
        console.log("TEST validateMeeting's meetingIndex: ", meetingIndex);
        console.log("TEST meetingsOfType: ", meetingsOfType);
        console.log("TEST meetingsOfType[0]: ", meetingsOfType[0]);
        console.log("TEST meetingsOfType[1]: ", meetingsOfType[1]);

        try {
        const response = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internship/updateMeetingStatus/${selectedInternship.id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ meetingType }),
        });

        if (!response.ok) {
            throw new Error('Failed to update meeting status');
        }

        toast({
            title: 'Meeting validated successfully',
            description: `The ${meetingType} meeting has been marked as finished.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
        onSubmissionSuccess(); 
        } catch (error) {
        toast({
            title: 'Error validating meeting',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
        }
    };


    return (
        <Container maxW="container.2xl" p={5} mt={20}>
            <Flex direction="column" overflowX="auto">
                <Text fontSize="4xl" fontWeight="bold" mb={4} textAlign="center" >TUTOR SPACE</Text>
                <Table variant="striped" colorScheme="teal" size="sm">
                <Thead>
                    <Tr>
                    <Th>Type</Th>
                    <Th>Date</Th>
                    <Th>Location</Th>
                    <Th>Deadline</Th>
                    <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>

                    {meetingsOfType.map((meeting, index) => (
                        <Tr key={index}>
                            <Td>{meeting.type}</Td>
                            <Td>{meeting.date}</Td>
                            <Td>{meeting.location}</Td>
                            <Td>{meeting.deadline}</Td>
                            <Td>
                            <Button colorScheme="blue" mr={3} onClick={() => validateMeeting(index)} disabled={meeting.finished}>
                                Validate
                            </Button>
                            </Td>
                        </Tr>
                    ))}

                </Tbody>
                </Table>

            </Flex>
        </Container>
    );
}; 


export default TutorManageMeetingC;
import { Button, Flex, useToast, FormControl, FormLabel, HStack, Heading, Input, Text, VStack, Textarea,Select,Box, Container, Table, Thead, Tr, Th, Tbody, Badge, Td } from  "@chakra-ui/react";
import React, { useState, useEffect, useContext, ReactNode }  from 'react';
// import StudentAddNewInternshipC from "./StudentAddNewInternshipC";
import StudentAddNewInternshipC2 from "./StudentAddNewInternshipC2";
import { useUser } from '../context/UserContext';
import userEvent from "@testing-library/user-event";

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
    files: {
        category?: number;
        type: string;
        content?: any[]; 
        confidential?: number;
        finished?: boolean;
        deadline?: string;
        message?: string;
    }[];
    status: string;
};


const StudentManageInternshipsC = () => {
    const [showViewEdit, setShowViewEdit] = useState(false);
    const [userData, setUserData] = useState<User | null >(null);
    const [internshipData, setInternshipData] = useState<Internship[] | null >(null);
    const [fileData, setFileData] = useState<File[] | null>(null);
    const toast = useToast();
   

    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        console.log("TEST storedUser: ", storedUser);
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (user && user.id) {
            fetchAllData(); 
        }
    }, [user, toast]);


    useEffect(() => {
        console.log("Updated userData: ", userData);
    }, [userData]);
    
    useEffect(() => {
        console.log("Updated internshipData: ", internshipData);
    }, [internshipData]);
    

    const handleAddClick = () => {
        setShowViewEdit(true);
    };

    const fetchAllData = async () => {
        console.log("TEST fetchAllData...");
        try {
            const userResponse = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/user/${user?.id}`, {
                method: 'GET', headers: { 'Content-Type': 'application/json',},});
            if (!userResponse.ok) {throw new Error('Failed to fetch user data');}
            const userDataJSON = await userResponse.json();
            console.log("TEST userDataJSON: ", userDataJSON);
            if (userDataJSON.length > 0) {
                setUserData(userDataJSON[0]); 
            } else {
                console.log("No user data found");
            }


            const internshipResponse = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internship/student/${user?.id}`, {
                method: 'GET', headers: { 'Content-Type': 'application/json',},});
            if (!internshipResponse.ok) {throw new Error('Failed to fetch internship data');}
            const internshipDataJSON = await internshipResponse.json();
            console.log("TEST internshipDataJSON: ", internshipDataJSON);
            setInternshipData(internshipDataJSON);
            console.log("TEST internshipData: ", internshipData);
            if (internshipDataJSON && internshipDataJSON.length > 0) {
                const fileListIDs = internshipDataJSON.map((internship: { fileListID: any; }) => internship.fileListID);
                console.log('File List IDs:', fileListIDs);
            }
            // console.log("TEST internshipDataJSON: ", internshipDataJSON);
            // const internshipsWithFiles = await Promise.all(internshipDataJSON.map(async (internship: { fileListID: any; }) => {
            //     const fileListID = internship.fileListID;
            //     const fileResponse = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/file/${fileListID}`);
            //     if (!fileResponse.ok) throw new Error(`Failed to fetch file data for fileListID: ${fileListID}`);
            //     const fileData = await fileResponse.json();
            //     // Here we're assuming fileData is directly usable; adjust as needed based on your API's response structure
            //     return { ...internship, fileData };
            // }));
            // setInternshipData(internshipsWithFiles);
            // console.log("TEST setInternshipData(internshipsWithFiles): ", internshipData);
            


            // const fileResponse = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/file/${internshipData?.fileListID}`, {
            //     method: 'GET', headers: { 'Content-Type': 'application/json',},});
            // if (!fileResponse.ok) {throw new Error('Failed to fetch file data');}
            // const fileDataJSON = await fileResponse.json();
            // console.log("TEST fileDataJSON: ", fileDataJSON);

      
          } catch (error) {
            toast({
              title: 'Error',
              description: 'Failed to fetch data',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            console.error('Error fetching data:', error);
          }
    };



 
    const handleChildCompletion = () => {
        setShowViewEdit(false); 
        fetchAllData();
    };
    

    if (!userData || !internshipData) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxW="container.2xl" p={5}>
            <Box overflowX="auto" p={5} borderWidth="1px" borderRadius="lg"  overflow="hidden">
                <Flex justifyContent="flex-end" mb={4} gap={5}>
                <Button colorScheme="red">Not Finished</Button>
                <Button colorScheme="green">Finished</Button>
                </Flex>
                <Text fontSize="3xl" fontWeight="bold" mb={4} mt={4} textAlign="center">STUDENT SPACE</Text>
                <Table variant="simple" >
                <Thead>
                    <Tr border="1px" borderColor="gray.200">
                    <Th border="1px" borderColor="gray.200">Promotion</Th>
                    <Th border="1px" borderColor="gray.200">Student</Th>
                    <Th border="1px" borderColor="gray.200">Year</Th>
                    <Th border="1px" borderColor="gray.200">Status</Th>
                    <Th border="1px" borderColor="gray.200">Start Date</Th>
                    <Th border="1px" borderColor="gray.200">End Date</Th>
                    <Th border="1px" borderColor="gray.200">Meetings</Th>
                    <Th border="1px" borderColor="gray.200">Files</Th>
                
                    </Tr>
                </Thead>
                <Tbody>
                    {internshipData.map((internship, index) => (
                    <Tr key={index}>
                        <Td border="1px" borderColor="gray.200">{userData.promotion}</Td>
                        <Td border="1px" borderColor="gray.200">{userData.firstName.charAt(0).toUpperCase()+ userData.firstName.slice(1)} {userData.lastName.toUpperCase()}</Td>
                        <Td border="1px" borderColor="gray.200">{internship.type}</Td>
                        <Td border="1px" borderColor="gray.200">{internship.status}</Td>
                        <Td border="1px" borderColor="gray.200">{internship.startDate ? new Date(internship.startDate).toLocaleDateString() : 'N/A'}</Td>
                        <Td border="1px" borderColor="gray.200">{internship.endDate ? new Date(internship.endDate).toLocaleDateString() : 'N/A'}</Td>
                        <Td border="1px" borderColor="gray.200">
                      
                        {internship.meetingList?.map((meeting, index) => (
                            <Badge 
                            key={index} 
                            color="white"
                            bg={meeting.finished ? "green.500" : "red.500"} 
                            m={1}
                            p={2}
                            borderRadius="lg"
                            >
                            {meeting.type}: {meeting.finished ? "Finished" : "Not Finished"}
                            </Badge>
                        ))}
                        </Td>
                        <Td border="1px" borderColor="gray.200">
                        {internship.files?.slice(0, 6).map((file, index) => (
                            <Badge 
                            key={index} 
                            color="white"
                            bg={file.finished ? "green.500" : "red.500"} 
                            m={1}
                            p={2}
                            borderRadius="lg"
                            >
                            {file.type}: {file.finished ? "Finished" : "Not Finished"} 
                    
                            </Badge>
                            
                        ))}
                        </Td>
                        
                    </Tr>
                    ))}
                </Tbody>
                </Table>
                <Flex justifyContent="center" my={4}>
                <Button>{"<"}</Button>
                <Text mx={2}>Page 1 of 5</Text>
                <Button>{">"}</Button>
                </Flex>
            </Box>
            <VStack mt={4} spacing={4}>
                <Button colorScheme="blue"  onClick={handleAddClick} >Add</Button>
            </VStack>
       
            {showViewEdit && <StudentAddNewInternshipC2 onCompletion={handleChildCompletion} />}
        </Container>
    );
};


export default StudentManageInternshipsC;
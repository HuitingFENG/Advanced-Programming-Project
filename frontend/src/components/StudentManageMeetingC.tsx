import React, { useState, useEffect, useContext }  from 'react';
import { Box,Flex,Heading,Text,Button,FormControl,FormLabel,Input,Radio,RadioGroup,Stack,Select,HStack,Container,useToast,List,ListItem,ListIcon, } from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';



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
};



const StudentManageMeetingC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [meetingType, setMeetingType] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [latestInternship, setLatestInternship] = useState<Internship | null>(null);
    const toast = useToast();
   


    useEffect(() => {
        console.log("Latest Internship updated: ", latestInternship);
    }, [latestInternship]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log("TEST user.promotion: ", `${user?.promotion}`);
            console.log("User ID from localStorage:", JSON.parse(storedUser)?.id);
        };
    }, []);

    useEffect(() => {
        const fetchLatestInternship = async () => {
            if (user?.id) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internship/student/${user?.id}/latest`);
                    if (!response.ok) throw new Error('Failed to fetch latest internship');
                    const data = await response.json();
                    setLatestInternship(data);
                    console.log("TEST user.id from localStorage: ", user?.id);
                    console.log("TEST setLatestInternship(data): ", latestInternship);
                } catch (error) {
                    console.error('Error fetching latest internship ID:', error);
                }
            }
        };
    fetchLatestInternship();
    }, [user?.id]);



    const handleDateChange = (value: string) => {
        setDate(value); 
        console.log("TEST date choice: ", date);
    };

    const handleLocationChange = (value: string) => {
        setLocation(value); 
        console.log("TEST location choice: ", location);
    };

    const handleSubmit = async () => {
        console.log("TEST handleSubmit...");
        console.log("TEST ${latestInternship?.id}: ", latestInternship?.id);

        if (!meetingType || !date || !location) {
           
            toast({
                title: 'Error',
                description: "Please fill in all fields before submitting.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return; 
        }
        setIsSubmitting(true);
        console.log("Submitting with data:", { meetingType, date, location });


        const meetingData = {
            meetingType,
            date: date, 
            location: location, 
        };
        console.log("TEST meetingData: ", meetingData);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internship/updateMeetingList/${latestInternship?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(meetingData),
            });
            if (!response.ok) {
                throw new Error('Failed to update meeting list');
            }
            console.log('Meeting list updated successfully');
            toast({
                title: 'Submitted',
                description: "Your have submitted successfully.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            // fetchMeetingList();
        } catch (error) {
            console.error('Error submitting meeting:', error);
            toast({
                title: 'Submission Error',
                description: "There was an error submitting. Please try again.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
    

    





    return (
        <Container maxW="container.xl" p={5}  >
            <Box w="full" p={5} borderWidth="1px" borderRadius="lg" mb={10}>
                <Flex justify="center" align="center" flexDir="column">
                    <Heading mb={4} >Meeting</Heading>
                    <Text fontSize="sm" mb={2} textColor="red" >DEADLINE OF DEFENSE: {latestInternship?.meetingList?.find(m => m.type === "defense")?.deadline || "Not set"}</Text>
                    <Text fontSize="sm" mb={2} textColor="red" >DEADLINE OF VISIT: {latestInternship?.meetingList?.find(m => m.type === "visit")?.deadline || "Not set"}</Text>
                    <Text fontSize="sm" mb={2} textColor="red" >* All fields are need to be chosen.</Text>
                    <Box w="full" maxWidth="1000px">
                      
                        <FormControl mb={4}>
                            <FormLabel>Meeting Type:</FormLabel>
                            <Select placeholder="Select meeting type" onChange={(e) => setMeetingType(e.target.value)}>
                                <option value="visit">Visit</option>
                                <option value="defense">Defense</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Date</FormLabel>
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => handleDateChange(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Location</FormLabel>
                            <RadioGroup value={location} onChange={(nextValue) => handleLocationChange(nextValue)}>
                                <Stack direction="row">
                                    <Radio value="At School">At School</Radio>
                                    <Radio value="At Company">At Company</Radio>
                                    <Radio value="Visio">Visio</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        
                        <Flex justify="center">
                            <Button colorScheme="blue" onClick={handleSubmit} isDisabled={isSubmitting}>
                                {isSubmitting ? "Submitted" : "Submit"}
                            </Button>
                        </Flex>

                    </Box>
                </Flex>
            </Box>

            

        </Container>
    );
};


export default StudentManageMeetingC;
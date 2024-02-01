import React, { useState, useEffect, useContext }  from 'react';
import { Flex,Text,Box,VStack,HStack,Input,Textarea,Button,Heading,FormLabel,FormControl,Select,Radio,RadioGroup,Stack,Divider,useToast } from '@chakra-ui/react';
import { useUser } from '../context/UserContext';


interface Question {
    id: number;
    text: string;
    type: 'text' | 'range' | 'binary';
}

type DirectValueChange = {
    name: string;
    value: string;
};

interface StudentFillProps {
    formTitle: string;
    formDeadline: string;
    questions: { [key: string]: Question };
    fileCategory: number;
}

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

interface Tutor {
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


const StudentFillC : React.FC<StudentFillProps> = ({ formTitle, formDeadline, questions, fileCategory }) => {
    const [value, setValue] = useState('1');
    const userContext = useUser();
    const [user, setUser] = useState<User | null>(null);
    const [latestInternship, setLatestInternship] = useState<Internship | null>(null);
    const [tutor, setTutor] = useState<Tutor | null>(null);
    const toast = useToast();
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [fileDeadline, setFileDeadline] = useState('');

    useEffect(() => {
        console.log("Latest Internship updated: ", latestInternship);
        if (fileCategory === 3 && latestInternship) {
            setFileDeadline(latestInternship?.files[2].deadline);
            console.log("TEST fileDeadline: ", fileDeadline);
        } else if (fileCategory === 4 && latestInternship) {
            setFileDeadline(latestInternship?.files[3].deadline);
            console.log("TEST fileDeadline: ", fileDeadline);
        } else if (fileCategory === 5 && latestInternship) {
            setFileDeadline(latestInternship?.files[4].deadline);
            console.log("TEST fileDeadline: ", fileDeadline);
        } else if (fileCategory === 6 && latestInternship) {
            setFileDeadline(latestInternship?.files[5].deadline);
            console.log("TEST fileDeadline: ", fileDeadline);
        };
    }, [latestInternship]);

    useEffect(() => {
        console.log("Latest Tutor updated: ", tutor);
        console.log("TEST display tutor's information: ", tutor?.firstName);
    }, [tutor]);

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

    useEffect(() => {
        const fetchTutor = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/user/${latestInternship?.tutorID}`);
                    if (!response.ok) throw new Error('Failed to fetch tutor');
                    const data = await response.json();
                    setTutor(data[0]);
                } catch (error) {
                    console.error('Error fetching latest internship ID:', error);
                }
        };
        if (latestInternship?.tutorID) { fetchTutor(); }
    }, [latestInternship?.tutorID]);


    const handleChange = (key: string, value: string) => {
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [key]: value,
        }));
    };

    
    const renderQuestionInput = (key: string, question: Question) => {
        switch (question.type) {
          case 'text':
            return (
              <Textarea
                value={answers[key] || ''}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            );
          case 'range':
            return (
              <RadioGroup
                value={answers[key] || ''}
                onChange={(value) => handleChange(key, value)}
              >
                <Stack direction="row">
                  {['1', '2', '3', '4', '5'].map((option) => (
                    <Radio key={option} value={option}>
                      {option}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            );
          case 'binary':
            return (
              <RadioGroup
                value={answers[key] || ''}
                onChange={(value) => handleChange(key, value)}
              >
                <Stack direction="row">
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </Stack>
              </RadioGroup>
            );
          default:
            return null;
        }
    };




    const handleSubmit = async () => {
        console.log("TEST answers: ", answers);
        console.log("TEST fileCategory: ", fileCategory);

        const content = Object.entries(questions).map(([key, question]) => ({
            question: question,
            answer: answers[key] || "No answer provided"
        }));
        console.log("TEST handleSubmit's content: ", content);

        const contentToSend = Object.entries(questions).map(([key, question]) => ({
            ...question, // Spread the question details
            answer: answers[key]
        }));
        console.log("TEST handleSubmit's contentToSend: ", contentToSend);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internship/updateFileContent/${latestInternship?.id}/${fileCategory}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: contentToSend }),
            });
            if (!response.ok) throw new Error('Failed to update internship file content');
            toast({
                title: 'Form Submitted',
                description: "Your form has been submitted successfully.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            toast({
                title: 'Submission Error',
                description: "There was an error submitting your form. Please try again.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }        
    };





    return (
        <Box p={5} borderWidth="1px" borderRadius="lg" width="80%">
            <VStack spacing={5} gap={10}>
                <Text fontSize="sm" textAlign="center" color="red">DEADLINE OF THIS FILE: {fileDeadline}</Text>
                <Heading size="lg" textAlign="center">{formTitle}</Heading>
                <Divider />
                
                <Flex justify="center" flexDir="row" gap={10} m={5}>
                    <FormControl id="student">
                        <FormLabel>Student's Info</FormLabel>
                        <Input placeholder={user?.lastName.toUpperCase()} readOnly />
                        <Input placeholder={user?.firstName}  readOnly />
                        <Input placeholder={latestInternship?.duration.toLocaleString() + " weeks"} readOnly />
                        <Input placeholder={latestInternship?.jobTitle} />
                        <Input placeholder={latestInternship?.startDate.toLocaleString().slice(0,10)}  readOnly />
                        <Input placeholder={latestInternship?.endDate.toLocaleString().slice(0,10)}   readOnly />
                        <Input placeholder={latestInternship?.type.toLocaleString()} readOnly />
                    </FormControl>

                    <FormControl id="company">
                        <FormLabel>Company's Info</FormLabel>
                        <Input placeholder={tutor?.company.name} readOnly /> 
                        <Input placeholder={tutor?.company.address} readOnly />
                        <Input placeholder={tutor?.company.zipCode} readOnly />
                        <Input placeholder={tutor?.company.city} readOnly />
                    </FormControl>
                
                    <FormControl id="tutor">
                        <FormLabel>Company Tutor's Info</FormLabel>
                        <Input placeholder={tutor?.lastName.toUpperCase()} readOnly />
                        <Input placeholder={tutor?.firstName}  readOnly />
                        <Input placeholder={tutor?.email}   readOnly />
                        <Input placeholder={tutor?.telephone}  readOnly />
                    </FormControl>
                </Flex>


                <Box p={5} borderWidth="1px" borderRadius="lg" width="100%">
                <VStack spacing={5} gap={10}>
                    {Object.entries(questions).map(([key, question]) => (
                    <FormControl key={key}>
                        <FormLabel>{question.text}</FormLabel>
                        {renderQuestionInput(key, question)}
                    </FormControl>
                    ))}
                    <Button colorScheme="blue" onClick={handleSubmit}>Submit</Button>
                </VStack>
                </Box>

            </VStack>
        </Box>
    );
};


export default StudentFillC;
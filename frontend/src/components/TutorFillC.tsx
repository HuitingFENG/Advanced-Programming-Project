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

interface TutorFillProps {
    formTitle: string;
    formDeadline: string;
    questions: { [key: string]: Question };
    fileCategory: number;
    selectedInternship: Internship;
    onSubmissionSuccess: () => void;
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


const TutorFillC : React.FC<TutorFillProps> = ({ formTitle, formDeadline, questions, fileCategory, selectedInternship, onSubmissionSuccess }) => {
    const [value, setValue] = useState('1');
    const [user, setUser] = useState<User | null>(null);
    const toast = useToast();
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    

    
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
            console.log("User ID from localStorage:", JSON.parse(storedUser)?.id);
        };
    }, []);

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
            ...question, 
            answer: answers[key]
        }));
        console.log("TEST handleSubmit's contentToSend: ", contentToSend);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internship/updateFileContent/${selectedInternship?.id}/${fileCategory}`, {
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
            
            onSubmissionSuccess();

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
                <Text fontSize="sm" textAlign="center" color="red">DEADLINE OF THIS FILE: {formDeadline}</Text>
                <Heading size="lg" textAlign="center">{formTitle}</Heading>
                <Divider />
                
                <Flex justify="center" flexDir="row" gap={10} m={5}>
                    <FormControl id="Tutor">
                        <FormLabel>Student's Info</FormLabel>
                        <Input placeholder={selectedInternship.student[0].lastName.toUpperCase()} readOnly />
                        <Input placeholder={selectedInternship.student[0].firstName} readOnly />
                        <Input placeholder={selectedInternship.student[0].email} readOnly />
                        <Input placeholder={selectedInternship.student[0].telephone} readOnly />
                        <Input placeholder={selectedInternship.student[0].promotion.toLocaleString()} readOnly />
                    </FormControl>

                    <FormControl id="company">
                        {/* <FormLabel>Company's Info</FormLabel>
                        <Input placeholder={user?.company?.name} readOnly />  */}
                        {/* <Input placeholder={user?.company.name} readOnly /> 
                        <Input placeholder={user?.company.address} readOnly />
                        <Input placeholder={user?.company.zipCode} readOnly />
                        <Input placeholder={user?.company.city} readOnly /> */}
                    </FormControl>
                
                    <FormControl id="tutor">
                        <FormLabel>Company Tutor's Info</FormLabel>
                        <Input placeholder={user?.lastName.toUpperCase()} readOnly />
                        <Input placeholder={user?.firstName}  readOnly />
                        <Input placeholder={user?.email}   readOnly />
                        <Input placeholder={user?.telephone}  readOnly />
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


export default TutorFillC;
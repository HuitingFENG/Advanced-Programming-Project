import React, { useState, useEffect, useContext }  from 'react';
import { Select, Box,Flex, Button, FormControl, FormLabel,Input, Heading, VStack, HStack, Textarea, useColorModeValue, useToast } from "@chakra-ui/react";
import { useUser } from '../context/UserContext';


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
}

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


interface Company {
    name: string;
    address: string;
    city: string;
    zipCode: string;
}
  

interface FormData {
    internship: Partial<Internship>;
    company: Partial<Company>;
    tutor: Partial<Tutor>;
};


const formatDateForMySQL = (date: string | number | Date) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 19).replace('T', ' ');
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

interface StudentAddNewInternshipC2Props {
    onCompletion: () => void;
}


const StudentAddNewInternshipC2 = ( { onCompletion }: StudentAddNewInternshipC2Props ) => {
    const [showViewEdit, setShowViewEdit] = useState(true);
    const toast = useToast();
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const initialFormData: FormData = {
        tutor: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            type: 'tutor',
            telephone: '',
            oldPassword: '',
            promotion: 0,
            year: '',
            company: {
                name: '',
                address: '',
                city: '',
                zipCode: ''
            }
        },
        internship: {
            duration: 0,
            type: '',
            jobTitle: '',
            mission: '',
            salary: 0,
            startDate: '',
            endDate: '',
            studentID: user?.id ?? undefined,
            tutorID: 0,
            meetingList: [
                {type: "visit", date: "", location: "", finished: false, deadline: ""}, 
                {type: "defense", date: "", location: "", finished: false, deadline: ""}
            ],
            files:[
                {category: 1, type: "final report", content: [], confidential: 1, finished: false, deadline: "", message: ""}, 
                {category: 2, type: "CdC", content: [], confidential: 1, finished: false, deadline: "", message: ""},
                {category: 3, type: "fiche visit", content: [], confidential: 0, finished: false, deadline: "", message: ""},
                {category: 4, type: "first self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
                {category: 5, type: "second self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
                {category: 6, type: "third self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
                {category: 7, type: "intermediate evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
                {category: 8, type: "final evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
            ],
            status: 'Pending',
        },
        // file: {},
        company: {},
    };
    const [formData, setFormData] = useState<FormData>(initialFormData);


    if (!user) {
        return <div>Loading user data...</div>;
    }


    const handleInputChange = (
        section: keyof FormData,
        field: string,
        isNested: boolean = false,
        nestedField?: string
      ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.value;
      
        setFormData((prevFormData) => {
          const updatedFormData = { ...prevFormData };
          if (isNested && nestedField) {
            if (updatedFormData[section] && typeof updatedFormData[section] === 'object') {
              const sectionData: any = updatedFormData[section];
              if (!sectionData[nestedField]) sectionData[nestedField] = {};
              sectionData[nestedField][field] = value;
            }
          } else {
            const sectionData: any = updatedFormData[section];
            sectionData[field] = value;
          }
          return updatedFormData;
        });
    };
      
    


    const handleSubmit = async () => {
        console.log("TEST handleSubmit formData.tutor.email: ", formData.tutor.email);

        try {   
            // const userData = formData.tutor;
            // userData.password = formData.tutor.lastName; // the first time, directly use tutor's lastName as password, later can be modified if this declaration of internship is validated by school.
        
            // const internshipData = formData.internship;
            // console.log("TEST userData: ", userData);
            // console.log("TEST internshipData: ", internshipData);
            

            // const userResponse = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/user/register`, {
            //     method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(userData),});
            // if (!userResponse.ok) {throw new Error('Failed to register user');}
            // const userDataJSON = await userResponse.json();
            // console.log("TEST userDataJSON : ", userDataJSON);
            // internshipData.tutorID = userDataJSON.id;
            // console.log("TEST internshipData.tutorID : ", internshipData.tutorID);



            // const internshipResponse = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internship`, {
            //     method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(internshipData),});
            // if (!internshipResponse.ok) {throw new Error('Failed to create internship');}
            // const internshipDataJSON = await internshipResponse.json();
            // console.log("TEST internshipDataJSON : ", internshipDataJSON);



            // Step 1: Check if tutor exists
            const checkTutorResponse = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/user/checkTutor`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.tutor.email,
                }),
            });

            let tutorId;

            if (checkTutorResponse.ok) {
                const checkTutorData = await checkTutorResponse.json();
                if (checkTutorData.exists && checkTutorData.tutorId) {
                    tutorId = checkTutorData.tutorId; // Tutor exists, use the returned ID
                } else {
                    // Tutor does not exist, proceed to register a new tutor
                    const userData = { ...formData.tutor, password: formData.tutor.lastName }; // Using lastName as password initially
                    const userResponse = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/user/register`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userData),
                    });

                    if (!userResponse.ok) throw new Error('Failed to register user');

                    const userDataJSON = await userResponse.json();
                    tutorId = userDataJSON.id; // Use new tutor's ID
                }
            } else {
                throw new Error('Failed to check for existing tutor');
            }

            // Step 2: Create Internship with the tutor ID
            const internshipData = { ...formData.internship, tutorID: tutorId };

            const internshipResponse = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internship`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(internshipData),
            });

            if (!internshipResponse.ok) throw new Error('Failed to create internship');


            toast({
                title: 'Success',
                description: 'Data saved successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            setFormData(initialFormData);
            setShowViewEdit(false); 
            onCompletion();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to save data',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            console.error('Error saving data:', error);
        }
    };



    return (
        <Flex direction ="column" p={8} mt={20} align="center" justify="center" >
            <Box w="full" maxW="6xl" p={5} borderWidth="1px" borderRadius="lg" boxShadow="lg">
                <Heading size="lg" mb={6} textAlign="center">STUDENT SPACE</Heading>

                <VStack>
                    <HStack w="full" justify="space-between">
                        <FormControl id="company-name" flex="1">
                        <FormLabel>Company Name:</FormLabel>
                        <Input value={formData.tutor.company?.name} onChange={handleInputChange(/* 'company', 'name' */ 'tutor', 'name', true, 'company')} />
                        </FormControl>
                        <FormControl id="company-address" flex="1">
                        <FormLabel>Company Address:</FormLabel>
                        <Input value={formData.tutor.company?.address} onChange={handleInputChange(/* 'company', 'address' */ 'tutor', 'address', true, 'company')} />
                        </FormControl>
                        <FormControl id="company-city" flex="1">
                        <FormLabel>Company City:</FormLabel>
                        <Input value={formData.tutor.company?.city} onChange={handleInputChange(/* 'company', 'city' */  'tutor', 'city', true, 'company')} />
                        </FormControl>
                        <FormControl id="company-zipcode" flex="1">
                        <FormLabel>Company Zip Code:</FormLabel>
                        <Input value={formData.tutor.company?.zipCode} onChange={handleInputChange(/* 'company', 'zipCode' */  'tutor', 'zipCode', true, 'company')} />
                        </FormControl> 
                    </HStack>

                    <HStack w="full" justify="space-between">
                        <FormControl id="tutorFirstName" flex="1">
                        <FormLabel>Tutor First Name:</FormLabel>
                        <Input value={formData.tutor.firstName} onChange={handleInputChange('tutor', 'firstName')} />
                        </FormControl>
                        <FormControl id="tutorLastName" flex="1">
                        <FormLabel>Tutor Last Name:</FormLabel>
                        <Input value={formData.tutor.lastName} onChange={handleInputChange('tutor', 'lastName')} />
                        </FormControl>
                        <FormControl id="tutor-phone-number" flex="1">
                        <FormLabel>Tutor Telephone:</FormLabel>
                        <Input value={formData.tutor.telephone} onChange={handleInputChange('tutor', 'telephone')} />
                        </FormControl>
                        <FormControl id="tutor-mail" flex="1">
                        <FormLabel>Tutor Email:</FormLabel>
                        <Input value={formData.tutor.email} onChange={handleInputChange('tutor', 'email')} />
                        </FormControl>
                    </HStack>

       

                    <FormControl id="internship-type">
                        <FormLabel>Internship Type:</FormLabel>
                        <Select 
                            size="sm" 
                            value={formData.internship.type} 
                            onChange={handleInputChange('internship', 'type')}
                        >
                            <option value="">Choose one from L1 / L2 / M1 / M2</option>
                            <option value="L1">L1</option>
                            <option value="L2">L2</option>
                            <option value="M1">M1</option>
                            <option value="M2">M2</option>
                        </Select>
                    </FormControl>


                    <FormControl id="class">
                        <FormLabel>Job Title:</FormLabel>
                        <Input size="sm" value={formData.internship.jobTitle} onChange={handleInputChange('internship', 'jobTitle')} />
                    </FormControl>

                    <FormControl id="class">
                        <FormLabel>Mission Description:</FormLabel>
                        <Textarea size="sm" value={formData.internship.mission} onChange={handleInputChange('internship', 'mission')} />
                    </FormControl>

                    <HStack w="full" justify="space-between">
                        <FormControl id="start-date" flex="1">
                        <FormLabel>Start Date:</FormLabel>
                        <Input 
                            type="date"
                            value={formatDateForInput(formData.internship.startDate)}
                            onChange={(e) => setFormData({
                                ...formData,
                                internship: { ...formData.internship, startDate: e.target.value }
                            })}
                        />
                        </FormControl>
                        <FormControl id="end-date" flex="1">
                        <FormLabel>End Date:</FormLabel>
                        <Input 
                            type="date"
                            value={formatDateForInput(formData.internship.endDate)}
                            onChange={(e) => setFormData({
                                ...formData,
                                internship: { ...formData.internship, endDate: e.target.value }
                            })}
                        />
                        </FormControl>
                        <FormControl id="salary" flex="1">
                        <FormLabel>Salary (€ per month):</FormLabel>
                        <Input value={formData.internship.salary} onChange={handleInputChange('internship', 'salary')}  />
                        </FormControl>
                        <FormControl id="number-of-days" flex="1">
                        <FormLabel>Duration (number of weeks):</FormLabel>
                        <Input value={formData.internship.duration} onChange={handleInputChange('internship', 'duration')}  />
                        </FormControl>
                    </HStack>
                </VStack>

                <HStack mt={4} justify="center">
                    {/* <Button colorScheme="red">DELETE</Button>
                    <Button colorScheme="teal">SAVE IN DRAFT</Button> */}
                    <Button colorScheme="blue" onClick={handleSubmit} >SAVE</Button>
                </HStack>

            </Box>
        </Flex>

    );
};


export default StudentAddNewInternshipC2;



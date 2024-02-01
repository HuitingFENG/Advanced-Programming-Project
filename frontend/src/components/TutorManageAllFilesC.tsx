// TutorViewAllFilesC

import React, { useContext, useEffect, useState } from 'react';
import { useDisclosure,Box,Flex,Table,Thead,Tbody,Tr,Th,Td,Button,Input,Text,IconButton,Container, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Badge, Heading, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon, DownloadIcon, ViewIcon } from "@chakra-ui/icons";
import { FaPrint } from 'react-icons/fa';


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



const TutorManageAllFilesC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [internships, setInternships] = useState<Internship[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFileContent, setSelectedFileContent] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editCommentDetails, setEditCommentDetails] = useState({ internshipId: 0, fileCategory: 0, comment: '' });



    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log("TEST user.promotion: ", `${user?.promotion}`);
            console.log("User ID from localStorage:", JSON.parse(storedUser)?.id);
        };
    }, []);

    useEffect(() => {
        if (user) {
            fetchInternships();
        }
    }, [user]); 

    const fetchInternships = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internship/tutor/${user?.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch internships');
            }
            const data = await response.json();
            setInternships(data);
        } catch (error) {
            console.error('Error fetching internships:', error);
        }
    };


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Search term before setState:", e.target.value);
        setSearchTerm(e.target.value);
        console.log("Filtered internships:", filteredInternships);
    };

    const handleViewFile = (fileContent: string | object) => {
        const contentAsString = typeof fileContent === 'string' ? fileContent : JSON.stringify(fileContent);
        setSelectedFileContent(contentAsString);
        setIsModalOpen(true);
    };


    // const filteredInternships = internships.filter(internship =>
    //     internship.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     internship.files.some(file =>
    //         file.type.toLowerCase().includes(searchTerm.toLowerCase()) &&
    //         file.category >= 1 && file.category <= 6
    //     )
    // ); 
    

    const filteredInternships = internships
    .filter((internship) =>
        internship.status === "Validated" && 
            (internship.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            internship.files.some(file =>
                file.type.toLowerCase().includes(searchTerm.toLowerCase()) &&
                file.category >= 1 && file.category <= 6 
            )
        )
    );



    const openEditCommentModal = (internshipId: number, fileCategory: number, currentComment: string) => {
        setEditCommentDetails({ internshipId, fileCategory, comment: currentComment });
        onOpen();
    };


    const saveComment = async () => {
        const { internshipId, fileCategory, comment } = editCommentDetails;
        console.log("TEST saveComment: ", internshipId, fileCategory, comment);
    
        try {
         
            const url = `${process.env.REACT_APP_BACKENDNODE_URL}/api/internship/${internshipId}/updateComment`;
            console.log("TEST url: ", url);
       
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileCategory: fileCategory, comment: comment })
            };
    
          
            const response = await fetch(
                url, requestOptions
                );
            console.log("TEST saveComment's response: ", response);

            if (response.ok) {
               
                await fetchInternships();
                alert("Comment saved successfully!");
                console.log("TEST ok saveComment.");
                onClose(); 
            } else {
                const errorMsg = await response.text();
                console.error("Error saving the comment: ", errorMsg);
                alert(`Failed to save the comment. Server responded with: ${errorMsg}`);
            }
        } catch (error) {
          
            console.error("Failed to save the comment", error);
            alert("An error occurred while saving the comment. Please try again.");
        }
    };
    

    const handleInvalidateFile = async (internshipId: number | undefined, fileCategory: number) => {
        try {
          const url = `${process.env.REACT_APP_BACKENDNODE_URL}/api/internship/${internshipId}/invalidateFile`;
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileCategory })
          });
      
          if (response.ok) {
            fetchInternships(); 
            alert("File invalidated successfully.");
          } else {
            alert("Failed to invalidate the file.");
          }
        } catch (error) {
          console.error("Error invalidating the file:", error);
          alert("Error invalidating the file.");
        }
      };
      


    return (

        <Container maxW="container.2xl" p={5} >
            <Box w="full" p={5} borderWidth="1px" borderRadius="lg">
                <Flex direction="column" overflowX="auto" gap={5}>
                    <Flex justifyContent="flex-end" mb={4} gap={5}>
                        <Button colorScheme="red">Not Finished</Button>
                        <Button colorScheme="green">Finished</Button>
                    </Flex>
                    <Heading mb={6} textAlign="center">Tutor Space</Heading>
                    <InputGroup mb={4}>
                        <Input placeholder="Type keyword..." value={searchTerm} onChange={handleSearchChange} />
                        <InputRightElement children={<IconButton aria-label="Search documents" icon={<SearchIcon />} />} />
                    </InputGroup>     
                    <Flex justify="center" align="center" flexDir="column" m={5}>
                        <Text fontSize="xl" mb={2}>Here, you can find all files related to internships. Different files have different levels. Normal level means that the document can be downloaded, copied (copy-paste), and printed. Sensitive level means that read-only online but prohibited to print, copy and download.</Text>
                        <Text color="red" >* Normal level: final report and CdC.</Text>
                        <Text color="red">* Sensitive level: All other files except final report and CdC.</Text>
                        <Text color="red">* If you decide to invalidate a student's file, please write a comment by clicking on the "EDIT COMMENT". Thanks.</Text>
                    </Flex>
                    <Table variant="simple">
                        <Thead>
                        <Tr>
                            <Th>Student Name</Th>
                            <Th>Student Email</Th>
                            <Th>Internship Type</Th>
                            <Th>File Type</Th>
                            <Th>File Status</Th>
                            <Th>Actions</Th>
                            <Th>Tutor's comments</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {filteredInternships.map((internship, internshipIndex) => {
                                return internship.files.map((file, fileIndex) => (
                                    <Tr key={`${internship.id}-${fileIndex}`}>
                                        <Td>{internship.student.firstName} {internship.student.lastName.toUpperCase()}</Td>
                                        <Td>{internship.student.email}</Td>
                                        <Td>{internship.type}</Td>
                                        <Td>{file.type}</Td>
                                        <Td>
                                            <Badge colorScheme={file.finished ? "green" : "red"}>
                                                {file.finished ? "Finished" : "Not Finished"}
                                            </Badge>
                                            {file.category <= 6 && file.finished && 
                                                <Button
                                                    size="sm"
                                                    colorScheme="red"
                                                    onClick={() => handleInvalidateFile(internship.id, file.category)}
                                                    isDisabled={!file.finished}
                                                    >
                                                    Invalidate
                                                </Button>
                                            }
                                        </Td>
                                        <Td>
                                            <Button size="sm" mr={2} leftIcon={<ViewIcon />} isDisabled={!file.finished} onClick={() => handleViewFile(file.content)} >View</Button>
                                            {file.confidential === 1 ? (
                                                <>
                                                    <Button size="sm" mr={2} leftIcon={<FaPrint />} isDisabled={!file.finished}
                                                        onClick={() => {
                                                            if (file.finished) {
                                                                const printWindow = window.open(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internship/download/${internship.id}/${file.category}`, '_blank');
                                                                printWindow!.addEventListener('load', () => {
                                                                    printWindow!.print();
                                                                }, { once: true });
                                                            }
                                                        }}
                                                    >Print</Button>
                                                    <Button size="sm" leftIcon={<DownloadIcon />} isDisabled={!file.finished} onClick={() => {
                                                        if (file.finished) {
                                                            window.location.href = `${process.env.REACT_APP_BACKENDNODE_URL}/api/internship/download/${internship.id}/${file.category}`
                                                        }
                                                    }} >Download</Button>
                                                </>
                                            ) : null}
                                        </Td>
                                        <Td> 
                                            <Button onClick={() => openEditCommentModal(internship.id!, file.category, file.message)}>Edit Comment</Button>
                                            {file.message}
                                        </Td>
                                    </Tr>
                                ));
                            })}
                        </Tbody>
                    </Table>
                </Flex>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ModalOverlay />
                    <ModalContent maxW="90vw" >
                        <ModalHeader>File Content</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody sx={{ userSelect: "none" }} onCopy={(e) => e.preventDefault()}>
                            {(() => {
                                try {
                                const parsedContent = JSON.parse(selectedFileContent);
                                if (Array.isArray(parsedContent)) {
                                    return parsedContent.map((item, index) => (
                                    <Box key={index} p={4} borderBottom="1px solid gray">
                                        <Text fontWeight="bold">{item.text}</Text>
                                        <Text mt={2}>{item.answer}</Text>
                                    </Box>
                                    ));
                                } else {
                                    return <Text>{JSON.stringify(parsedContent, null, 2)}</Text>;
                                }
                                } catch (e) {
                                return <Text>{selectedFileContent}</Text>;
                                }
                            })()}
                        </ModalBody> 

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>



      
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent maxW="50vw">
                        <ModalHeader>Edit Comment</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                value={editCommentDetails.comment}
                                onChange={(e) => setEditCommentDetails({ ...editCommentDetails, comment: e.target.value })}
                                placeholder="Enter your comment here"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={saveComment}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Box>
        </Container>
    );
}; 


export default TutorManageAllFilesC;


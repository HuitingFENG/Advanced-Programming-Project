// StudentViewAllFilesC

import { SearchIcon, DownloadIcon, ViewIcon } from "@chakra-ui/icons";
import React, { useState, useEffect, useContext }  from 'react';
import { Heading,InputGroup,InputRightElement,Box,Container,Flex,Input, IconButton, Thead,Tr,Td,Th,Text,Table,Tbody,Button } from "@chakra-ui/react";


const StudentViewAllFilesC = () => {
    const [linkPage, setLinkPage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const documents = [
        { year: '2020-2021', name: 'Self-evaluation form' },
        { year: '2020-2021', name: 'Self-evaluation form' },
        { year: '2020-2021', name: 'Self-evaluation form' },
        { year: '2020-2021', name: 'Self-evaluation form' },
    ];
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    const filteredDocuments = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container maxW="container.xl" p={5} >
            <Box w="full" p={5} borderWidth="1px" borderRadius="lg">
                <Flex direction="column" overflowX="auto" gap={5}>
                    <Heading mb={6} textAlign="center">Student Space</Heading>
                    <InputGroup mb={4}>
                        <Input
                        placeholder="Type keyword..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        />
                        <InputRightElement>
                        <IconButton
                            aria-label="Search documents"
                            icon={<SearchIcon />}
                            onClick={() => {/* Implement search functionality */}}
                        />
                        </InputRightElement>
                    </InputGroup>

                    <Text fontSize="sm" mb={2}>
                        From this page, you will find all files about your internships...
                    </Text>

                    <Table variant="simple">
                        <Thead>
                        <Tr>
                            <Th>Year</Th>
                            <Th>File</Th>
                            <Th>Actions</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        {filteredDocuments.map((doc, index) => (
                            <Tr key={index}>
                            <Td>{doc.year}</Td>
                            <Td>{doc.name}</Td>
                            <Td>
                                <Button size="sm" mr={2}>View</Button>
                                <Button size="sm">Download</Button>
                            </Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                </Flex>
            </Box>
        </Container>
    );
};

export default StudentViewAllFilesC;
    
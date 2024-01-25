// AdminManageDeadlinesC

import React, { useContext, useState } from 'react';
import { Box,Flex,Text,Button,Table,Thead,Tbody,Tr,Th,Td,VStack,HStack } from "@chakra-ui/react";
// AdminEditDeadlinesC

import AdminEditDeadlinesC from './AdminEditDeadlinesC';


const AdminManageDeadlinesC = () => {
    const [showViewEdit, setShowViewEdit] = useState(false);
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


            {/* <Box w="full" p={5} borderWidth="1px" borderRadius="lg"> */}
                <AdminEditDeadlinesC />
            {/* </Box> */}


        </Flex>
    );
}; 


export default AdminManageDeadlinesC;
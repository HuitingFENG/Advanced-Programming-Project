// AdminManageNotificationsC

import React, { useState } from 'react';
import { Box,Flex,Text,Button,Table,Thead,Tbody,Tr,Th,Td,Select } from "@chakra-ui/react";
import AdminEditNotificationsC from "./AdminEditNotificationsC";


const AdminManageNotificationsC = () => {
    const [showViewEdit, setShowViewEdit] = useState(false);

    const handleAddClick = () => {
        setShowViewEdit(true);
    };

    return (
        <Flex direction="column" p={5} w="80%" justify="center" align="center" maxW="960px" mx="auto">
            {/* <Box w="full" p={5} borderWidth="1px" borderRadius="lg" > */}
                {/* <Text fontSize="2xl" fontWeight="bold" textAlign="center"> ADMIN SPACE</Text> 

                <Table variant="simple">
                <Thead bg="blue.500">
                    <Tr>
                    <Th color="white">NAME</Th>
                    <Th color="white">PROMOTION</Th>
                    <Th color="white">TO</Th>
                    <Th color="white">ACTION</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                    <Td>L1 internship</Td>
                    <Td>2028</Td>
                    <Td>
                        <Select placeholder="Select target">
                        <option value="students">Students</option>
                        <option value="tutors">Tutors</option>
                        </Select>
                    </Td>
                    <Td>
                        <Button colorScheme="blue" size="sm">View / Edit</Button>
                        <Button colorScheme="green" size="sm" ml={2}>Validate</Button>
                        <Button colorScheme="red" size="sm" ml={2}>Remove</Button>
                    </Td>
                    </Tr>
                    <Tr>
                    <Td>L1 internship</Td>
                    <Td>2028</Td>
                    <Td>
                        <Select placeholder="Select target">
                        <option value="students">Students</option>
                        <option value="tutors">Tutors</option>
                        </Select>
                    </Td>
                    <Td>
                        <Button colorScheme="blue" size="sm">View / Edit</Button>
                        <Button colorScheme="green" size="sm" ml={2}>Validate</Button>
                        <Button colorScheme="red" size="sm" ml={2}>Remove</Button>
                    </Td>
                    </Tr>
                    <Tr>
                    <Td>L1 internship</Td>
                    <Td>2028</Td>
                    <Td>
                        <Select placeholder="Select target">
                        <option value="students">Students</option>
                        <option value="tutors">Tutors</option>
                        </Select>
                    </Td>
                    <Td>
                        <Button colorScheme="blue" size="sm">View / Edit</Button>
                        <Button colorScheme="green" size="sm" ml={2}>Validate</Button>
                        <Button colorScheme="red" size="sm" ml={2}>Remove</Button>
                    </Td>
                    </Tr>
                   
                </Tbody>
                </Table> */}

                {/* <Flex mt={4} justify="center" align="center" >
                <Button colorScheme="blue" onClick={handleAddClick}>Add</Button>
                </Flex> */}

                <AdminEditNotificationsC />
            {/* </Box> */}

            {/* {showViewEdit && <AdminEditNotificationsC />} */}

        </Flex>

    );
};

export default AdminManageNotificationsC;
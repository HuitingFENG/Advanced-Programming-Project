// AdminManageInternshipsC

import React, { useContext, useState } from 'react';
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon, Table, Thead, Tbody, Tr, Th, Td, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaSearch } from 'react-icons/fa';
import AdminViewEditC from './AdminViewEditC';


const AdminManageInternshipsC = () => {
    const [showViewEdit, setShowViewEdit] = useState(false);
    const currentPage = 1;
    const totalPages = 200; 

    const handleAddClick = () => {
        setShowViewEdit(true);
    };

    return (
        <Flex flexDir="column" gap={10} justify="center" align="center">
            <Flex width="80%" gap={10} justify="flex-end" align="center">
              <FaSearch size={24} color="grey"  />
              <Input 
                placeholder="Tape keyword..."
                // value={searchTerm}
                // onChange = {}
              />
            </Flex>

            <Flex width="80%" mb={-8} >
                <Text bgColor="blue.500" color="white" textAlign="center" p={3} width="100%" fontSize="2xl" fontWeight="bold">INTERNSHIPS</Text>
            </Flex>

            <Flex flexDir="row" gap={20} width="80%">
                
                <Flex flex="1" >
                    <Box overflowX="auto" overflowY="auto" maxH="1800px" w="100%">
                    <Table variant="simple" >
                        <Thead bg="blue.500" >
                        <Tr>
                            <Th color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }}>NAME</Th>
                            <Th color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }}>PROMOTION</Th>
                            <Th isNumeric color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >Student</Th>
                        </Tr>
                        </Thead> 
                        <Tbody>
                            <Tr>
                                <Td textAlign="center">L1 internship</Td>
                                <Td textAlign="center">2028</Td>
                                <Td textAlign="center">Student1</Td>
                            </Tr>
                            <Tr>
                                <Td textAlign="center">L2 internship</Td>
                                <Td textAlign="center">2027</Td>
                                <Td textAlign="center">Student2</Td>
                            </Tr>
                            <Tr>
                                <Td textAlign="center">M1 internship</Td>
                                <Td textAlign="center">2025</Td>
                                <Td textAlign="center">Student3</Td>
                            </Tr>

                        </Tbody>
                    </Table>
                    </Box>
                </Flex>

                <Flex flex="1.5" justifyContent="center" alignItems="center" >
                   
                    <Box overflowX="auto" overflowY="auto" maxH="1800px" w="100%">
                    <Table variant="simple"  style={{ width: '100%', tableLayout: 'fixed' }}>
                        <Thead bg="blue.500" >
                            <Tr width="100%">
                                <Th color="white" textAlign="center" colSpan={4}  backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500', minWidth: '300px' }}>ACTION</Th>
                            </Tr>
                        </Thead> 
                        <Tbody>
                            <Tr>
                                <Td textAlign="center" ><Button>View / Edit</Button></Td>
                                <Td textAlign="center" ><Button>Validate</Button></Td>
                                <Td textAlign="center" ><Button>Invalidate</Button></Td>
                                <Td textAlign="center" ><Button>Remove</Button></Td>
                            </Tr>
                            <Tr>
                                <Td textAlign="center" ><Button>View / Edit</Button></Td>
                                <Td textAlign="center" ><Button>Validate</Button></Td>
                                <Td textAlign="center" ><Button>Invalidate</Button></Td>
                                <Td textAlign="center" ><Button>Remove</Button></Td>
                            </Tr>
                            <Tr>
                                <Td textAlign="center" ><Button>View / Edit</Button></Td>
                                <Td textAlign="center" ><Button>Validate</Button></Td>
                                <Td textAlign="center" ><Button>Invalidate</Button></Td>
                                <Td textAlign="center" ><Button>Remove</Button></Td>
                            </Tr>
                            <Tr>
                                <Td textAlign="center" ><Button>View / Edit</Button></Td>
                                <Td textAlign="center" ><Button>Validate</Button></Td>
                                <Td textAlign="center" ><Button>Invalidate</Button></Td>
                                <Td textAlign="center" ><Button>Remove</Button></Td>
                            </Tr>
                        </Tbody>
                    </Table>
                    </Box>
                </Flex>
            </Flex>

            {/* Page Scroller */}
            <Flex justifyContent="center" alignItems="center" mt={4}>
                <Button disabled={currentPage <= 1}>{"<"}</Button>
                <Text mx={2}>
                    Page {currentPage} of {totalPages}
                </Text>
                <Button disabled={currentPage >= totalPages}>{">"}</Button>
            </Flex>

            {/* Add Button */}
            <Flex justifyContent="center" alignItems="center" mt={4}>
                <Button bgColor="#0C2340"  color="white" onClick={handleAddClick} >
                    <Text fontSize="xl" fontWeight="bold">Add</Text>
                </Button>
            </Flex>


            {showViewEdit && <AdminViewEditC />}

        </Flex>
    );

}; 

export default AdminManageInternshipsC;
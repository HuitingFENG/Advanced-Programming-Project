// AdminEditNotificationsC

import React from 'react';
import { Box,Flex,Text,Button,VStack,HStack,Select,Input,Textarea } from "@chakra-ui/react";


const AdminEditNotificationsC = () => {

    return (
        <Flex direction="column" p={5} w="full" maxW="960px" mx="auto">
            <Box w="full" p={5} borderWidth="1px" borderRadius="lg">
                <VStack spacing={4} align="stretch">
                
                <HStack justify="space-between">
                    <Box flex={1}>
                    <Text mb={2}>Promotion</Text>
                    <Select placeholder="Select promotion">
                        <option value="M1-2024">M1 - 2024</option>
                        {/* More options */}
                    </Select>
                    </Box>
                    
                    <Box flex={1}>
                    <Text mb={2}>To</Text>
                    <Select placeholder="Select target">
                        <option value="students">Students</option>
                        <option value="tutors">Tutors</option>
                        {/* More options */}
                    </Select>
                    </Box>
                </HStack>
                
                <Textarea placeholder="Message" />

                <HStack justify="space-between">
                    <Box flex={1}>
                    <Text mb={2}>Available date from</Text>
                    <Input type="date" />
                    <Select placeholder="Select time">
                        <option value="23:59">23:59</option>
                        {/* More options */}
                    </Select>
                    </Box>

                    
                    <Box flex={1}>
                    <Text mb={2}>to</Text>
                    <Input type="date" />
                    <Select placeholder="Select time">
                        <option value="23:59">23:59</option>
                        {/* More options */}
                    </Select>
                    </Box>
                    
                    
                </HStack>

                <HStack spacing={10} justify="center" align="center">
                    <Button colorScheme="gray">Save Draft</Button>
                    <Button colorScheme="blue">Save Definitively</Button>
                </HStack>
                
                </VStack>
            </Box>
            </Flex>
    );
};

export default AdminEditNotificationsC;
    
import React, { useState, useEffect, useContext }  from 'react';
import { Box,Flex, Button, FormControl, FormLabel,Input, Heading, VStack, HStack, Textarea, useColorModeValue } from "@chakra-ui/react";

const StudentAddNewInternshipC = () => {
    const bg = useColorModeValue('white', 'gray.700'); 

    return (
        <Flex>
            <Heading mb={6}>STUDENT SPACE</Heading>

            <VStack spacing={4} align="stretch">
                <Box>
                    <Heading size="md" mb={4}>Company</Heading>
                    <HStack spacing={4}>
                    <FormControl id="company-name">
                        <FormLabel>Company Name</FormLabel>
                        <Input placeholder="Company Name" />
                    </FormControl>
                    <FormControl id="company-address">
                        <FormLabel>Company Address</FormLabel>
                        <Input placeholder="Company Address" />
                    </FormControl>
                    </HStack>
                    <HStack spacing={4} mt={2}>
                    <FormControl id="city">
                        <FormLabel>City</FormLabel>
                        <Input placeholder="City" />
                    </FormControl>
                    <FormControl id="zip-code">
                        <FormLabel>ZIP Code</FormLabel>
                        <Input placeholder="ZIP Code" />
                    </FormControl>
                    </HStack>
                </Box>

                <Box>
                    <Heading size="md" mb={4}>Contact</Heading>
                    <HStack spacing={4}>
                    <FormControl id="tutor-name">
                        <FormLabel>Tutor's Name</FormLabel>
                        <Input placeholder="Tutor's Name" />
                    </FormControl>
                    <FormControl id="tutor-phone">
                        <FormLabel>Tutor's Phone number</FormLabel>
                        <Input placeholder="Tutor's Phone number" />
                    </FormControl>
                    <FormControl id="tutor-email">
                        <FormLabel>Tutor's Mail</FormLabel>
                        <Input placeholder="Tutor's Mail" />
                    </FormControl>
                    </HStack>
                </Box>

                <Box>
                    <Heading size="md" mb={4}>Internship</Heading>
                    <FormControl id="mission-description" mb={2}>
                    <FormLabel>Mission description</FormLabel>
                    <Textarea placeholder="Mission description" />
                    </FormControl>
                    <HStack spacing={4}>
                    <FormControl id="start-day">
                        <FormLabel>Start Day</FormLabel>
                        <Input placeholder="Start Day" />
                    </FormControl>
                    <FormControl id="end-day">
                        <FormLabel>End Day</FormLabel>
                        <Input placeholder="End Day" />
                    </FormControl>
                    <FormControl id="salary">
                        <FormLabel>Salary</FormLabel>
                        <Input placeholder="Salary" />
                    </FormControl>
                    <FormControl id="number-of-days">
                        <FormLabel>Number of days</FormLabel>
                        <Input placeholder="Number of days" />
                    </FormControl>
                    </HStack>
                </Box>

                <HStack spacing={4} justify="center">
                    <Button colorScheme="red">Delete</Button>
                    <Button colorScheme="blue">Save in Draft</Button>
                    <Button colorScheme="blue">Save</Button>
                </HStack>
            </VStack>
        </Flex>
    );
};


export default StudentAddNewInternshipC;
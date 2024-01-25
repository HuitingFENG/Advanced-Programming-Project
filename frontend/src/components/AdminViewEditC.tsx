// AdminViewEditC

import React from 'react';
import { Flex,FormControl,FormLabel,Input,Textarea,Select,Button,Heading,VStack,HStack,Box } from "@chakra-ui/react";

const AdminViewEditC = () => {
  return (
    <Flex direction="column" p={8} align="center" w="80%" justify="center">
      <Box w="full" p={5} borderWidth="1px" borderRadius="lg">
        <Heading size="lg" mb={6} textAlign="center">ADMIN SPACE</Heading>

        <VStack spacing={4} align="flex-start">
          <FormControl id="internship-name">
            <FormLabel>INTERNSHIP NAME:</FormLabel>
            <Input placeholder="Stage ouvrier" />
          </FormControl>

          <FormControl id="internship-subject">
            <FormLabel>INTERNSHIP SUBJECT:</FormLabel>
            <Select>
    
              <option value="option1">Option 1</option>
            </Select>
          </FormControl>

          <FormControl id="promotion">
            <FormLabel>PROMOTION:</FormLabel>
            <Select placeholder="Select promotion">
              <option value="2028">2028</option>
      
            </Select>
          </FormControl>

          <FormControl id="class">
            <FormLabel>CLASS # (All):</FormLabel>
            <Select placeholder="Select class">
              <option value="1">1</option>
        
            </Select>
          </FormControl>

          <FormControl id="class">
            <FormLabel>PRIVATE MESSAGE TO TUTOR:</FormLabel>
            <Textarea placeholder="Set private notifications to tutor" size="sm" />
          </FormControl>

          <FormControl id="class">
            <FormLabel>PRIVATE MESSAGE TO STUDENT:</FormLabel>
            <Textarea placeholder="Set private notifications to student" size="sm" />
          </FormControl>

          

          {/* Company Information Section */}
          <HStack w="full" justify="space-between">
            <FormControl id="company-name" flex="1">
              <FormLabel>Company Name:</FormLabel>
              <Input placeholder="Company Name" />
            </FormControl>
            <FormControl id="company-address" flex="1">
              <FormLabel>Company Address:</FormLabel>
              <Input placeholder="Address" />
            </FormControl>
            <FormControl id="company-city" flex="1">
              <FormLabel>City:</FormLabel>
              <Input placeholder="Address" />
            </FormControl>
            <FormControl id="company-zipcode" flex="1">
              <FormLabel>Zip Code:</FormLabel>
              <Input placeholder="Address" />
            </FormControl> 
          </HStack>
        {/* </VStack> */}

         {/* Contact Information Section */}
         <HStack w="full" justify="space-between">
            <FormControl id="tutor-name" flex="1">
              <FormLabel>Tutor Name:</FormLabel>
              <Input placeholder="Tutor Name" />
            </FormControl>
            <FormControl id="tutor-phone-number" flex="1">
              <FormLabel>Tutor's Phone number:</FormLabel>
              <Input placeholder="Tutor's Phone number" />
            </FormControl>
            <FormControl id="tutor-mail" flex="1">
              <FormLabel>Tutor's Mail:</FormLabel>
              <Input placeholder="tutor's mail" />
            </FormControl>
          </HStack>

          <FormControl id="class">
            <FormLabel>Mission Description</FormLabel>
            <Textarea placeholder="Mission Description..." size="sm" />
          </FormControl>


          <HStack w="full" justify="space-between">
            <FormControl id="start-date" flex="1">
              <FormLabel>Start Date</FormLabel>
              <Input placeholder="Start Date" />
            </FormControl>
            <FormControl id="end-date" flex="1">
              <FormLabel>End Date</FormLabel>
              <Input placeholder="End Date" />
            </FormControl>
            <FormControl id="salary" flex="1">
              <FormLabel>Salary</FormLabel>
              <Input placeholder="salary" />
            </FormControl>
            <FormControl id="number-of-days" flex="1">
              <FormLabel>Number of days</FormLabel>
              <Input placeholder="Number of days" />
            </FormControl>
          </HStack>

        </VStack>

        {/* Action Buttons */}
        <HStack mt={4} justify="center">
          <Button colorScheme="red">DELETE</Button>
          <Button colorScheme="teal">SAVE IN DRAFT</Button>
          <Button colorScheme="blue">SAVE</Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default AdminViewEditC;

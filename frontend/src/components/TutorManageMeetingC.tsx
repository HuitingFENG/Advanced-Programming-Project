// TutorManageMeetingC


import React, { useContext, useState } from 'react';
import { Box,Flex,Table,Thead,Tbody,Tr,Th,Td,Button,Text,Container,Radio,RadioGroup,Stack } from "@chakra-ui/react";
  

const TutorManageMeetingC = () => {
    const meetings = [
        { year: "2022 - 2023", student: "Student1", type: "Defense", dateLocation: ["04/31/2024 At school", "03/31/2024 At company", "03/31/2024 Visio"] },
        { year: "2022 - 2023", student: "Student1", type: "visite", dateLocation: ["04/31/2024 At school", "03/31/2024 At company", "03/31/2024 Visio"] },
        { year: "2022 - 2023", student: "Student1", type: "Defense", dateLocation: ["04/31/2024 At school", "03/31/2024 At company", "03/31/2024 Visio"] },
        { year: "2022 - 2023", student: "Student1", type: "visite", dateLocation: ["04/31/2024 At school", "03/31/2024 At company", "03/31/2024 Visio"] },
        { year: "2022 - 2023", student: "Student1", type: "Defense", dateLocation: ["04/31/2024 At school", "03/31/2024 At company", "03/31/2024 Visio"] },
      ];


    return (
        // <Flex direction="column" p={5} w="full" maxW="1200px" mx="auto">
        //     <Text>TutorManageMeetingC</Text>
        // </Flex>
        <Container maxW="container.2xl" p={5} mt={20}>
            

            <Flex direction="column" overflowX="auto">
                <Text fontSize="4xl" fontWeight="bold" mb={4} textAlign="center" >TUTOR SPACE</Text>
                <Table variant="striped" colorScheme="teal" size="sm">
                <Thead>
                    <Tr>
                    <Th>Years</Th>
                    <Th>Student</Th>
                    <Th>Meeting Type</Th>
                    <Th>Date1 + Location1</Th>
                    <Th>Date2 + Location2</Th>
                    <Th>Date3 + Location3</Th>
                    <Th>Final Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {meetings.map((meeting, index) => (
                    <Tr key={index}>
                        <Td>{meeting.year}</Td>
                        <Td>{meeting.student}</Td>
                        <Td>{meeting.type}</Td>
                        {meeting.dateLocation.map((dateLoc, i) => (
                        <Td key={i}>
                            <RadioGroup defaultValue="2">
                            <Stack spacing={5} direction="row">
                                <Radio colorScheme="blue" value={i.toString()}>
                                {dateLoc}
                                </Radio>
                            </Stack>
                            </RadioGroup>
                        </Td>
                        ))}
                        <Td>
                        <Button colorScheme="blue" mr={3}>Save</Button>
                        <Button colorScheme="red">Reject all</Button>
                        </Td>
                    </Tr>
                    ))}
                </Tbody>
                </Table>
                <Flex justifyContent="center" my={4}>
                <Button>{"<"}</Button>
                {/* Page numbers would be rendered dynamically here */}
                <Text mx={2}>Page 1 of 5</Text>
                <Button>{">"}</Button>
                </Flex>
            </Flex>
        </Container>
    );
}; 


export default TutorManageMeetingC;
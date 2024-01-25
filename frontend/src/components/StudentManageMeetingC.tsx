import React, { useState, useEffect, useContext }  from 'react';
import { Box,Flex,Heading,Text,Button,FormControl,FormLabel,Input,Radio,RadioGroup,Stack,Select,HStack,Container } from "@chakra-ui/react";


type DateKeys = 'date1' | 'date2' | 'date3';
type LocationKeys = 'location1' | 'location2' | 'location3';

const StudentManageMeetingC = () => {
    const [meetingType, setMeetingType] = useState('');
    const [dates, setDates] = useState<{ [key in DateKeys]: string }>({ date1: '', date2: '', date3: '' });
    const [locations, setLocations] = useState<{ [key in LocationKeys]: string }>({ location1: '', location2: '', location3: '' });

    const handleDateChange = (dateNumber: DateKeys, value: string) => {
        setDates({ ...dates, [dateNumber]: value });
    };

    const handleLocationChange = (locationNumber: LocationKeys, value: string) => {
        setLocations({ ...locations, [locationNumber]: value });
    };

    const handleSubmit = () => {
        console.log({ meetingType, dates, locations });
    };


    return (
        <Container maxW="container.xl" p={5} >
            <Box w="full" p={5} borderWidth="1px" borderRadius="lg">
                <Flex justify="center" align="center" flexDir="column">
                    <Heading mb={4} >Meeting</Heading>
                    <Text fontSize="sm" mb={2} textColor="red" >
                        DEADLINE OF DEFENSE: 02/31/2024 00:00:00
                    </Text>
                    <Box w="full" maxWidth="1000px">
                        <FormControl mb={4}>
                            <FormLabel>Meeting Type:</FormLabel>
                            <Select placeholder="Select meeting type" onChange={(e) => setMeetingType(e.target.value)}>
                                <option value="visit">Visit</option>
                                <option value="defense">Defense</option>
                            </Select>
                        </FormControl>
                        {(Object.keys(dates) as DateKeys[]).map((dateKey, index) => (
                            <HStack key={dateKey} mb={4}>
                                <FormControl>
                                    <FormLabel>Date {index + 1}</FormLabel>
                                    <Input
                                        type="date"
                                        value={dates[dateKey]}
                                        onChange={(e) => handleDateChange(dateKey, e.target.value)}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Location {index + 1}</FormLabel>
                                    <RadioGroup onChange={(value) => handleLocationChange(`location${index + 1}` as LocationKeys, value)}>
                                        <Stack direction="row">
                                        <Radio value="school">At School</Radio>
                                        <Radio value="company">At Company</Radio>
                                        <Radio value="visio">Visio</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                            </HStack>
                        ))}
                        <Flex justify="center">
                            <Button colorScheme="blue" onClick={handleSubmit}>Submit</Button>
                        </Flex>
                    </Box>
                </Flex>
            </Box>

        </Container>




    );
};


export default StudentManageMeetingC;
// TutorFillFinalC

import React, { useContext, useState } from 'react';
import {VStack,HStack,FormControl,FormLabel,Radio,RadioGroup,Stack,Button,Textarea,Text,Box,Heading,Container} from "@chakra-ui/react";


const TutorFillFinalC = () => {

    return (
        // <Flex direction="column" p={5} w="full" maxW="1200px" mx="auto">
        //     <Text>TutorFillFinalC</Text>
        // </Flex>

        <Container maxW="container.xl" p={5}>
            <Box p={5} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <VStack spacing={5} align="stretch">
                <Heading as="h1" size="lg" textAlign="center" >Final Evaluation Form</Heading>

                <Text fontWeight="bold">Student</Text>
                <Text>Sylvain MIGEON</Text>
                <Text>M1 Promotion 2024</Text>

                <FormControl id="punctuality">
                    <FormLabel>PONCTUALITE AU TRAVAIL</FormLabel>
                    <HStack>
                    <RadioGroup defaultValue="NotApplicable">
                        <Stack direction="row">
                        <Radio value="Yes">Oui</Radio>
                        <Radio value="No">Non</Radio>
                        </Stack>
                    </RadioGroup>
                    </HStack>
                    <Textarea placeholder="Comment" />
                </FormControl>

                <FormControl id="global-evaluation">
                    <FormLabel>EVALUATION GLOBALE</FormLabel>
                    <Textarea placeholder="Points forts et points faibles de ce stagiaire" />
                </FormControl>

                <FormControl id="observation">
                    <FormLabel>OBSERVATION</FormLabel>
                    <Textarea placeholder="Observations" />
                </FormControl>

                <Text color="red.500" alignSelf="center">* All the fields should be completed!</Text>

                <HStack justify="center" w="full">
                    <Button colorScheme="gray">Cancel</Button>
                    <Button colorScheme="teal">Save in Draft</Button>
                    <Button colorScheme="blue">Save</Button>
                </HStack>
                </VStack>
            </Box>
        </Container>


    );
}; 


export default TutorFillFinalC;
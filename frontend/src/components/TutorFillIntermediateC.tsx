// TutorFillIntermediateC

import React, { useContext, useState } from 'react';
import { Box,VStack,FormControl,FormLabel,Textarea,Radio,RadioGroup,Stack,Button,Heading,Container,Text, } from "@chakra-ui/react";


const TutorFillIntermediateC = () => {

    return (
        // <Flex direction="column" p={5} w="full" maxW="1200px" mx="auto">
        //     <Text>TutorFillIntermediateC</Text>
        // </Flex>

        <Container maxW="container.xl" p={5} >
            <Box p={5} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <VStack spacing={5} align="stretch">
                    <Heading as="h1" size="lg" textAlign="center" p={10}>Intermediate Evaluation Form</Heading>

                    <Box p={5} shadow="md" borderWidth="1px">
                    <Heading size="md">Student</Heading>
                    <Text mb={4}>Sylvain MIGEON</Text>
                    <Text>M1 Promotion 2024</Text>
                    </Box>

                    <FormControl id="punctuality" as="fieldset" gap="10">
                    <FormLabel as="legend">1. PONCTUALITE AU TRAVAIL</FormLabel>
                    <Text>1.1 Le stagiaire s’est-il informé de lui-même des horaires à respecter ?</Text>
                    <RadioGroup defaultValue="NotApplicable">
                        <Stack direction="row">
                        <Radio value="Yes">Oui</Radio>
                        <Radio value="No">Non</Radio>
                        </Stack>
                    </RadioGroup>
                    <Textarea placeholder="Comments" mt={2} />
                  
                    <Text>1.2 Est-il ponctuel ?</Text>
                    <RadioGroup defaultValue="NotApplicable">
                        <Stack direction="row">
                        <Radio value="Yes">Oui</Radio>
                        <Radio value="No">Non</Radio>
                        </Stack>
                    </RadioGroup>
                    <Textarea placeholder="Comments" mt={2} />
                    </FormControl>

                    <FormControl id="global-evaluation" as="fieldset">
                    <FormLabel as="legend">2. EVALUATION GLOBALE</FormLabel>
                    <Text>2.1 Quels sont d’après-vous les points forts et les points faibles de ce stagiaire ?</Text>
                    <Textarea placeholder="Quels sont d’après-vous les points forts et les points faibles de ce stagiaire ?" />
                    <Text>2.2 D'autres commentaires ?</Text>
                    <Textarea placeholder="D'autres commentaires ?" />
                    </FormControl>

                    <FormControl id="observation" as="fieldset">
                    <FormLabel as="legend">3. OBSERVATIONS</FormLabel>
                    <Textarea placeholder="Observations" />
                    </FormControl>

                    <Text color="red.500" textAlign="center">* All the fields should be completed!</Text>

                    <Stack direction="row" justify="center">
                    <Button colorScheme="gray">Cancel</Button>
                    <Button colorScheme="blue">Save in Draft</Button>
                    <Button colorScheme="blue">Save</Button>
                    </Stack>
                </VStack>
            </Box>
        </Container>
    );
}; 


export default TutorFillIntermediateC;
import React, { useState, useEffect, useContext }  from 'react';
import { Box,Flex,Text,Button,FormControl,FormLabel,Heading,Select,VStack,useToast,Center,Divider,HStack } from "@chakra-ui/react";
import { AttachmentIcon } from '@chakra-ui/icons';

const StudentUploadFilesC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileType, setFileType] = useState('');
    const toast = useToast();

    const handleFileChange = (selectedFile: File) => {
      if (selectedFile) {
        setFile(selectedFile);
      }
    };
  
    const handleUpload = () => {
      toast({
        title: "File uploaded.",
        description: "Your file has been uploaded successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    };

    return (
        <Center p={10} flexDirection="column">
            <Box
                borderWidth="2px"
                borderRadius="lg"
                p={6}
                w="4xl"
                boxShadow="lg"
                borderColor="gray.200"
            >
                <VStack spacing={4}>
                <Heading size="md">Document</Heading>
                <Text fontSize="sm" textAlign="center" color="red">
                    DEADLINE OF CdC: 12/10/2023 00:00:00
                    <br />
                    DEADLINE OF FINAL REPORT: 12/31/2023 00:00:00
                </Text>
                <Divider />
                <Box
                    p={6}
                    borderWidth="2px"
                    borderRadius="lg"
                    borderColor="gray.300"
                    w="full"
                    textAlign="center"
                    _hover={{ bg: "gray.50" }}
                    cursor="pointer"
                >
                    <AttachmentIcon mx="auto" boxSize={12} />
                    <Text mt={2}>Drag and drop here or Browse</Text>
                </Box>
                <Text fontSize="sm">File: please select a pdf file.</Text>
                <HStack w="full" justifyContent="space-between">
                    <Button variant="outline">Browse</Button>
                    <Select placeholder="CdC/FINAL REPORT" onChange={(e) => setFileType(e.target.value)}>
                    <option value="cdc">CdC</option>
                    <option value="final-report">FINAL REPORT</option>
                    </Select>
                    <Button colorScheme="blue" onClick={handleUpload}>Upload</Button>
                </HStack>
                <HStack w="full" justifyContent="space-between">
                    <Button variant="solid" colorScheme="red">Cancel</Button>
                    <Button variant="solid" colorScheme="blue">Save in Draft</Button>
                    <Button variant="solid" colorScheme="green">Save</Button>
                </HStack>
                </VStack>
            </Box>
        </Center>
    );
};

export default StudentUploadFilesC;

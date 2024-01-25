// AdminViewAllStatusC

import React from 'react';
import { Box,Flex,Table,Thead,Tbody,Tr,Th,Td,Button,Container,Text } from "@chakra-ui/react";

const AdminViewAllStatusC = ()  => {

    const data = [
        { group: 'M2', name: 'NON', cdc: 'OUI', fichevisite: 'OUI', sondageweb: 'NON', rapportrendu: 'OUI' },
        { group: 'M1', name: 'NON', cdc: 'OUI', fichevisite: 'OUI', sondageweb: 'NON', rapportrendu: 'OUI' },
        { group: 'L3', name: 'NON', cdc: 'OUI', fichevisite: 'OUI', sondageweb: 'OUI', rapportrendu: 'OUI' },
        { group: 'L2', name: 'NON', cdc: 'OUI', fichevisite: 'OUI', sondageweb: 'NON', rapportrendu: 'OUI' },
        { group: 'L1', name: 'NON', cdc: 'OUI', fichevisite: 'NON', sondageweb: 'NON', rapportrendu: 'OUI'  },
      ];
    
      return (
        <Container maxW="container.xl" p={5} mt={10} >
          <Flex direction="column" overflowX="auto" justify="center" align="center">
            <Table variant="striped" colorScheme="teal" size="sm">
              <Thead>
                <Tr>
                  <Th>Gr</Th>
                  <Th>NOM</Th>
                  <Th>CdC</Th>
                  <Th>FICHE VISITE</Th>
                  <Th>SONDAGE WEB</Th>
                  <Th>RAPPORT RENDU</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.group}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.cdc}</Td>
                    <Td>{item.fichevisite}</Td>
                    <Td>{item.sondageweb}</Td>
                    <Td>{item.rapportrendu}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            
            {/* Page navigation */}
            <Flex justifyContent="center" my={10} >
              <Button size="sm" mr={2}>&lt;</Button>
              <Text mx={2}>Page 1 of 5</Text>
              <Button size="sm">&gt;</Button>
            </Flex>
            

          </Flex>
        </Container>
      );

};


export default AdminViewAllStatusC;
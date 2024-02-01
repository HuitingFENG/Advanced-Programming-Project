// TutorManageInternshipsC

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Box,Flex,Table,Thead,Tbody,Tr,Th,Td,Button,Text,Badge,Container, HStack, useToast } from "@chakra-ui/react";
import TutorManageMeetingC from './TutorManageMeetingC';
import TutorFillC from './TutorFillC';

interface Question {
    id: number;
    text: string;
    type: 'text' | 'range' | 'binary';
}

interface Questions {
[key: string]: Question;
}

// intermedaite evaluation form : 1-5 (5 is the best)
const questionForm1 : Questions = {
q1: { id: 1, text: "L'étudiant(e) a-t-il (elle) bien compris et débuté sa mission en entreprise (objectifs, contenu de la mission, planning de réalisation) ?", type: 'range'},
q2: { id: 2, text: "Commentaire", type: 'text'},
q3: { id: 3, text: "L'étudiant(e) s'adapte-t-il (elle) aux pratiques et à la culture d'entreprise (tenue, savoir être, ponctualité, intégration dans l'équipe) ?", type: 'range'},
q4: { id: 4, text: "Commentaire", type: 'text'},
q5: { id: 5, text: "L'étudiant(e) a-t-il (elle) pris connaissance des méthodes de travail de l'entreprise ?", type: 'range'}, 
q6: { id: 6, text: "Commentaire", type: 'text'},
q7: { id: 7, text: "L'étudiant(e) s'intègre-t-il (elle) dans l’équipe ?", type: 'range' },
q8: { id: 8, text: "Commentaire", type: 'text'},
q9: { id: 9, text: "L'étudiant(e) fait-il (elle) preuve de suffisamment de rigueur et de professionnalisme ?", type: 'range' },
q10: { id: 10, text: "Commentaire", type: 'text'},
q11: { id: 11, text: "L'étudiant(e) a-t-il (elle) adopté un comportement satisfaisant dans ses relations hiérarchiques et ses relations avec ses collègues ?", type: 'range' },
q12: { id: 12, text: "Commentaire", type: 'text'},
q13: { id: 13, text: "Observations, attentes particulières du Tuteur Entreprise", type: 'text' },
q14: { id: 14,  text: "Aviez-vous déjà une expérience de l'alternance en tant que Tuteur Entreprise ?", type: 'binary'},
q15: { id: 15, text: "Commentaire" , type: 'text' },
q16: { id: 16, text: "Avez-vous déjà suivi une formation de Tuteur Entreprise ?", type: 'binary'},
q17: { id: 17, text: "Commentaire", type: 'text' },
};

// final evaluation form : 1-5 (5 is the best)
const questionForm2 : Questions = {
q1: { id: 1, text: "Identifier les différents rôles au sein d’une équipe dont on ne connaît pas les membres et interagir pour favoriser le travail d’équipe, la motivation, et la fixation d’objectifs. Mobiliser pour cela de manière efficace les outils de communication interpersonnelle", type: 'range'},
q2: { id: 2, text: "Comprendre une stratégie de fonctionnement efficace de l’équipe (organisation, fonctionnement, réunion, gestion de conflit ...)", type: 'range'},
q3: { id: 3, text: "Identifier le type de management en se basant sur des éléments caractérisant la culture d’entreprise principalement les valeurs (explicites et implicites) et la structure de pouvoir", type: 'range'},
q4: { id: 4, text: "Intégrer les enjeux sociaux du RSE en les appliquant dans les pratiques professionnelles (ex : parité, inclusion, éthique, SST - Santé, Sécurité au Travail, etc.)", type: 'range'},
q5: { id: 5, text: "Intégrer les enjeux environnementaux du RSE en les appliquant dans les pratiques professionnelles (ex : bilan carbone, circuit court, impact de l'IT et du numérique, etc.)", type: 'range'},
q6: { id: 6, text: "Identifier les clients et les sous-traitants en repectant les aspects d'économie responsable et éthique", type: 'range'},
q7: { id: 7, text: "Intégrer la dimension internationale dans son environnement de travail (ex : collègues ou partenaires non-français, clients ou fournisseurs à l'international, etc.)", type: 'range' },
q8: { id: 8, text: "Respecter ou mettre en œuvre une méthodologie de gestion de projet", type: 'range'},
q9: { id: 9, text: "Produire des rapports écrits, de présentations et/ou de reporting de qualité professionnelle", type: 'range' },
q10: { id: 10, text: "Participer activement aux rituels récurrents communs à toute l'équipe : réunions, activités de suivi…", type: 'range'},
q11: { id: 11, text: "Adapter sa communication en fonction de ou des interlocuteurs", type: 'range' },
q12: { id: 12, text: "Superviser ou participer activement à la supervision de l'utilisation de la solution", type: 'range'},
q13: { id: 13, text: "Gérer les ressources matérielles ou logicielles", type: 'range' },
q14: { id: 14,text: "Faire évoluer en fonctionnalités et en performances, corriger les anomalies", type: 'range'},
q15: { id: 15,text: "Mettre en œuvre la politique de sécurité et de performance", type: 'range' },
q16: { id: 16,text: "Assurer l'accompagnement et/ou la formation des utilisateurs / mettre en place du support", type: 'range'},
q17: { id: 17, text: "Anticiper les anomalies pour maintenir un système en conditions opérationnelles", type: 'range' },
q18: { id: 18,text: "Optimiser performances, évolutivité et coûts en respectant des critères de qualités et en minimisant l'impact environnemental", type: 'range'},
q19: { id: 19,text: "Intégrer les composants en prenant en compte la compatibilité des modules existants et nouveaux afin d'assurer l’intégrité du système, son interopérabilité et la sécurité de l’information", type: 'range' },
q20: { id: 20,text: "Automatiser les tests en conformité avec les standards internes, externes, nationaux ou internationaux : ce qui inclut les normes de santé, de sécurité, d’utilisabilité, de performance, de fiabilité et de compatibilité", type: 'range'},
q21: { id: 21, text: "Mettre en place un workflow de production de la documentation en intégrant des outils d'automatisation", type: 'range' },
q22: { id: 22, text: "Produire les supports nécessaires à la formation des utilisateurs", type: 'range'},
q23: { id: 23, text: "Automatiser le déploiement de la solution en prenant en compte l'hétérogénéité des utilisateurs et des configurations de l'environnement cible", type: 'range' },
q24: { id: 24,text: "Evaluer, comparer (benchmark) et sélectionner les modules et/ou services à mettre en œuvre en prenant en compte les contraintes techniques (interopérabilité, adaptabilité, facilité d’utilisation, performances et sécurité) économiques (coût, temps) et humaines (compétences)", type: 'range'},
q25: { id: 25,text: "Démontrer la faisabilité technique", type: 'range' },
q26: { id: 26,text: "Intégrer les notions de sécurité et de fiabilité dans la conception", type: 'range'},
q27: { id: 27, text: "Identifier les possibilités d'évolution des besoins", type: 'range' },
q28: { id: 28,text: "Intégrer des nouvelles technologies dès la conception", type: 'range'},
q29: { id: 29,text: "Construire des maquettes ou des POC (proof of concept) afin de démontrer la pertinence d'une solution en termes d'usages et de fonctionnalités", type: 'range' },
q30: { id: 30,text: "Identifier les avantages et les améliorations que procure l’adoption de certaines nouvelles technologies", type: 'range'},
q31: { id: 31,text: "Rédiger et élaborer un cahier des charges de manière autonome, en respectant les normes, lois et règles d'usage", type: 'range'},
q32: { id: 32,text: "Analyser et formaliser les processus métiers", type: 'range'},
q33: { id: 33,text: "Optimiser l'expression des caractéristiques fonctionnelles en prenant en compte le système dans son ensemble", type: 'range'},
q34: { id: 34,text: "Exprimer/traduire les besoins en exigences fonctionnelles et non fonctionnelles", type: 'range'},
q35: { id: 35,text: "Anticiper la maintenabilité des systèmes numériques dans le respect de l'environnement", type: 'range'},
q36: { id: 36,text: "Estimer l'impact environnemental potentiel d'une solution répondant au besoin", type: 'range'},
q37: { id: 37,text: "Situer le besoin dans une perspective d'innovation", type: 'range'},
q38: { id: 38,text: "Estimer les impacts d'un projet du domaine du numérique", type: 'range'},
};

interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: string;
    telephone: string;
    oldPassword: string;
    promotion: number;
    year: string;
    company: {
        name: string;
        address: string;
        city: string;
        zipCode: string;
    };
};

interface Student {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: string;
    telephone: string;
    oldPassword: string;
    promotion: number;
    year: string;
    company: {
        name: string;
        address: string;
        city: string;
        zipCode: string;
    };
};


interface Internship {
    id?: number;
    duration: number;
    type: string;
    jobTitle: string;
    mission: string;
    salary: number;
    startDate: Date | string;
    endDate: Date | string;
    studentID?: number;
    tutorID: number;
    meetingList: {
        type: string;
        date: string;
        location: string;
        finished: boolean;
        deadline: "";
    }[];
    files: [
        {category: 1, type: "final report", content: [], confidential: 1, finished: false, deadline: "", message: ""}, 
        {category: 2, type: "CdC", content: [], confidential: 1, finished: false, deadline: "", message: ""},
        {category: 3, type: "fiche visit", content: [], confidential: 0, finished: false, deadline: "", message: ""},
        {category: 4, type: "first self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
        {category: 5, type: "second self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
        {category: 6, type: "third self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
        {category: 7, type: "intermediate evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
        {category: 8, type: "final evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
    ];
    status: string;
    student: {
        id?: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        type: string;
        telephone: string;
        oldPassword: string;
        promotion: number;
        year: string;
        company: {
            name: string;
            address: string;
            city: string;
            zipCode: string;
        };
    }[];
};




const TutorManageInternshipsC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [internshipData, setInternshipData] = useState<Internship[] | null >(null);
    const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
    const [selectedInternshipFileCategory, setSelectedInternshipFileCategory] = useState(0);
    const [selectedInternshipFileType, setSelectedInternshipFileType] = useState('');
    const [selectedInternshipFileDeadline, setSelectedInternshipFileDeadline] = useState('');
    const [selectedInternshipMeetingType, setSelectedInternshipMeetingType] = useState('');
    const [formButtonClick, setFormButtonClick] = useState(false);
    const [meetingButtonClick, setMeetingButtonClick] = useState(false);
    const toast = useToast();


    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
          setUser(JSON.parse(storedUser));
          console.log("User ID from localStorage:", JSON.parse(storedUser)?.id);
      };
    }, []);

    useEffect(() => {
        if (user && user.id) {
            console.log("TEST user.id: ", user.id);
            fetchAllData(); 
        }
    }, [user, toast]);

    useEffect(() => {
        console.log("Updated Internship Data: ", internshipData);
    }, [internshipData]); 
    

    const fetchStudentInfo = async (studentID: any) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/user/${studentID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch student data');
            }
            const studentDataJSON = await response.json();
            console.log("Student Data JSON: ", studentDataJSON);
            return studentDataJSON; 
        } catch (error) {
            console.error('Error fetching student data:', error);
            return null; 
        }
    };
    

    
    
  


    const fetchAllData = useCallback( async () => {
        console.log("TEST fetchAllData...");
        try {

            const internshipResponse = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/internship/tutor/${user?.id}`, {
                method: 'GET', headers: { 'Content-Type': 'application/json',},});
            if (!internshipResponse.ok) {throw new Error('Failed to fetch internship data');}
            const internshipDataJSON = await internshipResponse.json();
            console.log("TEST internshipDataJSON: ", internshipDataJSON);
            const internshipsWithStudentData = [];


            // filter those pending or invalidated internships
            for (const internship of internshipDataJSON) {
                // const studentID = internship.studentID;
                // const studentData = await fetchStudentInfo(studentID);
                // const internshipWithStudent = {
                //     ...internship,
                //     student: studentData,
                // };
                // internshipsWithStudentData.push(internshipWithStudent);

                // Check if the internship's status is "Validated"
                if (internship.status === "Validated") {
                    const studentID = internship.studentID;
                    const studentData = await fetchStudentInfo(studentID);
                    const internshipWithStudent = {
                        ...internship,
                        student: studentData,
                    };
                    internshipsWithStudentData.push(internshipWithStudent);
                }
            }
            console.log("Internships with Student Data: ", internshipsWithStudentData);
            setInternshipData(internshipsWithStudentData);
            console.log("TEST setInternshipData(internshipsWithStudentData): ", internshipData);

            if (internshipDataJSON && internshipDataJSON.length > 0) {
                const fileListIDs = internshipDataJSON.map((internship: { fileListID: any; }) => internship.fileListID);
                console.log('File List IDs:', fileListIDs);
            }

          } catch (error) {
            toast({
              title: 'Error',
              description: 'Failed to fetch data',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            console.error('Error fetching data:', error);
          }
    }, [user?.id, toast]);



  
    const handleButtonClick = (internship: Internship, fileCategory: number, fileType: string, fileDeadline: string) => {
        setSelectedInternship(internship);
        setSelectedInternshipFileCategory(fileCategory);
        setSelectedInternshipFileType(fileType);
        setSelectedInternshipFileDeadline(fileDeadline);
        setFormButtonClick(true);
    };
      

    const handleMeetingButtonClick = ( internship: Internship, meetingType: string, meetingDate: string, meetingLocation: string  ) => {
        setSelectedInternship(internship);
        setSelectedInternshipMeetingType(meetingType);
        setMeetingButtonClick(true);
    };



    const handleFormSubmissionSuccess = useCallback(() => {
        fetchAllData();
        setSelectedInternship(null);
    }, [fetchAllData]);

    
    const handleMeetingSubmissionSuccess = useCallback( () => {
        fetchAllData();
        setSelectedInternship(null);
    }, [fetchAllData]);


    if (!user || !internshipData) {
        return <div>Loading...</div>;
    }



    return (
        <Container maxW="container.2xl" p={5}>
            <Box overflowX="auto" p={5} borderWidth="1px" borderRadius="lg"  overflow="hidden">
                <Flex justifyContent="flex-end" mb={4} gap={5}>
                <Button colorScheme="red">Not Finished</Button>
                {/* <Button colorScheme="yellow">Ongoing</Button> */}
                <Button colorScheme="green">Finished</Button>
                </Flex>
                <Text fontSize="3xl" fontWeight="bold" mb={4} mt={4} textAlign="center">TUTOR SPACE</Text>
                <Table variant="simple">
                <Thead>
                    <Tr border="1px" borderColor="gray.200">
                        <Th border="1px" borderColor="gray.200">Student</Th>
                        <Th border="1px" borderColor="gray.200">Internship Status</Th>
                        <Th border="1px" borderColor="gray.200">Internship Type</Th>
                        <Th border="1px" borderColor="gray.200">Job Title</Th>
                        <Th border="1px" borderColor="gray.200">Mission</Th>
                        <Th border="1px" borderColor="gray.200">Start Date</Th>
                        <Th border="1px" borderColor="gray.200">End Date</Th>
                        <Th border="1px" borderColor="gray.200">Meetings</Th>
                        <Th border="1px" borderColor="gray.200">Files</Th>
                    </Tr>
                </Thead>
                <Tbody>
                 {internshipData.map((internship, index) => (
                    <Tr key={index}>
                        
                        <Td border="1px" borderColor="gray.200">{internship.student[0].email}, {internship.student ? `${internship.student[0].firstName} ${internship.student[0].lastName.toUpperCase()}` : 'Loading student data...'}</Td>
                        <Td border="1px" borderColor="gray.200">{internship.status}</Td>
                        <Td border="1px" borderColor="gray.200">{internship.type}</Td>
                        <Td border="1px" borderColor="gray.200">{internship.jobTitle}</Td>
                        <Td border="1px" borderColor="gray.200">{internship.mission}</Td>
                        <Td border="1px" borderColor="gray.200">{internship.startDate ? new Date(internship.startDate).toLocaleDateString() : 'N/A'}</Td>
                        <Td border="1px" borderColor="gray.200">{internship.endDate ? new Date(internship.endDate).toLocaleDateString() : 'N/A'}</Td>
                        <Td border="1px" borderColor="gray.200">
                        {internship.meetingList?.map((meeting, index) => (
                            <Badge 
                            key={index} 
                            color="white"
                            bg={meeting.finished ? "green.500" : "red.500"} 
                            m={1}
                            p={2}
                            borderRadius="lg"
                            >
                            {/* {meeting.type}: {meeting.finished ? "Finished" : "Not Finished"} */}
                                <Button
                                    colorScheme="blue"
                                    onClick={() => handleMeetingButtonClick( internship, meeting.type, meeting.date, meeting.location )}
                                >
                                   {meeting.type}: {meeting.finished ? "Finished" : "Not Finished"}
                                </Button>
                            </Badge>
                        ))}
                        </Td>
                        <Td border="1px" borderColor="gray.200">
                        {internship.files?.slice(6, 8).map((file, index) => (
                            <Badge 
                            key={index} 
                            color="white"
                            bg={file.finished ? "green.500" : "red.500"} 
                            m={1}
                            p={2}
                            borderRadius="lg"
                            >
                                <Button
                                    colorScheme="blue"
                                    onClick={() => handleButtonClick(internship, file.category, file.type, file.deadline)}
                                >
                                   {file.type}: {file.finished ? "Finished" : "Not Finished"}
                                </Button>
                            </Badge>
                        ))}
                        </Td>
                    </Tr>
                    ))}
                </Tbody>
                </Table>
                {/* <Flex justifyContent="center" my={4}>
                <Button>{"<"}</Button>
                <Text mx={2}>Page 1 of 5</Text>
                <Button>{">"}</Button>
                </Flex> */}
            </Box>

            <Flex
                mt={10}
                direction="column"
                flex="1"
                overflowY="auto" 
                paddingBottom="250px"
                gap={10}
                justify="center"
                align="center"
                >
                {selectedInternship && meetingButtonClick &&
                <TutorManageMeetingC  
                    selectedInternship={selectedInternship} 
                    meetingType={selectedInternshipMeetingType}  
                    onSubmissionSuccess={handleMeetingSubmissionSuccess}
                />}
            </Flex>



            <Flex
                mt={10}
                direction="column"
                flex="1"
                overflowY="auto" 
                paddingBottom="250px"
                gap={10}
                justify="center"
                align="center"
                >
                {selectedInternship && formButtonClick &&
                <TutorFillC 
                    formTitle={selectedInternshipFileType} 
                    formDeadline={selectedInternshipFileDeadline} 
                    questions={selectedInternshipFileCategory === 7 ? questionForm1 : questionForm2}
                    fileCategory={selectedInternshipFileCategory}  
                    selectedInternship={selectedInternship}  
                    onSubmissionSuccess={handleFormSubmissionSuccess}
                />}
            </Flex>
        </Container>
    );
}; 


export default TutorManageInternshipsC;



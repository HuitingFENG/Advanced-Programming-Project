const userList = [
    { id: 1, firstName: "admin", lastName: "admin", telephone: "0613546691", email: "admin@efrei.fr", password: "$2b$10$KEQLNT4TB3BFTj2m/m5YX.B2iCo6Lk1ZEB5ItS4e7y9eGLXSYP7Tu", oldPassword: "", type: "admin", promotion: 0, company: { name: "", address:"", city:"", zipCode: "" }},  // admin
    { id: 2, firstName: "student1", lastName: "student1", telephone: "0613546692", email: "student1@efrei.net", password: "$2b$10$gMKcu98m.DWj0cF6SwB5NeuD2Jwzh3juZpX2pfLW0oFbOuebLhBtW", oldPassword: "", type: "student", promotion: 2024, company: { name: "", address:"", city:"", zipCode: "" } }, // student1
    // { id: 3, firstName: "tutor1", lastName: "tutor1", telephone: "0613546693", email: "tutor1@ibm.com", password: "$2a$10$S7zFB8TBqqboC.zgDkfuJ./rnIil6mwapdDsfI9lo.FtMOx/14EEq", oldPassword: "", type: "tutor", promotion: 0, company: { /* id: 1, */ name: "ibm", address:"1 rue ibm", city:"Paris", zipCode: "75001" } }, // tutor1
    // { id: 4, firstName: "tutor2", lastName: "tutor2", telephone: "0613546694", email: "tutor2@google.com", password: "$2a$10$D9AGi5W3/bBRwrbZucYBA.NqCv/5q7kgu3xaeVCXpY308JlzOPSVe", oldPassword: "", type: "tutor", promotion: 0,  company: { /* id: 2, */ name: "google", address:"2 rue google", city:"Nice", zipCode: "06000" } },
    // { id: 5, firstName: "tutor3", lastName: "tutor3", telephone: "0613546695", email: "tutor3@ibm.com", password: "$2a$10$rmX2Vi309oVO.gWC8Du1KeAWiwPEqxjOtJhJeFnX.YVO9XpDdHFwm", oldPassword: "", type: "tutor", promotion: 0, company: { /* id: 1,  */name: "ibm", address:"1 rue ibm", city:"Paris", zipCode: "75001" }, status: "Validated" },
    { id: 6, firstName: "student2", lastName: "student2", telephone: "0613546696", email: "student2@efrei.net", password: "$2a$10$CJ7JeQRZ.52srkg/menKn.gpsyGMxWSYBAhdgKquXV20iK16lJqtO", oldPassword: "", type: "student", promotion: 2025, company: { /* id: 0,  */name: "", address:"", city:"", zipCode: "" }, status: "" },
    // { id: 7, firstName: "tutor1", lastName: "tutor1", telephone: "0613546697", email: "tutor1@google.com", password: "$2a$10$uYJWp7gvqcw5zu9Njr.2Ke8qqBG1h4kR79nv4Hu7/.UIzBiJd7gdq", oldPassword: "", type: "tutor", promotion: 0, company: { /* id: 2, */ name: "google", address:"2 rue google", city:"Nice", zipCode: "06000" } },  // 
    // { id: 8, firstName: "tutor4", lastName: "tutor4", telephone: "0613546698", email: "tutor4@google.com", password: "$2a$10$2zieKDyR6P4B1.35uUnp2OoF3vWfiG6RoZevESv63NE21c5yaKRya", oldPassword: "", type: "tutor", promotion: 0, company: { /* id: 2, */ name: "google", address:"2 rue google", city:"Nice", zipCode: "06000" } },
    { id: 9, firstName: "student3", lastName: "student3", telephone: "0613546699", email: "student3@efrei.net", password: "$2a$10$LFziGBTL/iH1ErsBpHJhcudWdQaHhodgKCv0pRxbVRA27Hebd2Ebm", oldPassword: "", type: "student", promotion: 2026, company: { /* id: 0,  */name: "", address:"", city:"", zipCode: "" } },
    { id: 10, firstName: "student4", lastName: "student4", telephone: "0613546610", email: "student4@efrei.net", password: "$2a$10$589scubWpi7FEDlmeCEeDOhpzRMVZnYLJMv5h51M6UIbhPFPjcF6G", oldPassword: "", type: "student", promotion: 2027, company: { /* id: 0,  */name: "", address:"", city:"", zipCode: "" } },
    { id: 11, firstName: "student5", lastName: "student5", telephone: "0613546611", email: "student5@efrei.net", password: "$2a$10$oV.jQZTBx./zc2e/yUfTg.4KJSkhtbsccETF16lLHoZTrDdxsq6l2", oldPassword: "", type: "student", promotion: 2028,  company: { /* id: 0,  */name: "", address:"", city:"", zipCode: "" } },
    { id: 12, firstName: "student6", lastName: "student6", telephone: "0613546612", email: "student6@efrei.net", password: "$2a$10$KyD2hmkM3Pt/ZeC/c0brKuaOnet4k5D9eizevCgwcPuB3aQBnp0VO", oldPassword: "", type: "student", promotion: 2024,  company: { /* id: 0,  */name: "", address:"", city:"", zipCode: "" } },
    { id: 13, firstName: "student7", lastName: "student7", telephone: "0613546613", email: "student7@efrei.net", password: "$2a$10$6SZBS9s5mGEo/olEwoaQ3OWn2/3jrabX.u5Kwzoi...dazSFZVCM.", oldPassword: "", type: "student", promotion: 2025, company: { /* id: 0,  */name: "", address:"", city:"", zipCode: "" } },
    // { id: 14, firstName: "tutor5", lastName: "tutor5", telephone: "0613546614", email: "tutor5@apple.com", password: "$2a$10$7tAS77nYFS.X8BfE59JUxOtYN1FAz7a240K2J5s054TvL2MGbxuwi", oldPassword: "", type: "tutor", promotion: 0, company: { /* id: 3,  */name: "apple", address:"3 rue apple", city:"Lyon", zipCode: "69004" } },
    // { id: 15, firstName: "tutor6", lastName: "tutor6", telephone: "0613546615", email: "tutor6@apple.com", password: "$2a$10$qaqXgwj6n6cbjfgSMHMdA.jnE4.hcsKaGJ8rwUq1/4r2Xwcu6.LSS", oldPassword: "", type: "tutor", promotion: 0, company: { /* id: 3,  */name: "apple", address:"3 rue apple", city:"Lyon", zipCode: "69004" } },
];


// duration : number of weeks
// type: L1, L2, M1, M2
const internshipList = [
    // {id: 1, duration: 26, type: "M2", jobTitle: "dev full stack", mission: "dev backend and frontend", salary: 1500, startDate: "2024-03-01", endDate: "2024-10-01", studentID: 2, tutorID: 3, meetingList: [{type: "visit", date: "2024-05-07", location: "At School", finished: false, deadline: ""}, {type: "defense", date: "2024-10-07", location: "At School", finished: false, deadline: ""}],  status: "Validated", 
    // files: [
    //     {category: 1, type: "final report", content: [], confidential: 1, finished: false, deadline: "", message: ""},
    //     {category: 2, type: "CdC", content: [], confidential: 1, finished: false, deadline: "", message: ""},
    //     {category: 3, type: "fiche visit", content: [], confidential: 0, finished: false, deadline: "", message: ""},
    //     {category: 4, type: "first self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
    //     {category: 5, type: "second self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
    //     {category: 6, type: "third self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
    //     {category: 7, type: "intermediate evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
    //     {category: 8, type: "final evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
    // ]},
    // {id: 2, duration: 20, type: "M1", jobTitle: "dev full stack", mission: "dev backend and frontend", salary: 1200, startDate: "2024-03-01", endDate: "2024-09-01", studentID: 6, tutorID: 7, meetingList: [{type: "visit", date: "2024-05-07", location: "Visio", finished: false, deadline: ""}, {type: "defense", date: "2024-09-07", location: "At School", finished: false, deadline: ""}], status: "Validated", 
    // files: [
    //     {category: 1, type: "final report", content: [], confidential: 1, finished: false, deadline: "", message: ""}, 
    //     {category: 2, type: "CdC", content: [], confidential: 1, finished: false, deadline: "", message: ""},
    //     {category: 3, type: "fiche visit", content: [], confidential: 0, finished: false, deadline: "", message: ""},
    //     {category: 4, type: "first self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
    //     {category: 5, type: "second self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
    //     {category: 6, type: "third self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
    //     {category: 7, type: "intermediate evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
    //     {category: 8, type: "final evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
    // ]},
]; 


// file's type: 'final report', 'CdC', 'first self-evaluation form', 'second self-evaluation form', 'third self-evaluation form', 'intermediate evaluation form', 'final evaluation form', 'fiche visit'
// file's category: 1,2,3,4,5,6,7,8
// confidential level : 0 = normal, 1 = sensitive (predefine final report == 1 and CdC == 1)

// const fileList = [
//     {
//         id: 1, schoolFiles: [{category: 8, type: "fiche visit", content: [], confidential: 0, finished: false, deadline: "", message: ""}], 
//         studentFiles: [
//         {category: 1, type: "final report", content: [], confidential: 1, finished: false, deadline: "", message: ""}, 
//         {category: 2, type: "CdC", content: [], confidential: 1, finished: false, deadline: "", message: ""},
//         {category: 3, type: "first self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
//         {category: 4, type: "second self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
//         {category: 5, type: "third self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},], 
//         tutorFiles: [
//         {category: 6, type: "intermediate evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
//         {category: 7, type: "final evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},],
//     },
//     {
//         id: 2, schoolFiles: [{category: 8, type: "fiche visit", content: [], confidential: 0, finished: false, deadline: "", message: ""}], 
//         studentFiles: [
//         {category: 1, type: "final report", content: [], confidential: 1, finished: false, deadline: "", message: ""}, 
//         {category: 2, type: "CdC", content: [], confidential: 1, finished: false, deadline: "", message: ""},
//         {category: 3, type: "first self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
//         {category: 4, type: "second self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
//         {category: 5, type: "third self-evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},], 
//         tutorFiles: [
//         {category: 6, type: "intermediate evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},
//         {category: 7, type: "final evaluation form", content: [], confidential: 0, finished: false, deadline: "", message: ""},],
//     },
// ]; 



const adminList = [];
const authenticationList = [];
const companyList = [];
const containPropositionList = [];
const containReceiverList = [];
const containViewerList = [];
const deadlineList = [];


const manageDeadlineList = []; 
const manageNotificationList = []; 
// const meetingList = [
//     {id:1, type: "visit", date: "2024-05-07", location: "At School", finished: true},
//     {id:2, type: "defense", date: "2024-05-07", location: "At School", finished: false},
// ]; 


const notificationList = []; 
const propositionList = [];  
const receiverList = []; 


const viewerList = []; 







module.exports = {
    userList,
    // adminList,
    // authenticationList,
    // companyList,
    // containPropositionList,
    // containReceiverList,
    // containViewerList,
    // deadlineList,
    // fileList,
    internshipList,
    // manageDeadlineList,
    // manageNotificationList,
    // meetingList,
    // notificationList,
    // propositionList,
    // receiverList,
    // // studentList,
    // // tutorList,
    // viewerList,
    
}
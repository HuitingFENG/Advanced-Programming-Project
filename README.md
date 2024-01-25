# Advanced-Programming-Project
EFREI Paris internship system

## Goal:
Build a secure, maintainable, and user-friendly web application for EFREI Paris's internship management needs. 
Allow for efficient development and has the potential to incorporate advanced features in future iterations.


# 1. Description:
## 1.1 Technical choices

    Frontend: React, Chakra UI, Tailwind CSS, TypeScript
    Backend: Node.js, Express
    Database: MySQL(Sequelize)

## 1.1.1 Frontend: 
- React: A JavaScript library for building user interfaces. It's an excellent choice for building complex, interactive web applications. React's component-based architecture makes it easy to manage the state and lifecycle of various UI elements, which is ideal for project's requirement of a user-friendly and intuitive interface.
- Chakra UI: This is a simple, modular, and accessible component library that gives us the building blocks to build React applications. Chakra UI will speed up the development process and ensure that the application is accessible and visually appealing.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs. Tailwind CSS will allow us to design a clean, responsive UI efficiently. It can be combined effectively with Chakra UI for more control over the layout and design.
- TypeScript: A superset of JavaScript that adds static types. Using TypeScript is a wise choice for enhancing code quality, making it easier to maintain, understand, and catch errors early.

## 1.1.2 Backend:
Node.js & Express: Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, and Express is a fast, unopinionated, minimalist web framework for Node.js. This combination is lightweight, efficient, and highly scalable, suitable for handling a large number of simultaneous connections which might be the case with numerous students accessing the system.

## 1.1.3 Database
MySQL with Sequelize: MySQL is a robust and widely-used relational database management system. Sequelize, an ORM for Node.js, will simplify database queries and allow easier manipulation of data. It supports strong data modeling and robust transaction support, which is vital for maintaining the integrity of students' reports and metadata.

## 1.1.4 Analysis
- Scalability & Performance: Node.js and MySQL are scalable solutions that can handle growth in data and user load. React's efficient DOM updates (via its virtual DOM) will keep the UI fast and responsive.
- Security: Managing sensitive internship reports requires a focus on security. The stack supports robust authentication and authorization mechanisms, and Sequelize helps prevent SQL injection attacks.
- Maintainability: The use of TypeScript, along with the modular nature of React and Node.js, aids in keeping the codebase maintainable and well-structured.
- User Experience: React combined with Chakra UI and Tailwind CSS will ensure an engaging and accessible user interface.
- Documentation and Setup: Node.js and React ecosystems are well-documented, which should assist in making the setup and deployment process clear and straightforward.
- Risk and Innovation: Incorporating advanced features like AI/ML for document analysis or advanced search could be a challenging yet innovative addition. Also, using modern architectural patterns like microservices (if deemed necessary) can enhance the project's architecture.



## 1.2 MVP


## 1.3 Architecture(s)


## 1.4 Delivery Methodology


## 1.5 Integration of clean code principles


## 1.6 Future enhancements

- Real-time notifications: using WebSockets for real-time updates to tutors and students.
- Analytics Dashboard: For insights into internship trends and student performance.
- Mobile Responsiveness: Ensuring the application is fully responsive and accessible on mobile devices.



# 2. Pre-requisites:

# 3. Manual:

# 4. Steps:

## 4.0 BackEnd Node
    node server.js


## 4.1 Backend Flask
### 4.1.1 activate virtual environment
    cd backend
    python3 -m venv venv
    source venv/bin/activate 
    or venv\Scripts\activate (for windows)
### 4.1.2 install dependencies
    pip install -r backend/requirements.txt
### 4.1.3 run app
    python3 backend/main.py
    or 
    python main.py


## 4.2 Frontend


## 4.3 MySQL Database



# 5. References: 
## 5.1. Figma 
https://www.figma.com/file/dL9itDvLdbiaw4j4IbSLdV/Bridge_Project_-_Form-(Copy)?type=design&node-id=0%3A1&mode=design&t=BifjF3Fi9aKz1euO-1  

## 5.2. UML

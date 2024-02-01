import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from './context/UserContext';
import AuthenticatedRoutes from './authenticate'; 


function App() {
  return (
    <UserProvider>
      <Router>
        <AuthenticatedRoutes />
      </Router>
    </UserProvider>
  );
}


export default App;
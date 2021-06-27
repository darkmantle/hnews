import React from 'react';
import NavBar from './components/navbar';
import Footer from "./components/footer";
import Home from './components/home';

// Routing etc for apps with multiple pages
const App = () => (
    <>
        <NavBar />
        <Home />
        <Footer />
    </>
);

export default App;
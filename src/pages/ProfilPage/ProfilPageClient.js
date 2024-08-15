import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ProfilPageClient=()=>{
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername || 'username');})
    return(
        <div className="ProfilPage">
            <Header />
            <h1 className="Bienvenue">Bienvenue {username},</h1>
            <div className="section">
                <h1>Historique des Achats</h1>
            </div>

            <div className="section">
                <h1>Favoris</h1>
            </div>

            <Footer/>
        </div>
    );
};

export default ProfilPageClient;
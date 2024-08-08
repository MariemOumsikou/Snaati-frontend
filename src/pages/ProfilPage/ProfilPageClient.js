import React, {useState, useEffect} from "react";
import ProfilHeaderC from "../../components/ProfilHeaderC";
import Footer from "../../components/Footer";

const ProfilPageClient=()=>{
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername || 'username');})
    return(
        <div className="ProfilPage">
            <ProfilHeaderC />
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
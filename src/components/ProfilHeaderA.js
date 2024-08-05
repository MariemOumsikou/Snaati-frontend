import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const ProfilHeaderA=()=>{
    const navigate= useNavigate();
    const navigateToSignIn = () => {
        navigate("/Connexion");
      };
    return(
        <div id="header">
            <nav>
                <span id="logo">Snaati</span>
                <ul className="list-item">
                    <li className="item" >Acceuil</li>
                    <li className="item" >Profil</li>
                    <li className="item" onClick={navigateToSignIn}>Déconnexion</li>
                    <li className="item" id="globe">
                        <FontAwesomeIcon icon={faGlobe} />
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default ProfilHeaderA;
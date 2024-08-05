import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faSearch, faShoppingCart, faHeart, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header=()=>{
    const navigate= useNavigate();
    const navigateToSignIn = () => {
        navigate("/Connexion");
      };
    return(
        <div id="header">
            <nav>
                <span id="logo">Snaati</span>
                <ul className="list-item">
                    <li className="item" onClick={navigateToSignIn}>Se connecter</li>
                    <li className="item">Contact</li>
                    <li className="item">
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </li>
                    <li className="item">
                        <FontAwesomeIcon icon={faHeart} />
                    </li>
                    <li className="item" id="globe">
                        <FontAwesomeIcon icon={faGlobe} />
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
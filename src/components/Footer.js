import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <footer id='Footer'>
            <div className="footer-left">
                <p>Télécharger notre application</p>
                <button className="download-btn">Snaati</button>
            </div>
            <div className="footer-right">
                <div className="footer-section">
                    <h4>Catégories</h4>
                    <ul>
                        <li>Tapis</li>
                        <li>Vêtements</li>
                        <li>Poterie</li>
                        <li>Bijoux</li>
                        <li>Sacs et Cuir</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>A propos</h4>
                    <ul>
                        <li>Snaati</li>
                        <li>Conditions générales de ventes</li>
                        <li>Politique de confidentialité</li>
                        <li>Politique de retour</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <ul>
                        <li><FontAwesomeIcon icon={faPhone} className="icon" /> +212 53 49 27 84</li>
                        <li><FontAwesomeIcon icon={faEnvelope} className="icon" /> contact@snaati.com</li>
                        <li><FontAwesomeIcon icon={faInstagram} className="icon" /></li>
                        <li><FontAwesomeIcon icon={faFacebookF} className="icon" /></li>
                    </ul>
                </div>
            </div>
            <div className='Copyright'>
                <p>Copyright 2024 Snaati.com. Tous droits réservés.</p>
            </div>

        </footer>
    );
};

export default Footer;

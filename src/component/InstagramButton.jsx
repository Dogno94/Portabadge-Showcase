import React from 'react';
import { FaInstagram } from 'react-icons/fa'; // Importa l'icona di Instagram

const InstagramButton = () => {
  const openInstagram = () => {
    window.open('https://www.instagram.com/moirart_3d/', '_blank');
  };

  return (
    <button onClick={openInstagram} className="instagram-button">
      <FaInstagram size={40} color="#E4405F" /> {/* Imposta la dimensione e il colore dell'icona */}
    </button>
  );
};

export default InstagramButton;
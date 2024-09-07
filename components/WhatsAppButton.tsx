import React from 'react';

interface WhatsAppButtonProps {
  message: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ message }) => {
  const encodedMessage = encodeURIComponent(message);

  const handleClick = () => {
    const url = `https://wa.me/9569690457?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      Chat on WhatsApp
    </button>
  );
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#25D366', // WhatsApp green
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '16px',
};

export default WhatsAppButton;

import React, { useState } from 'react';

interface TarotCardProps {
  card: {
    id: number;
    name: string;
    imageUrl: string;
    backImageUrl: string;
  };
  index: number;
  total: number;
  onSelect: () => void;
}

const TarotCard: React.FC<TarotCardProps> = ({ card, index, total, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const calculatePosition = () => {
    // Ângulo total do arco (em graus)
    const arcAngle = 60; // Reduzido para um arco mais suave
    
    // Converter para radianos
    const angleInRadians = (arcAngle * Math.PI) / 180;
    
    // Calcular o ângulo para esta carta
    const cardAngle = (index / (total - 1) - 0.5) * angleInRadians;
    
    // Raio do arco
    const radius = window.innerWidth < 768 ? 400 : 600;
    
    // Calcular posições X e Y usando funções trigonométricas
    const x = Math.sin(cardAngle) * radius;
    const y = (1 - Math.cos(cardAngle)) * (radius / 3);
    
    // Calcular a rotação da carta
    const rotation = (cardAngle * 180) / Math.PI;
    
    return {
      transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
      zIndex: index,
    };
  };

  return (
    <div 
      className={`tarot-card-wrapper ${isHovered ? 'hovered' : ''}`}
      style={calculatePosition()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      <div className="tarot-card">
        <img
          src={card.backImageUrl}
          alt="Verso da carta de Tarot"
          className="card-image"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default TarotCard;
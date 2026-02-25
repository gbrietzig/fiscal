import React from 'react';
import { Deputy } from '@fiscal/shared';
import './DeputyCard.css';

interface DeputyCardProps {
    deputy: Deputy;
    onClick?: (id: number) => void;
}

export const DeputyCard: React.FC<DeputyCardProps> = ({ deputy, onClick }) => {
    return (
        <div className="deputy-card" onClick={() => onClick?.(deputy.id)}>
            <img src={deputy.photo_url} alt={deputy.name} className="deputy-card__photo" />
            <div className="deputy-card__info">
                <h3 className="deputy-card__name">{deputy.name}</h3>
                <p className="deputy-card__party-state">
                    {deputy.party} - {deputy.state}
                </p>
            </div>
        </div>
    );
};

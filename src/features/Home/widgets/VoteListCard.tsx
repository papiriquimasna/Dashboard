import React from 'react';
import Card from '../../../components/card/Card';
import { Vote } from 'lucide-react';

const VoteListCard: React.FC = () => {
  return (
    <Card className="min-h-108">
      <h2 className="text-lg font-medium text-slate-800">Votaciones Recientes</h2>
      <p className="text-slate-500 text-sm mb-6">Se muestran las votaciones más recientes</p>
      <div className="flex flex-col items-center justify-center py-22">
        <Vote className="w-16 h-16 text-slate-300 mb-4" />
        <p className="text-slate-300 text-center font-medium text-xs">
          No hay ninguna votación disponible
        </p>
      </div>
    </Card>
  );
};

export default VoteListCard;

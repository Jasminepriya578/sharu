"use client"
import { ReactNode } from 'react';

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  color: string;
}

const ActionButton = ({ icon, label, onClick, color }: ActionButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all hover:shadow-md ${color} text-white`}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default ActionButton;
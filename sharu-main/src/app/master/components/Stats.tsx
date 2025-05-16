"use client"
import { Users, BookOpen, School, Calendar } from 'lucide-react';
import StatCard from './StatCard';

const Stats = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatCard 
        title="Total Students" 
        value="2,845" 
        icon={<Users size={32} className="text-blue-600" />} 
        change="12%" 
        isPositive={true} 
      />
      <StatCard 
        title="Total Teachers" 
        value="126" 
        icon={<BookOpen size={32} className="text-purple-600" />} 
        change="5%" 
        isPositive={true} 
      />
      <StatCard 
        title="Active Classes" 
        value="86" 
        icon={<School size={32} className="text-indigo-600" />} 
        change="3%" 
        isPositive={false} 
      />
      <StatCard 
        title="Upcoming Events" 
        value="14" 
        icon={<Calendar size={32} className="text-violet-600" />} 
        change="8%" 
        isPositive={true} 
      />
    </div>
  );
};

export default Stats;
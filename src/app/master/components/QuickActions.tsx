"use client"
import { 
    UserPlus, BookOpen, Calendar, Bell, MessageSquare, 
    FileText, Clipboard, Award
  } from 'lucide-react';
  import ActionButton from './ActionButton';
  
  const QuickActions = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ActionButton 
            icon={<UserPlus size={24} />} 
            label="Add Student" 
            onClick={() => {}} 
            color="bg-blue-500 hover:bg-blue-600"
          />
          <ActionButton 
            icon={<BookOpen size={24} />} 
            label="Add Teacher" 
            onClick={() => {}} 
            color="bg-purple-500 hover:bg-purple-600"
          />
          <ActionButton 
            icon={<Calendar size={24} />} 
            label="Schedule Event" 
            onClick={() => {}} 
            color="bg-green-500 hover:bg-green-600"
          />
          <ActionButton 
            icon={<Bell size={24} />} 
            label="Announcement" 
            onClick={() => {}} 
            color="bg-orange-500 hover:bg-orange-600"
          />
          <ActionButton 
            icon={<MessageSquare size={24} />} 
            label="Messages" 
            onClick={() => {}} 
            color="bg-indigo-500 hover:bg-indigo-600"
          />
          <ActionButton 
            icon={<FileText size={24} />} 
            label="Reports" 
            onClick={() => {}} 
            color="bg-red-500 hover:bg-red-600"
          />
          <ActionButton 
            icon={<Clipboard size={24} />} 
            label="Attendance" 
            onClick={() => {}} 
            color="bg-teal-500 hover:bg-teal-600"
          />
          <ActionButton 
            icon={<Award size={24} />} 
            label="Results" 
            onClick={() => {}} 
            color="bg-pink-500 hover:bg-pink-600"
          />
        </div>
      </div>
    );
  };
  
  export default QuickActions;
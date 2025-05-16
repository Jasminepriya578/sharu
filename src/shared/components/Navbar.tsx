'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, Users, BookOpen, GraduationCap, UserCheck, BookMarked, 
  Calendar, FileText, Award, ClipboardCheck, Bell, MessageSquare, 
  Settings, LogOut, ChevronRight, User, BookOpenCheck, School, PanelLeft
} from 'lucide-react';

const Navbar = () => {
  const [expanded, setExpanded] = useState(true);
  
  // For demo purposes, we'll hardcode the role as "master"
  const userRole = "master";

  // Define menu items with their respective icons
  const menuSections = [
    {
      title: "DASHBOARD",
      items: [
        {
          icon: <Home size={20} />,
          label: "Home",
          href: "/",
        },
      ],
    },
    {
      title: "USERS",
      items: [
        {
          icon: <BookOpen size={20} />,
          label: "Teachers",
          href: "/list/teachers",
        },
        {
          icon: <GraduationCap size={20} />,
          label: "Students",
          href: "/list/students",
        },
        {
          icon: <Users size={20} />,
          label: "Parents",
          href: "/list/parents",
        },
      ],
    },
    {
      title: "ACADEMICS",
      items: [
        {
          icon: <BookMarked size={20} />,
          label: "Subjects",
          href: "/list/subjects",
        },
        {
          icon: <School size={20} />,
          label: "Classes",
          href: "/list/classes",
        },
        {
          icon: <BookOpenCheck size={20} />,
          label: "Lessons",
          href: "/list/lessons",
        },
      ],
    },
    {
      title: "ASSESSMENTS",
      items: [
        {
          icon: <FileText size={20} />,
          label: "Exams",
          href: "/list/exams",
        },
        {
          icon: <ClipboardCheck size={20} />,
          label: "Assignments",
          href: "/list/assignments",
        },
        {
          icon: <Award size={20} />,
          label: "Results",
          href: "/list/results",
        },
        {
          icon: <UserCheck size={20} />,
          label: "Attendance",
          href: "/list/attendance",
        },
      ],
    },
    {
      title: "COMMUNICATION",
      items: [
        {
          icon: <Calendar size={20} />,
          label: "Events",
          href: "/list/events",
        },
        {
          icon: <MessageSquare size={20} />,
          label: "Messages",
          href: "/list/messages",
        },
        {
          icon: <Bell size={20} />,
          label: "Announcements",
          href: "/list/announcements",
        },
      ],
    },
    {
      title: "SETTINGS",
      items: [
        {
          icon: <User size={20} />,
          label: "Profile",
          href: "/profile",
        },
        {
          icon: <Settings size={20} />,
          label: "Settings",
          href: "/settings",
        },
        {
          icon: <LogOut size={20} />,
          label: "Logout",
          href: "/logout",
        },
      ],
    },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 z-50 flex flex-col ${
        expanded ? 'w-[30%] max-w-[300px]' : 'w-16'
      }`}
    >
      {/* Logo and toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {expanded && (
          <div className="flex items-center gap-2">
            <School size={24} className="text-blue-400" />
            <span className="font-bold text-xl">EduAdmin</span>
          </div>
        )}
        <button 
          onClick={() => setExpanded(!expanded)} 
          className={`p-2 rounded-md hover:bg-gray-700 ${!expanded ? 'mx-auto' : ''}`}
        >
          {expanded ? <ChevronRight size={20} /> : <PanelLeft size={20} />}
        </button>
      </div>

      {/* User info */}
      {expanded && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="uppercase font-bold">M</span>
            </div>
            <div>
              <p className="font-medium capitalize">Master</p>
              <p className="text-xs text-gray-400">Full Access</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Menu items */}
      <div className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-gray-700">
        {menuSections.map((section, idx) => (
          <div className="mb-6" key={section.title + idx}>
            {expanded && (
              <h3 className="text-xs font-semibold text-gray-400 px-4 mb-2">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`flex items-center ${expanded ? 'justify-start' : 'justify-center'} gap-3 text-gray-300 px-4 py-2 rounded-md hover:bg-blue-600/20 hover:text-blue-400 transition-colors`}
                >
                  <span className="text-gray-400">{item.icon}</span>
                  {expanded && <span>{item.label}</span>}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Version info */}
      {expanded && (
        <div className="p-4 text-xs text-gray-500 border-t border-gray-700">
          <p>ERP System v1.0.0</p>
        </div>
      )}
    </aside>
  );
};

export default Navbar;
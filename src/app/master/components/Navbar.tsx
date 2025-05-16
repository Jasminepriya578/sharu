"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const StudentAttendance = dynamic(
  () => import("@/app/master/components/Attendance/StudentAttend"),
  { ssr: false }
);

const TeacherAttendance = dynamic(
  () => import("@/app/master/components/Attendance/TeacherAttend"),
  { ssr: false }
);


import {
  Home,
  GraduationCap,
  UserCheck,
  BookOpen,
  ClipboardCheck,
  CalendarDays,
  ChevronRight,
  PanelLeft,
  School,
  ChevronDown,
  User,
  CreditCard,
  FileText,
  DollarSign,
  Bus,
  LineChart,
  FileSpreadsheet,
  Clock,
  UserPlus,
  Settings,
} from "lucide-react";

interface NavbarProps {
  setActiveComponent: (component: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setActiveComponent }) => {
  const [expanded, setExpanded] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  
  const menuSections = [
    {
      title: "DASHBOARD",
      items: [
        {
          icon: <Home size={20} />,
          label: "Home",
          action: () => router.push("/"),
        },
      ],
    },
    {
      title: "ADMISSION MANAGEMENT",
      items: [
        {
          icon: <UserPlus size={20} />,
          label: "Admission",
          action: () => setActiveComponent("Admission Management"),
        },
      ],
    },
    {
      title: "STUDENT MANAGEMENT",
      items: [
        {
          icon: <GraduationCap size={20} />,
          label: "Student Details",
          dropdown: [
            {
              icon: <User size={20} />,
              label: "Student Profile",
              action: () => setActiveComponent("Student Profile"),
            },
            {
              icon: <CreditCard size={20} />,
              label: "ID Card Generation",
              action: () => setActiveComponent("ID Card Generation"),
            },
            {
              icon: <FileText size={20} />,
              label: "Personal & Professional Details",
              action: () => setActiveComponent("Personal & Professional Details"),
            },
          ],
        },
      ],
    },

    {
      title: "FEES MANAGEMENT",
      items: [
        {
          icon: <DollarSign size={20} />,
          label: "Fees",
          dropdown:[
            {
              icon: <UserCheck size={20} />,
              label: "Payment",
              action: () => setActiveComponent("Payment"),

            },
            {  
              icon: <UserCheck size={20} />,
              label: "Fees Details",
              action: () => setActiveComponent("Fees Details"),
            }
          ]
        },
      ],
    },

    {
      title: "ATTENDANCE MANAGEMENT",
      items: [
        {
          icon: <UserCheck size={20} />,
          label: "Attendance",
          dropdown: [
            {
              icon: <UserCheck size={20} />,
              label: "Student Attendance",
              action: () => setActiveComponent("Student Attendance"),
            },
            {
              icon: <UserCheck size={20} />,
              label: "Teacher Attendance",
              action: () => setActiveComponent("Teacher Attendance"),
            },
          ],
        },
      ],
    },
    
    {
      title: "TIMETABLE MANAGEMENT",
      items: [
        { 
          icon: <Clock size={20} />, 
          label: "Time Table",
          action: () => setActiveComponent("Time Table"),
        },
      ],
    },
    {
      title: "TRANSPORT MANAGEMENT",
      items: [
        { 
          icon: <Bus size={20} />, 
          label: "Transport",
          action: () => setActiveComponent("Transport Management"),
        },
      ],
    },


  {
      title: "EXAMINATIONMANAGEMENT",
      items: [
        {
          icon: <ClipboardCheck size={20} />,
          label: "Examination",
          dropdown:[
               {  
              icon: <UserCheck size={20} />,
              label: " Venue and Roomallocation ",
              action: () => setActiveComponent("Roomallocation"),
            },
               {  
              icon: <UserCheck size={20} />,
              label: "Exam Timetable",
              action: () => setActiveComponent("ExamTimetable"),
            },
          /*   {
              icon: <UserCheck size={20} />,
              label: "HallTicket",
              action: () => setActiveComponent("HallTicket"),
              case "HallTicket":
            return <Halltickets/>;

            },*/
               {  
              icon: <UserCheck size={20} />,
              label: "QuestionPaper Generation",
              action: () => setActiveComponent("Questionpaper"),
            }
         
          ]
        },
      ],
    },





    {
      title: "REPORT MANAGEMENT",
      items: [
        { 
          icon: <FileSpreadsheet size={20} />, 
          label: "Reports",
          action: () => setActiveComponent("Report Management"),
        },
      ],
    },
    {
      title: "ACCOUNT MANAGEMENT",
      items: [
        { 
          icon: <Settings size={20} />, 
          label: "Account",
          action: () => setActiveComponent("Account Management"),
        },
      ],
    },
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 z-50 ${
        expanded ? "w-64" : "w-16"
      } overflow-y-auto`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {expanded && (
          <div className="flex items-center gap-2">
            <School size={24} className="text-blue-400" />
            <span className="font-bold text-xl">EduAdmin</span>
          </div>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`p-2 rounded-md hover:bg-gray-700 ${
            !expanded ? "mx-auto" : ""
          }`}
        >
          {expanded ? <ChevronRight size={20} /> : <PanelLeft size={20} />}
        </button>
      </div>

      <div className="py-4">
        {menuSections.map((section, idx) => (
          <div key={idx} className="mb-4">
            {expanded && (
              <h3 className="text-xs font-semibold text-gray-400 px-4 mb-2">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx}>
                  <button
                    className={`w-full flex items-center ${
                      expanded ? "justify-start px-4" : "justify-center"
                    } gap-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors`}
                    onClick={() => {
                      if (item.dropdown) {
                        toggleDropdown(item.label);
                      } else {
                        item.action
                          ? item.action()
                          : setActiveComponent(item.label);
                      }
                    }}
                  >
                    {item.icon}
                    {expanded && (
                      <div className="flex items-center justify-between w-full">
                        <span>{item.label}</span>
                        {item.dropdown && (
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              openDropdown === item.label ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </div>
                    )}
                  </button>
                  {item.dropdown && openDropdown === item.label && expanded && (
                    <div className="pl-8">
                      {item.dropdown.map((dropdownItem, dropdownIdx) => (
                        <button
                          key={dropdownIdx}
                          className="w-full flex items-center justify-start gap-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                          onClick={() => {
                            dropdownItem.action
                              ? dropdownItem.action()
                              : setActiveComponent(dropdownItem.label);
                          }}
                        >
                          {dropdownItem.icon}
                          <span>{dropdownItem.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Navbar;
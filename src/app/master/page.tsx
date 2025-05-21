"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import StudentProfile from "./components/Studentprofile";
import IdCardGeneration from "./components/idcard";
import PersonalProfessionalDetails from "./components/PersonalProfessionalDetails";
import StudentAttendance from "@/app/master/components/Attendance/StudentAttend";
import TeacherAttendance from "@/app/master/components/Attendance/TeacherAttend";
import PaymentArea from "@/app/master/components/Fees/payment";
import FeesDetails from "@/app/master/components/Fees/feesdetails/page";
import AdmissionManagement from "@/app/master/components/Admission";
import Result from "@/app/master/components/Results";
import Timetable from '@/app/master/components/timetable/timetable';
import Halltickets from '@/app/master/components/Examination/HallTickets/Hallticket';
import Examtimetable from '@/app/master/components/Examination/ExamTimetable';
import Questiongenerator from '@/app/master/components/Examination/QuestionGenerator';
import Transport from "@/app/master/components/Transport/index";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("Home");

  // Render the appropriate component based on the activeComponent state
  const renderComponent = () => {
    switch (activeComponent) {
      case "Admission Management":
        return <AdmissionManagement/>;
      case "Report Management":
        return <Result/>;
      case "Student Profile":
        return <StudentProfile />;
      case "ID Card Generation":
        return <IdCardGeneration />;
      case "Personal & Professional Details":
        return <PersonalProfessionalDetails />;
        case "Student Attendance":
          return <StudentAttendance />;
        case "Teacher Attendance":
          return <TeacherAttendance />;
          case "Payment":
          return <PaymentArea />;
          case "Fees Details":
            return <FeesDetails />;
            case "Time Table":
            return <Timetable/>;
            case "Transport Management":
              return <Transport/>
              case "ExamTimetable":
            return < Examtimetable />;
              case "QuestionGenerator":
            return < Questiongenerator />;
     
      case "Home":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Welcome to EduAdmin Dashboard</h1>
            <p className="mt-2">Select an option from the sidebar to get started.</p>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">{activeComponent}</h1>
            <p className="mt-2">This component is not implemented yet.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex">
      <Navbar setActiveComponent={setActiveComponent} />
      <main className={`flex-1 ml-64 transition-all duration-300`}>
        {renderComponent()}
      </main>
    </div>
  );
}
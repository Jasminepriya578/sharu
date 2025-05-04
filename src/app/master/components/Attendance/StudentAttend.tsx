import { useState, useEffect } from 'react';

const StudentAttendance = () => {
  const students = [
    'Student11', 'Student12', 'Student13', 'Student14', 'Student15',
    'Student16', 'Student17', 'Student18', 'Student19', 'Student20'
  ];


  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [submittedRecords, setSubmittedRecords] = useState(() => {
    const savedRecords = localStorage.getItem('submittedAttendanceRecords');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });
  const [dateFilter, setDateFilter] = useState('');
  const [showEditTable, setShowEditTable] = useState(true); 
  const [percentageRecords, setPercentageRecords] = useState({});
  

  useEffect(() => {
    localStorage.setItem('submittedAttendanceRecords', JSON.stringify(submittedRecords));
  }, [submittedRecords]);
  
  const handleAttendanceChange = (student, value) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [student]: value,
    }));
  };

  const handleSubmit = () => {
    const today = new Date().toISOString().split('T')[0];

    const newRecords = Object.entries(attendanceRecords).map(([student, status]) => ({
      student,
      status,
      date: today,
    }));

    setSubmittedRecords([...submittedRecords, ...newRecords]);
    setAttendanceRecords({});
    setShowEditTable(true); 
  };

  const handlePercentage = (student) => {
    setPercentageRecords((prev) => {
      if (prev[student] !== undefined) {
        const updatedRecords = { ...prev };
        delete updatedRecords[student];
        return updatedRecords;
      }
    
   
      const studentRecords = submittedRecords.filter(record => record.student === student);
      const totalDays = studentRecords.length;

      const presentDays = studentRecords.filter(record => record.status === 'Present').length;
      const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

      return { ...prev, [student]: `${percentage}%` };
    });
  };

  const handleEdit = (index) => {
    const record = submittedRecords[index];
    setAttendanceRecords({ [record.student]: record.status });
    setSubmittedRecords(submittedRecords.filter((_, i) => i !== index));
    setShowEditTable(false); 
  };

  const handleDelete = (index) => {
    setSubmittedRecords(submittedRecords.filter((_, i) => i !== index));
  };
  
  const getTodaysRecords = () => {
    const today = new Date().toISOString().split('T')[0];
    return submittedRecords.filter(record => record.date === today);
  };

  const toggleView = () => {
    setShowEditTable(!showEditTable);
  };

  
  const today = new Date().toISOString().split('T')[0];
  

  useEffect(() => {
    if (!dateFilter) {
      setDateFilter(today);
    }
  }, [dateFilter, today]);
  
  const filteredRecords = submittedRecords.filter(
    (record) => {
      return (!dateFilter || record.date === dateFilter);
    }
  );

  return (
    <div className="w-full">
      <div className="bg-indigo-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-white font-bold">STUDENTS ATTENDANCE</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <label htmlFor="date-filter" className="mr-2 text-sm font-medium">Filter by date:</label>
            <input
              id="date-filter"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <button
            onClick={toggleView}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {showEditTable ? "Mark Attendance" : "View Submitted Records"}
          </button>
        </div>
      </div>

      {!showEditTable && (
        <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">OD</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student}</td>

                      <td className="px-2 py-2 sm:px-4 md:px-6 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleAttendanceChange(student, 'Present')}
                          className={`w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all
                             ${attendanceRecords[student] === 'Present'
                              ? 'bg-emerald-600 text-white ring-2 ring-emerald-600 ring-offset-1'
                              : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'}`}
                        >
                          Present
                        </button>
                      </td>

                      <td className="px-2 py-2 sm:px-4 md:px-6 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleAttendanceChange(student, 'Absent')}
                          className={`w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all
                           ${attendanceRecords[student] === 'Absent'
                              ? 'bg-red-600 text-white ring-2 ring-red-600 ring-offset-1'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                        >
                          Absent
                        </button>
                      </td>
                      <td className="px-2 py-2 sm:px-4 md:px-6 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleAttendanceChange(student, 'OD')}
                          className={`w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all
                              ${attendanceRecords[student] === 'OD'
                              ? 'bg-amber-500 text-white ring-2 ring-amber-500 ring-offset-1'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
                        >
                          OD
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit Attendance
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditTable && (
        <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.student}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${record.status === 'Present' ? 'bg-green-100 text-green-800' :
                            record.status === 'Absent' ? 'bg-red-100 text-red-800' :
                              record.status === 'OD' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'}`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className='flex'>
                          <button
                            onClick={() => handlePercentage(record.student)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-1 rounded mr-3 transition-colors"
                          >
                            {percentageRecords[record.student] || "Percentage"}
                          </button>

                          <button
                            onClick={() => handleEdit(index)}
                            className="bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-white px-6 py-1 rounded mr-3 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-1 rounded transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
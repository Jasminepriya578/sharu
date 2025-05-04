import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const initialData = [
  { 
    subjectCode: "CS101", 
    ASSIGNMENT: "Subject 1", 
    faculty: "Dr. Smith", 
    IT1: 82.67, IT2: 83.67, IT3: 91.17, 
    totalMarks: 100, 
    submissionDate: "2025-03-01", 
    dueDate: "2025-03-05", 
    remarks: "Good" 
  },
  { 
    subjectCode: "CS102", 
    ASSIGNMENT: "Subject 2", 
    faculty: "Prof. Johnson", 
    IT1: 79.67, IT2: 89.17, IT3: 88.00, 
    totalMarks: 100, 
    submissionDate: "2025-03-02", 
    dueDate: "2025-03-06", 
    remarks: "Needs Improvement" 
  },
  { 
    subjectCode: "CS103", 
    ASSIGNMENT: "Subject 3", 
    faculty: "Dr. Williams", 
    IT1: 90.00, IT2: 86.30, IT3: 87.20, 
    totalMarks: 100, 
    submissionDate: "2025-03-03", 
    dueDate: "2025-03-07", 
    remarks: "Excellent" 
  },
  { 
    subjectCode: "CS104", 
    ASSIGNMENT: "Subject 4", 
    faculty: "Prof. Brown", 
    IT1: 89.50, IT2: 92.00, IT3: 86.33, 
    totalMarks: 100, 
    submissionDate: "2025-03-04", 
    dueDate: "2025-03-08", 
    remarks: "Good" 
  },
  { 
    subjectCode: "CS105", 
    ASSIGNMENT: "Subject 5", 
    faculty: "Dr. Davis", 
    IT1: 83.67, IT2: 88.00, IT3: 87.67, 
    totalMarks: 100, 
    submissionDate: "2025-03-05", 
    dueDate: "2025-03-09", 
    remarks: "Satisfactory" 
  },
];

// Calculate average for each subject
const calculateAverage = (row: any) => {
  return ((row.IT1 + row.IT2 + row.IT3) / 3).toFixed(2);
};

// Define a function to get a color class based on remarks
const getRemarkColor = (remark: string) => {
  switch (remark) {
    case "Excellent":
      return "bg-green-100 text-green-800";
    case "Good":
      return "bg-blue-100 text-blue-800";
    case "Satisfactory":
      return "bg-yellow-100 text-yellow-800";
    case "Needs Improvement":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const AssignmentMarks = () => {
  const [filteredSubject, setFilteredSubject] = useState("");
  const [sortedData, setSortedData] = useState(initialData);
  const [sortBy, setSortBy] = useState<{ field: string; order: "asc" | "desc" } | null>(null);

  // Handle sorting
  const sortData = (field: string) => {
    const newOrder = sortBy?.field === field && sortBy.order === "asc" ? "desc" : "asc";
    
    const sorted = [...sortedData].sort((a, b) => {
      if (field === "dueDate") {
        return newOrder === "asc" 
          ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      } else if (field === "average") {
        const avgA = (a.IT1 + a.IT2 + a.IT3) / 3;
        const avgB = (b.IT1 + b.IT2 + b.IT3) / 3;
        return newOrder === "asc" ? avgA - avgB : avgB - avgA;
      } else {
        return newOrder === "asc" 
          ? a[field] > b[field] ? 1 : -1
          : a[field] < b[field] ? 1 : -1;
      }
    });
    
    setSortedData(sorted);
    setSortBy({ field, order: newOrder });
  };

  // Handle subject filtering
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredSubject(e.target.value);
  };

  const filteredData = filteredSubject
    ? sortedData.filter((row) => row.subjectCode === filteredSubject)
    : sortedData;

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const subject = filteredData.find(item => item.ASSIGNMENT === label);
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p className="font-bold text-gray-800">{label} - {subject?.subjectCode}</p>
          <p className="text-gray-600">Faculty: {subject?.faculty}</p>
          <div className="mt-2">
            <p className="text-blue-600">Test 1: {payload[0].value}%</p>
            <p className="text-yellow-600">Test 2: {payload[1].value}%</p>
            <p className="text-red-600">Test 3: {payload[2].value}%</p>
            <p className="font-semibold mt-1">Average: {calculateAverage(subject)}%</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <h2 className="text-center text-2xl font-bold text-white mb-2">Assignment Performance Dashboard</h2>
            <p className="text-center text-blue-100">Track and analyze test performance across subjects</p>
          </div>

          {/* Filters & Controls */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="w-full sm:w-auto">
                <label htmlFor="subject-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Subject</label>
                <select 
                  id="subject-filter"
                  onChange={handleFilterChange} 
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={filteredSubject}
                >
                  <option value="">All Subjects</option>
                  {Array.from(new Set(initialData.map(item => item.subjectCode))).map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 flex-wrap justify-center">
                <button 
                  onClick={() => sortData("subjectCode")} 
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 flex items-center gap-1"
                >
                  <span>Subject Code</span>
                  {sortBy?.field === "subjectCode" && (
                    <span>{sortBy.order === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
                <button 
                  onClick={() => sortData("dueDate")} 
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 flex items-center gap-1"
                >
                  <span>Due Date</span>
                  {sortBy?.field === "dueDate" && (
                    <span>{sortBy.order === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
                <button 
                  onClick={() => sortData("average")} 
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 flex items-center gap-1"
                >
                  <span>Average Score</span>
                  {sortBy?.field === "average" && (
                    <span>{sortBy.order === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          {filteredSubject && filteredData.length > 0 && (
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Average Score</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {(filteredData.reduce((sum, item) => sum + (item.IT1 + item.IT2 + item.IT3) / 3, 0) / filteredData.length).toFixed(2)}%
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 shadow-sm">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Highest Score</h3>
                <p className="text-3xl font-bold text-green-600">
                  {Math.max(...filteredData.flatMap(item => [item.IT1, item.IT2, item.IT3])).toFixed(2)}%
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 shadow-sm">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Faculty</h3>
                <p className="text-xl font-bold text-purple-600">
                  {filteredData[0].faculty}
                </p>
              </div>
            </div>
          )}

          {/* Chart */}
          <div className="p-4">
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Comparison</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart 
                  data={filteredData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barSize={30}
                >
                  <XAxis 
                    dataKey="ASSIGNMENT" 
                    scale="band"
                    padding={{ left: 20, right: 20 }}
                    tick={{ fill: '#4B5563' }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fill: '#4B5563' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: 10 }}
                    payload={[
                      { value: 'Test 1', type: 'square', color: '#3B82F6' },
                      { value: 'Test 2', type: 'square', color: '#F59E0B' },
                      { value: 'Test 3', type: 'square', color: '#EF4444' }
                    ]}
                  />
                  <Bar dataKey="IT1" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Test 1" />
                  <Bar dataKey="IT2" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Test 2" />
                  <Bar dataKey="IT3" fill="#EF4444" radius={[4, 4, 0, 0]} name="Test 3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="p-4">
            <div className="overflow-x-auto bg-white rounded-lg border shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test 1</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test 2</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test 3</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((row, index) => {
                    const average = calculateAverage(row);
                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{row.subjectCode}</div>
                          <div className="text-sm text-gray-500">{row.ASSIGNMENT}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.faculty}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${Number(row.IT1) >= 85 ? 'text-green-600' : 'text-gray-900'}`}>
                            {row.IT1.toFixed(1)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${Number(row.IT2) >= 85 ? 'text-green-600' : 'text-gray-900'}`}>
                            {row.IT2.toFixed(1)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${Number(row.IT3) >= 85 ? 'text-green-600' : 'text-gray-900'}`}>
                            {row.IT3.toFixed(1)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${Number(average) >= 85 ? 'text-green-600' : Number(average) >= 70 ? 'text-blue-600' : 'text-red-600'}`}>
                            {average}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(row.dueDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRemarkColor(row.remarks)}`}>
                            {row.remarks}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Empty state */}
            {filteredData.length === 0 && (
              <div className="text-center p-8">
                <p className="text-gray-500">No data found for the selected filters.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          © 2025 Academic Performance Dashboard | Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default AssignmentMarks;
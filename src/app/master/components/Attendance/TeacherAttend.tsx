export interface StaffAttendance{
  id:string;
  staffId:String;
  timestamp:String;
  status:"Present" | "Absent" |"Late"
}
export interface EditData{
id?:string;
staffId?:string;
timestap?:string;
status?: "Present" | "Absent" | "Late";
}
import { useState, useEffect } from "react";

const StaffAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

 
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch("/api/biometric");

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setAttendance(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAttendance();
  }, []);


  const filteredAttendance = attendance.filter((entry) =>
    dateFilter ? entry.timestamp.startsWith(dateFilter) : true
  );

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(filteredAttendance[index]);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/update-attendance`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!res.ok) {
        throw new Error("Failed to update attendance");
      }

      setAttendance(attendance.map((item, i) => (i === editIndex ? editData : item)));
      setEditIndex(null);
    } catch (err) {
      console.error("Error updating attendance:", err);
    }
  };

  
  const handleDelete = async (index) => {
    const { id } = filteredAttendance[index];

    try {
      const res = await fetch(`/api/delete-attendance/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete attendance");
      }

      setAttendance(attendance.filter((entry) => entry.id !== id));
    } catch (err) {
      console.error("Error deleting attendance:", err);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Staff Attendance</h2>


      <input
        type="date"
        className="p-2 border rounded mb-4"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Staff ID</th>
              <th className="border p-2">Timestamp</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((entry, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{entry.staffId}</td>
                  <td className="border p-2">{new Date(entry.timestamp).toLocaleString()}</td>
                  <td className="border p-2">
                    {editIndex === index ? (
                      <select
                        className="p-1 border rounded"
                        value={editData.status}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                      </select>
                    ) : (
                      entry.status
                    )}
                  </td>
                  <td className="border p-2">
                    {editIndex === index ? (
                      <button onClick={handleSave} className="px-2 py-1 bg-green-500 text-white rounded">
                        Save
                      </button>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(index)} className="px-2 py-1 bg-yellow-500 text-white rounded">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffAttendance;

"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import Image from "next/image";
import { Employee, AttendanceRecord } from "@/utils/response-types";
import { api } from "@/utils/wretch";
import { useParams } from "next/navigation";
import { totalPagesCount } from "@/utils/pagination";
import { CustomError } from "@/utils/response-types";
import { useSearchParams } from "next/navigation";


export default function EmployeePage() {

    const [employee, setEmployee] = useState<Employee>();
    const [attandenceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
    const [attendanceCurrentPage, setAttendanceCurrentPage] = useState(1);
    const [attendanceTotalPages, setAttendanceTotalPages] = useState(1);
    const [newAttendanceDate, setNewAttendanceDate] = useState({date: "", status: true});

    const handleConfirmDelete = async () => {
        try {
            await api.delete(`/employees/${employee?.id}/`).res();
            toast.success("Employee deleted successfully");
            router.push("/employees");
        } catch (error) {
            toast.error(`Failed to delete employee. ${error instanceof Error ? error.message : 'Unknown error'}`);
            console.error("Error deleting employee:", error);
        }
    }

    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams()
    const profileImage = searchParams.get('profile')

    useEffect(() => {
        const fetchEmployeeDetail = async () => {
            try {
                // Simulate API call with a timeout
                const response: { employee: Employee } = await api.get(`/employees/${params.id}`).json();
                setEmployee(response.employee);
            } catch (error) {
                toast.error(`Failed to fetch employee details. ${error instanceof Error ? error.message : 'Unknown error'}`);
                console.error("Error fetching employee details:", error);
            }
        };
        fetchEmployeeDetail();

    }, [params.id, attendanceCurrentPage]);

    useEffect(() => {
        const fetchAttendanceRecords = async () => {
            try {
                const response: { attendance_records: AttendanceRecord[], total_count: number } = await api.get(`/attendance/${params.id}?page=${attendanceCurrentPage}`).json();
                setAttendanceRecords(response.attendance_records);
                setAttendanceTotalPages(totalPagesCount(response.total_count, 10)); // Assuming 10 records per page
            } catch (error: CustomError | any) {
                if (error.response) {
                    error.response.json().then((data: CustomError) => {
                        toast.error(`Failed to fetch attendance records. ${data.error || 'Unknown error'}`);
                    });
                } else {
                    toast.error(`Failed to fetch attendance records. ${error instanceof Error ? error.message : 'Unknown error'}`);
                }
                console.error("Error fetching attendance records:", error);
            }
        };

        fetchAttendanceRecords();
    }, [attendanceCurrentPage, params.id]);

    const handleNewAttendance = async () => {
        try {
            const response: { attendance: AttendanceRecord } = await api.post({date: newAttendanceDate.date, status: newAttendanceDate.status}, `/attendance/${params.id}/`).json();
            setAttendanceRecords(prev => [response.attendance, ...prev]);
            toast.success("Attendance record added successfully");
            setNewAttendanceDate({date: "", status: true});
            setAttendanceCurrentPage(1);
        } catch (error: CustomError | any) {
            if (error.response) {
                error.response.json().then((data: CustomError) => {
                    toast.error(`Failed to add attendance record. ${data.error || 'Unknown error'}`);
                });
            } else {
                toast.error(`Failed to add attendance record. ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
            console.error("Error adding attendance record:", error);
        }
    }

    const handleMarkAttendance = async (id: number, status: boolean) => {
        try {
            await api.put({status: !status}, `/attendance/update/${id}/`).json();
            setAttendanceRecords(prev => prev.map(record => record.id === id ? {...record, status: !status} : record));
            toast.success("Attendance record updated successfully");
        } catch (error: CustomError | any) {
            if (error.response) {
                error.response.json().then((data: CustomError) => {
                    toast.error(`Failed to update attendance record. ${data.error || 'Unknown error'}`);
                });
            } else {
                toast.error(`Failed to update attendance record. ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
            console.error("Error updating attendance record:", error);
        }
    }

    const handleDeleteAttendance = async (id: number) => {
        console.log("Deleting attendance record with ID:", id);
        try {
            await api.delete(`/attendance/delete/${id}/`).res();
            setAttendanceRecords(prev => prev.filter(record => record.id !== id));
            toast.success("Attendance record deleted successfully");
        } catch (error: CustomError | any) {
            if (error.response) {
                error.response.json().then((data: CustomError) => {
                    toast.error(`Failed to delete attendance record. ${data.error || 'Unknown error'}`);
                });
            } else {
                toast.error(`Failed to delete attendance record. ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
            console.error("Error deleting attendance record:", error);
        }
    }

    return (
        <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex w-full flex-col py-8 px-16 bg-black">
                <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                    Employee Detail Page
                </h1>
                <h3 className="text-lg text-zinc-400 dark:text-zinc-500">Viewing employee details</h3>
                <div className="bg-black flex mt-10 rounded-2xl p-6 min-w-[70%] w-min border border-gray-500">
                    <div >
                        <Image width={32} height={32} src={profileImage} alt="Employee Avatar" className="h-16 w-16 rounded-full object-cover border border-gray-500" />
                    </div>
                    <div className="ml-10">
                        <h3 className="text-xl font-bold text-gray-500">Employee ID</h3>
                        <p className="text-gray-300">{employee?.id}</p>
                    </div>
                    <div className="ml-10">
                        <h3 className="text-xl font-bold text-gray-500">Full Name</h3>
                        <p className="text-gray-300">{employee?.full_name}</p>
                    </div>
                    <div className="ml-10">
                        <h3 className="text-xl font-bold text-gray-500">Email</h3>
                        <p className="text-gray-300">{employee?.email}</p>
                    </div>
                    <div className="ml-10">
                        <h3 className="text-xl font-bold text-gray-500">Department</h3>
                        <p className="text-gray-300">{employee?.department}</p>
                    </div>   
                                  
                </div>
                <div className="mt-4 flex gap-4 justify-between">
                    <div className="flex items-center">
                        <h5 className="mr-5 font-bold text-lg">Select Attendence</h5>
                        <input onChange={(e)=>setNewAttendanceDate({...newAttendanceDate, date:e.target.value})} type="date" className="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input onChange={(e)=>setNewAttendanceDate({...newAttendanceDate, status:true})} type="radio" id="present" name="attendance_status" value="true" checked={newAttendanceDate.status} className="ml-4" />
                        <label htmlFor="present" className="ml-1 text-gray-300">Present</label>
                        <input onChange={(e)=>setNewAttendanceDate({...newAttendanceDate, status:false})} type="radio" id="absent" name="attendance_status" value="false" checked={!newAttendanceDate.status} className="ml-4" />
                        <label htmlFor="absent" className="ml-1 text-gray-300">Absent</label>
                        <button onClick={handleNewAttendance} hidden={newAttendanceDate.date === "" || newAttendanceDate.status === undefined} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors hover:cursor-pointer">Add Attendance</button>
                    </div> 
                    <div className="flex items-center justify-self-end">
                        <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors hover:cursor-pointer">Delete Employee</button>
                    </div>
                </div>
                <h1 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-gray-300 mt-5">
                    Attendance Record
                </h1>
                <div className="mt-6">
                    <table className="min-w-full bg-black border border-gray-500">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-500 text-left text-gray-500">Date</th>
                                <th className="py-2 px-4 border-b border-gray-500 text-left text-gray-500">Status</th>
                                <th className="py-2 px-4 border-b border-gray-500 text-left text-gray-500 justify-center flex">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {attandenceRecords.map((record) => (
                                <tr key={record.id}>
                                    <td className="py-2 px-4 border-b border-gray-500 text-gray-300">{record.date}</td>
                                    <td className={`py-2 px-4 border-b border-gray-500 ${record.status ? 'text-green-500' : 'text-red-500'}`}>
                                        {record.status ? "Present" : "Absent"}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-500 text-gray-300 flex justify-center">
                                        <button onClick={()=>handleMarkAttendance(record.id, record.status)} className={`px-3 py-2 ${record.status ? 'border border-red-500 hover:bg-red-700' : 'border border-green-500 hover:bg-green-700'} text-white rounded-md transition-colors hover:cursor-pointer`}>{record.status ? "Mark Absent" : "Mark Present"}</button>
                                        <button onClick={()=>handleDeleteAttendance(record.id)} className="ml-2 px-3 py-2 border border-red-500 hover:bg-red-700 text-white rounded-md transition-colors hover:cursor-pointer">Delete Attendance</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Paginations */}
                    <div className="flex justify-center my-4">
                        <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors hover:cursor-pointer mr-2">Previous</button>
                        {/* page count */}
                        <div className="pl-2 pr-4 py-2 text-white rounded-md">Page {attendanceCurrentPage} of {attendanceTotalPages}</div>
                        <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors hover:cursor-pointer">Next</button>
                    </div>
                </div>
            </main>
            
        </div>
    );
}
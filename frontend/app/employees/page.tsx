"use client"
import Link from "next/link";
import EmployeeListTile from "@/components/employee-list";
import { IoMdAddCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { api } from "@/utils/wretch";
import toast from "react-hot-toast";
import { Employee, EmployeeResponse } from "@/utils/response-types";


export default function Employees() {
    const [employees, setEmployees] = useState<Employee[]>([]);


  useEffect(() => {
    
    const fetchEmployees = async () => {
      try {
        // Simulate API call with a timeout
        const response: EmployeeResponse = await api.get('/employees').json();
        setEmployees(response.employees);
      } catch (error) {
        toast.error(`Failed to fetch employees. ${error instanceof Error ? error.message : 'Unknown error'}`);
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);


  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full flex-col py-8 px-16 bg-black">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Employees Page
          </h1>
          <div className="grid grid-cols-6">
            {/* Employee table */}
            <div className="mt-10 space-y-4 col-span-4 overflow-scroll h-[70vh] no-scrollbar border border-gray-700 rounded-lg p-4">
              {employees.map((employee) => (
                <EmployeeListTile key={employee.id} 
                  name={employee.full_name} 
                  position={employee.email} 
                  id={employee.id} 
                  />
              ))}
            </div>
            <div className="col-span-2 mx-10 flex items-start justify-center">
              <button className="px-4 py-2 text-white rounded hover:bg-blue-600 transition-colors duration-200 border border-blue-600">
                <Link href="/employees/new">Add Employee <IoMdAddCircle className="inline-block ml-1 mb-1 text-blue-400" /></Link>
              </button>
            </div>
          </div>
      </main>
    </div>
  );
}
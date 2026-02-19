"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdAddCircle } from "react-icons/io";
import Link from "next/link";
import { FaBuildingUser } from "react-icons/fa6";
import { api } from "@/utils/wretch";
import toast from "react-hot-toast";
import { DepartmentResponse } from "@/utils/response-types";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<{ id: number; name: string; description: string }[]>([]);

  useEffect(() => {
  let isMounted = true;

  const fetchDepartments = async () => {
    try {
      const response: DepartmentResponse = await api.get("/departments/").json();
      if (isMounted) {
        setDepartments(response.departments);
      }
    } catch (error) {
      toast.error("Failed to fetch departments. Please try again later.");
      console.error("Error fetching departments:", error);
    }
  };

  fetchDepartments();

  return () => {
    isMounted = false;
  };
}, []);


  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/departments/${id}/`).res();
      setDepartments((prev) => prev.filter((dept) => dept.id !== id));
      toast.success("Department deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete department. Please try again later.");
      console.error("Error deleting department:", error);
    }
  }

  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full flex-col py-8 px-16 bg-black">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Department Page
        </h1>
        <div className="grid grid-cols-6">
          {/* Employee table */}
          <div className="mt-10 space-y-4 col-span-4 overflow-scroll h-[70vh] no-scrollbar rounded-lg p-4">
            {departments.map((department) => (
              <div
                key={department.id}
                className="p-4 flex items-center border border-gray-700 rounded-lg"
              >
                <div className="flex flex-col justify-center mr-4">
                  <div className="flex justify-start items-center">
                    <FaBuildingUser className="mr-3 text-green-400" />
                    <h2 className="text-xl font-semibold text-gray-300">
                      {department.name}
                    </h2>
                  </div>
                  <p className="ml-4 text-sm text-gray-400">
                    {department.description}
                  </p>
                </div>
                <button onClick={()=> handleDelete(department.id)} className="ml-auto px-3 py-1 text-sm text-white rounded hover:bg-red-600 transition-colors duration-200 border border-red-600">
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="col-span-2 mx-10 flex items-start justify-center">
            <button className="px-4 py-2 text-white rounded hover:bg-blue-600 transition-colors duration-200 border border-blue-600">
              <Link href="/departments/new">
                Add Department{" "}
                <IoMdAddCircle className="inline-block ml-1 mb-1 text-blue-400" />
              </Link>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from 'react-select';
import { api } from "@/utils/wretch";
import toast from 'react-hot-toast';
import { DepartmentResponse, Department } from "@/utils/response-types";
import Link from "next/link";



export default function AddEmployeePage() {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        department_id: 0,
    });
    const [departments, setDepartments] = useState<Department[]>([]);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await api.post(formData, "/employees/").json();
            toast.success("Employee added successfully!");
            router.push("/employees");
        }
        catch(error){
            error.response.json().then((data) => {
                toast.error(`Failed to add employee. ${data.error || 'Unknown error'}`);
            });
        }
    }

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response: DepartmentResponse = await api.get("/departments/").json();
                setDepartments(response.departments);
                if (response.departments.length === 0 ){
                    toast.error("Please create atleast one department in the system to create first employee", {
                        duration:1000*10
                    })
                }
            } catch (error) {
                toast.error(`Failed to fetch departments. Please try again later. ${error instanceof Error ? error.message : "Unknown error"}`);
            }
        }

        fetchDepartments();
    }, []);

    console.log(departments)
    return (
        departments.length === 0 ? 
        <div className="flex flex-col items-center justify-center font-bold h-full p-10">
            There is no department Exist in the system <br/>
            In order to create Employee you have to create atleast one Department
            <Link href={"/departments/new"} className="text-blue-400 mt-10">Click to create your first Department</Link>
        </div> :
        <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex w-full flex-col py-8 px-16 bg-black">
                <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                    Add New Employee
                </h1>
                <div>
                    {/* Form fields for adding a new employee */}
                    <form className="mt-8 space-y-6 w-[60%]" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                <input onChange={(e)=>setFormData({...formData, full_name: e.target.value})} value={formData.full_name} id="name" name="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-300 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Full Name" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input onChange={(e)=>setFormData({...formData, email: e.target.value})} value={formData.email} id="email" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-300 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email Address" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                <Select
                                    id="department"
                                    instanceId="department-select"
                                    options={departments.map(dept => ({ value: dept.id, label: dept.name }))}
                                    onChange={(selectedOption) => setFormData({...formData, department_id: selectedOption ? selectedOption.value : 0})}
                                    placeholder="Select Department"
                                    classNames={{
                                        control: (state) => `!bg-black !text-gray-300 ${state.isFocused ? '!border-blue-500' : '!border-gray-300'} !focus:outline-none !focus:ring-blue-500 !focus:border-blue-500`,
                                        menu: () => "text-gray-300 !bg-black !border !border-gray-300",
                                        option: (state) => `!bg-black ${state.isFocused ? '!bg-gray-700' : ''} ${state.isSelected ? '!bg-blue-700 !text-white' : ''}`,
                                        singleValue: () => "!text-gray-300",
                                    }}
                                    classNamePrefix="department-select"
                                />
                                
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Add Employee
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
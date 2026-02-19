"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/wretch";
import toast from 'react-hot-toast';




export default function AddDepartmentPage() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post(formData, "/departments/").json();
            toast.success("Department created successfully!");
            router.push("/departments");
        } catch (error) {
            toast.error("Failed to create department. Please try again.");
            console.error("Error creating department:", error);
        }
    }

    return (
        <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex w-full flex-col py-8 px-16 bg-black">
                <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                    Add New Department
                </h1>
                <div>
                    {/* Form fields for adding a new employee */}
                    <form className="mt-8 space-y-6 w-[60%]" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department Name</label>
                                <input onChange={(e)=>setFormData({...formData, name: e.target.value})} value={formData.name} id="name" name="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-300 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Full Name" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea onChange={(e)=>setFormData({...formData, description: e.target.value})} value={formData.description} id="description" name="description" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-300 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Description" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Add Department
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
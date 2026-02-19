
export type Department = {
  id: number;
  name: string;
  description: string;
};

export type DepartmentResponse = {
  departments: Department[];
};


export type Employee = {
  id: number;
  full_name: string;
  email: string;
  department: number | string;
};

export type EmployeeResponse = {
  employees: Employee[];
};

export type AttendanceRecord = {
  id: number;
  date: string;
  status: boolean;
};

export type AttendanceResponse = {
  attendanceRecords: AttendanceRecord[];
};

export type CustomError = {
  error: string;
};

export type AttendancePieChartData = {
  statistics: [
    { status: boolean; count: number },
    { status: boolean; count: number }
  ]
};

export type OverviewStatistics = {
  total_employees: number;
  total_departments: number;
  total_attendance_records: number;
  average_attendance_per_employee: number;
};
import { Employee } from "@/entites/employee/model/employee";
import { EmployeesState } from "@/features/employee-details/model/employeesState";
import { EmployeeState } from "@/features/employee-details/store/EmployeeStore";
import { ErrorState } from "@/features/errors/model/errorState";

export interface RootState {
  employee: EmployeeState;
  employees: EmployeesState;
  error: ErrorState;
}
import { Employee } from "@/entites/employee/model/employee";
import { Debouncer } from "@/shared/utils/Debouncer.ts";

export interface EmployeesState {
  searchQuery: string;
  employees: Employee[];
  debouncer: Debouncer<() => void> | null;
  isLoading: boolean;
  currentPage: number;
  itemsPerPage: number;
}
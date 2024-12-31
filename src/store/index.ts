import Vuex from 'vuex';
import { RootState } from '@/store/types/store';
import employees from '@/features/search-employees/store/EmployeesStore';
import employee from "@/features/employee-details/store/EmployeeStore";
import error from "@/features/errors/store/ErrorStore";

export default new Vuex.Store<RootState>({
  modules: {
    employees,
    employee,
    error
  }
})
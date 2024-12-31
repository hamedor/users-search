import { Employee } from "@/entites/employee/model/employee";

export interface EmployeeState {
  employee: Employee | null;
}

export default {
  namespaced: true,
  state: {
    employee: null,
  } as EmployeeState,
  mutations: {
    SET_EMPLOYEE(state: EmployeeState, employee: Employee) {
      state.employee = employee;
    },
  },
  actions: {
    setEmployee({ commit }: { commit: Function }, employee: Employee) {
      commit("SET_EMPLOYEE", employee);
    },
  },
  getters: {
    user: (state: EmployeeState) => state.employee,
  },
};
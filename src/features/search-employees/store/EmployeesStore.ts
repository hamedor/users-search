import { Debouncer } from "@/shared/utils/Debouncer.ts";
import EmployeesService from "@/shared/api/EmployeesService";
import { Employee } from "@/entites/employee/model/employee";
import { EmployeesState } from "@/features/employee-details/model/employeesState";
import { ActionContext } from 'vuex';
import ErrorHandler from "@/shared/utils/Errorhandler";
import TestService from "@/shared/api/TestService";

export default {
  namespaced: true,
  state: {
    searchQuery: "",
    employees: [],
    debouncer: null,
    isLoading: false,
    currentPage: 1,
    itemsPerPage: 4,
  } as EmployeesState,
  mutations: {
    SET_SEARCH_QUERY(state: EmployeesState, query: string) {
      state.searchQuery = query;
    },
    SET_EMPLOYEES(state: EmployeesState, employees: Employee[]) {
      state.employees = employees;
    },
    SET_DEBOUNCER(state: EmployeesState, debouncer: Debouncer<() => void>) {
      state.debouncer = debouncer;
    },
    SET_CURRENT_PAGE(state: EmployeesState, page: number) {
      state.currentPage = page;
    },
    SET_ITEMS_PER_PAGE(state: EmployeesState, items: number) {
      state.itemsPerPage = items;
    },
    SET_IS_LOADING(state: EmployeesState, value: boolean) {
      state.isLoading = value;
    }
  },
  actions: {
    async triggerError500({ commit }: ActionContext<EmployeesState, any>) {
      try {
        commit('SET_IS_LOADING', true); 
        await TestService.getStatus500();
      } catch (error) {
        ErrorHandler.handle(error instanceof Error ? error : new Error(String(error)));
      } finally {
        commit('SET_IS_LOADING', false); 
      }
    },
    async triggerError400({ commit }: ActionContext<EmployeesState, any>) {
      try {
        commit('SET_IS_LOADING', true); 
        await TestService.getStatus400();
      } catch (error) {
        ErrorHandler.handle(error instanceof Error ? error : new Error(String(error)));
      } finally {
        commit('SET_IS_LOADING', false); 
      }
    },
    initializeDebouncer({ state, commit, dispatch }: ActionContext<EmployeesState, any>) {
      if (!state.debouncer) {
        const debouncer = new Debouncer(() => {
          dispatch("fetchEmployees");
        }, 500);
        commit("SET_DEBOUNCER", debouncer);
      }
      if(state.searchQuery) {
        commit("SET_IS_LOADING", true);
      }
    },

    updateSearchQuery(
      { commit, dispatch, state }: ActionContext<EmployeesState, any>, 
      searchQuery: string
    ) {
      commit("SET_SEARCH_QUERY", searchQuery);

      if (!searchQuery.trim()) {
        dispatch("employee/setEmployee", null, { root: true });
      }

      dispatch("initializeDebouncer");
      state.debouncer?.call();
    },

    async fetchEmployees(
      { state, commit }: ActionContext<EmployeesState, any>
    ) {
      const query = state.searchQuery.trim();
  
      if (!query) {
        commit('SET_EMPLOYEES', []);
        commit("SET_IS_LOADING", false);
        return;
      }
    
      try {
        const searchValues = parseSearchQuery(query);
        const { ids, usernames } = categorizeSearchValues(searchValues);
  
        const [usersByUsername, usersById] = await Promise.all([
          EmployeesService.getUsersByUsername(usernames),
          EmployeesService.getUsersById(ids),
        ]);
  
        const uniqueEmployees = combineEmployees(usersByUsername, usersById);
        commit('SET_EMPLOYEES', uniqueEmployees);
        commit('SET_CURRENT_PAGE', 1);
      } catch (error) {
        ErrorHandler.handle(error instanceof Error ? error : new Error(String(error)));
        commit('SET_EMPLOYEES', []);
      } finally {
        commit('SET_IS_LOADING', false);
      }
    },

    changePage(
      { commit }: ActionContext<EmployeesState, any>,
      page: number
    ) {
      commit('SET_CURRENT_PAGE', page);
    },

    setItemsPerPage(
      { commit }: ActionContext<EmployeesState, any>,
      items: number
    ) {
      commit('SET_ITEMS_PER_PAGE', items);
    },
  },
  getters: {
    isSearchStarted: (state: EmployeesState) => state.searchQuery !== "",
    employees: (state: EmployeesState) => state.employees,
    isSearchResultEmpty: (state: EmployeesState, getters: any) =>
      getters.isSearchStarted && state.employees.length === 0,
    paginatedEmployees: (state: EmployeesState) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return state.employees.slice(start, end);
    },
    currentPage: (state: EmployeesState) => state.currentPage,
    itemsPerPage: (state: EmployeesState) => state.itemsPerPage,
    totalEmployees: (state: EmployeesState) => state.employees.length,
    isLoading: (state: EmployeesState) => state.isLoading,
  },
};

function parseSearchQuery(query: string): string[] {
  return query
    .split(',')
    .map((val) => val.trim())
    .filter((val) => val !== '');
}

function categorizeSearchValues(values: string[]): { ids: string[]; usernames: string[] } {
  return values.reduce(
    (acc, value) => {
      if (!isNaN(Number(value))) {
        acc.ids.push(value);
      } else {
        const capitalizedUsername =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        acc.usernames.push(capitalizedUsername);
      }
      return acc;
    },
    { ids: [] as string[], usernames: [] as string[] }
  );
}

function combineEmployees(usersByUsername: Employee[], usersById: Employee[]): Employee[] {
  const usersByUsernameMap = new Map<number, Employee>();

  usersByUsername.forEach((user) => usersByUsernameMap.set(user.id, user));
  usersById.forEach((user) => {
    if (!usersByUsernameMap.has(user.id)) {
      usersByUsernameMap.set(user.id, user);
    }
  });

  return Array.from(usersByUsernameMap.values());
}
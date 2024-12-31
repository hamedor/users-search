import { Error, ErrorState } from '@/features/errors/model/errorState';

export default {
  namespaced: true,
  state: {
    errors: [],
  } as ErrorState,
  mutations: {
    ADD_ERROR(state: ErrorState, error: Error) {
      state.errors.push(error);
    },
    REMOVE_ERROR(state: ErrorState, id: number) {
      state.errors = state.errors.filter(error => error.id !== id);
    },
  },
  actions: {
    addError({ commit }: { commit: Function }, message: string) {
      const id = Date.now() + Math.random(); 
      commit('ADD_ERROR', { id, message });
      setTimeout(() => {
        commit('REMOVE_ERROR', id);
      }, 5000);
    },
    removeError({ commit }: { commit: Function }, id: number) {
      commit('REMOVE_ERROR', id);
    },
  },
  getters: {
    allErrors: (state: ErrorState) => state.errors,
    hasErrors: (state: ErrorState) => state.errors.length > 0,
  },
};
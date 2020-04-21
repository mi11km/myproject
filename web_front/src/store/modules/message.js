const message = {
  namespaced: true,
  state: {
    successMessage: null,
    errorMessage: null,
  },
  getters: {
    successMessage: (state) => state.successMessage,
    errorMessage: (state) => state.errorMessage,
  },
  mutations: {
    setSuccessMessage(state, message) {
      state.successMessage = message;
    },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
    set(state, message) {
      state.successMessage = message;
      state.errorMessage = message;
    },
    clear(state) {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
};

export default message;

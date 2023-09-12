export const state = () => ({
  boards: [],
  singleBoard: {},
  isLoading: false,
  currentBoardId: "",
  currentColumns: [],
});

export const mutations = {
  GET_BOARDS(state, data) {
    state.boards = data;
  },
  GET_SINGLE_BOARD(state, data) {
    state.singleBoard = data;
  },

  SET_LOADING(state, value) {
    state.isLoading = value;
  },
  SET_CURRENT_BOARD_ID(state, value) {
    state.currentBoardId = value;
  },
  ADD_COLUMN_DETAILS(state, { name, id }) {
    state.currentColumns.push({ columnName: name, columnId: id });
  },
  CLEAR_CURRENT_COLUMNS(state) {
    state.currentColumns = [];
  },
};

export const actions = {
  // GET all boards
  async fetchBoards({ commit }) {
    commit("SET_LOADING", true);
    try {
      const response = await this.$axios.$get("/boards");
      commit("GET_BOARDS", response);
    } catch (error) {
      console.error("Error when fetching boards: ", error);
    }
    commit("SET_LOADING", false);
  },

  // POST new board name and columns
  async postBoardAndColumns({ dispatch, commit }, newBoard) {
    try {
      await this.$axios.$post("/boards", newBoard, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await dispatch("fetchBoards");
    } catch (error) {
      console.error("Error when posting boards", error);
    }
  },

  // GET board by ID
  async getBoard({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const response = await this.$axios.$get(`/boards/${id}`);
      commit("GET_SINGLE_BOARD", response);
    } catch (error) {
      console.error("Błąd podczas pobierania faktur:", error);
    }
    commit("SET_LOADING", false);
  },

    // Put a new task and subtask
    async putNewTask({ commit }, payload) {
        try {
          const { newTask, boardId, statusId } = payload
          await this.$axios.$post(
            `/boards/${boardId}/columns/${statusId}/tasks`,
            JSON.stringify(newTask),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
        } catch (error) {
          console.error('Error when sending new task:', error)
        }
      },

  // SET current board ID
  setCurrentBoardId({ commit }, id) {
    commit("SET_CURRENT_BOARD_ID", id);
  },
  // SET current columns
  setColumnDetails({ commit }, { name, id }) {
    commit("ADD_COLUMN_DETAILS", { name, id });
  },
  clearCurrentColumns({ commit }) {
    commit("CLEAR_CURRENT_COLUMNS");
  },
};

export const getters = {
  allBoards: (state) => state.boards,
  singleBoard: (state) => state.singleBoard,
  currentBoardId: (state) => state.currentBoardId,
  columnsDetails: (state) => state.currentColumns,
};

export const state = () => ({
  boards: [],
  singleBoard: {},
  isLoading: false,
  currentBoardId: "",
  currentColumns: [],
  currentBoardName: "",
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
  ADD_COLUMN_DETAILS(state, { name, id, tasks }) {
    state.currentColumns.push({ name: name, id: id, tasks: tasks });
  },
  CLEAR_CURRENT_COLUMNS(state) {
    state.currentColumns = [];
  },
  SET_CURRENT_BOARD_NAME(state, name) {
    state.currentBoardName = name;
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
  async postBoardAndColumns({ dispatch }, newBoard) {
    try {
      const response = await this.$axios.$post("/boards", newBoard, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await dispatch("fetchBoards");
      await dispatch("selectBoard", {
        name: response.name,
        _id: response._id.toString(),
        columns: response.columns, // Załóżmy, że odpowiedź API zawiera też kolumny
      });
    } catch (error) {
      console.error("Error when posting boards", error);
    }
  },

  //EDIT board name and columns

  async editBoardAndColumns({ dispatch, state }, editedBoard) {
    console.log("Dane z editedBoard z vuexa ", editedBoard);
    try {
      const currentBoardId = state.currentBoardId;

      if (currentBoardId) {
        await this.$axios.$put(`/boards/${currentBoardId}`, editedBoard, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      await dispatch("fetchBoards");
      // await dispatch("selectBoard", editedBoard);
      await dispatch("getBoard", currentBoardId);

    } catch (error) {
      console.error("Error when editing boards", error);
    }
  },

  // GET board by ID
  async getBoard({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      if (id) {
        const response = await this.$axios.$get(`/boards/${id}`);
        commit("GET_SINGLE_BOARD", response);
      }
    } catch (error) {
      console.error("Error when fetching single board:", error);
    }
    commit("SET_LOADING", false);
  },

  // Delete board by ID
  async deleteBoard({ commit }, id) {
    try {
      await this.$axios.$delete(`/boards/${id}`);
    } catch (error) {
      console.error("Error when deleting board", error);
    }
  },

  // Put a new task and subtask
  async putNewTask({ commit }, payload) {
    try {
      const { newTask, boardId, statusId } = payload;
      await this.$axios.$post(
        `/boards/${boardId}/columns/${statusId}/tasks`,
        JSON.stringify(newTask),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error when sending new task:", error);
    }
  },

  // SET CURRENT BOARD NAME
  async selectBoard({ dispatch, commit }, item) {
    try {
      console.log(JSON.stringify(item));
      await dispatch("clearCurrentColumns");
      commit("SET_CURRENT_BOARD_NAME", item.name);
      console.log('id w selectBoard w vuex ', item._id)
      await dispatch("setCurrentBoardId", item._id);
      await dispatch("getBoard", item._id);
      if (Array.isArray(item.columns)) {
        for (const column of item.columns) {
          await dispatch("setColumnDetails", {
            name: column.name,
            id: column._id,
            tasks: column.tasks,
          });
        }
      }
    } catch (error) {
      console.error("Błąd podczas wyboru boarda:", error);
    }
  },

  // SET current board ID
  setCurrentBoardId({ commit }, id) {
    console.log("Setting currentBoardId", id);
    commit("SET_CURRENT_BOARD_ID", id);
  },
  setCurrentBoardName({ commit }, name) {
    commit("SET_CURRENT_BOARD_NAME", name);
  },
  // SET current columns
  setColumnDetails({ commit }, { name, id, tasks }) {
    commit("ADD_COLUMN_DETAILS", { name, id, tasks });
  },
  setCurrentBoardStatuses({ commit }, name) {
    commit("SET_CURRENT_BOARD_NAME", name);
  },
  clearCurrentColumns({ commit }) {
    commit("CLEAR_CURRENT_COLUMNS");
  },
  clearDialog({ commit }) {
    commit("CLEAR_CURRENT_COLUMNS");
  },
};

export const getters = {
  allBoards: (state) => state.boards,
  singleBoard: (state) => state.singleBoard,
  currentBoardId: (state) => state.currentBoardId,
  columnsDetails: (state) => state.currentColumns,
  currentBoardName: (state) => state.currentBoardName,
};

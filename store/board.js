export const state = () => ({
    boards: [],
    singleBoard: {},
    isLoading: false,
  })

  export const mutations = {
    GET_BOARDS(state, data) {
      state.boards = data
    },
    GET_SINGLE_BOARD(state, data) {
        state.singleBoard = data
      },
    
    SET_LOADING(state, value) {
      state.isLoading = value
    },
  }

  export const actions = {

    // GET all boards
    async fetchBoards({ commit }) {
        commit('SET_LOADING', true)
        try {
          const response = await this.$axios.$get('/boards')
          commit('GET_BOARDS', response)
        } catch (error) {
          console.error('Error when fetching boards: ', error)
        }
        commit('SET_LOADING', false)
      },

   // POST new board name and columns
   async postBoardAndColumns({ dispatch, commit }, newBoard) {
    try {
      await this.$axios.$post('/boards', newBoard, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await dispatch('fetchBoards')
    } catch (error) {
      console.error('Error when posting boards', error)
    }
  },

    // GET board by ID
  async getBoard({ commit }, id) {
    commit('SET_LOADING', true)
    try {
      const response = await this.$axios.$get(`/boards/${id}`)
      commit('GET_SINGLE_BOARD', response)
    } catch (error) {
      console.error('Błąd podczas pobierania faktur:', error)
    }
    commit('SET_LOADING', false)
  },

  }

  export const getters = {
    allBoards: (state) => state.boards,
    singleBoard: (state) => state.singleBoard
  }
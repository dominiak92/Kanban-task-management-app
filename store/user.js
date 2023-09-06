export const state = () => ({
})

export const mutations = {}

export const actions = {

  
  logout() {
    try {
      this.$auth.logout()
      this.$router.push('/')
    } catch (error) {
      throw new Error('error')
    }
  },
}

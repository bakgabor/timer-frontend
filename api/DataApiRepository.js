export default (axios) => ({
  saveData(data) {
    return axios.$post('/api/timer/save', data)
  },

  loadData() {
    return axios.$get('/api/timer/load')
  }
})

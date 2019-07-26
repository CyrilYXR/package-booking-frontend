import axios from 'axios'

export default {
    loadPackageList({ commit }) {
        axios.get('http://localhost:8084/packages')
            .then(function (response) {
                commit('loadPackageList', response.data)
            }).catch(function (error) {
                console.log(error)
            })
    },
    filterByStatus({ commit }, status) {
        axios.get('http://localhost:8084/packages?status=' + status)
            .then(function (response) {
                commit('loadPackageList', response.data)
            }).catch(function (error) {
                console.log(error)
            })
    },
    addPackage({ commit }, addEntity) {
        addEntity.status = 0;
        axios.post('http://localhost:8084/packages', addEntity)
            .then(function (response) {
                axios.get('http://localhost:8084/packages')
                .then(function (response) {
                    commit('loadPackageList', response.data)
                }).catch(function (error) {
                    console.log(error)
                })
        }).catch(function (error) {
            console.log(error)
        })
}
}
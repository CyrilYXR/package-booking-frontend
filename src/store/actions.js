import axios from 'axios'

export default {
    loadPackageList({commit}){
        axios.get('http://localhost:8084/packages')
        .then(function(response){
            commit('loadPackageList', response.data)
        }).catch(function (error){
            console.log(error)
        })
    }
}
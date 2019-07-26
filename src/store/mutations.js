export default {
    loadPackageList(state, packages){
        state.packages = packages;
    },
    filterByStatus(state, status){
        state.packages = state.packages.filter(p => p.status === status)
    }
}
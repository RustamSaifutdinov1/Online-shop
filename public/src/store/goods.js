
const state={
    data: {},
    itemsOnPage:[],
    itemsInCart:[],
    countInCart:[],
}

const getters={
    getData: state=>state.data,
    getItemsOnPage:state=>state.itemsOnPage,
    getItemsInCart:state=>state.itemsInCart,
    getCountInCart:state=>state.countInCart,
}

const actions={
    requestData ({ commit }, page) {
        if (!page) {
            return
        }

        fetch(`/database${page}.json`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                commit('setData', data)
            })
    },
    addInCart({state,commit},id){
        commit('addInCart',id)
    }
}

const mutations={
    setData(state,newData){
        state.data=newData
        state.itemsOnPage = Object.keys(newData)
    },
    addInCart(state, id) {
        if(state.itemsInCart.indexOf(id)==-1) {
            state.itemsInCart.push(id)
            state.countInCart[id]=0
        }
        else
            state.countInCart[id]++
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
const state={
    data: {
        "1": {"id":1 , "name": "Good 1" , "price": 100},
        "2": {"id":2 , "name": "Good 1" , "price": 100},
        "3": {"id":3 , "name": "Good 1" , "price": 100},
        "4": {"id":4 , "name": "Good 1" , "price": 100},
        "5": {"id":5 , "name": "Good 1" , "price": 100},
        "6": {"id":6 , "name": "Good 1" , "price": 100},
        "7": {"id":7 , "name": "Good 1" , "price": 100},
        "8": {"id":8 , "name": "Good 1" , "price": 100},
        "9": {"id":9 , "name": "Good 1" , "price": 100},
        "10": {"id":10 , "name": "Good 1" , "price": 100},
    },
    itemsOnPage:["1","2"],
    itemsInCart:[],
}

const getters={
    getData: state=>state.data,
    getItemsOnPage:state=>state.itemsOnPage,
    getItemsInCart:state=>state.itemsInCart,
}

const actions={
    requestData(){

    },
    add
}

const mutations={
    setData(state,newData){
        state.data=newData
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
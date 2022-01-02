
const state = {
    stocks_arr :null,  
};

const getters = {
    all_stocks : (state) => {
        return state.stocks_arr
    }
};

const actions = {
    async fetchdata({commit}){
        await fetch('https://my-json-server.typicode.com/malihee/stock_trader/stocks')
        .then(response => response.json()).then(data => {
            //console.log(data[0])
            commit('setStock', data)
        });
    },
    async endDay({state, commit, rootState}){
        // console.log('hhhh',rootState);
        const max = 10
        const min = -5
        let priceChangeDomain 
        
        for(let i=0 ; i < state.stocks_arr.length; i++){
            priceChangeDomain = (Math.floor(Math.random()*(max - min))+ min)
            // console.log('stt: ', state.stocks_arr[i]);
            // let content ={
            //     name :  state.stocks_arr[i].name,
            //     price : state.stocks_arr[i].price + priceChangeDomain,
            //     quantity : state.stocks_arr[i].quantity
            // }
            // await fetch(`https://my-json-server.typicode.com/malihee/stock_trader/stocks/${state.stocks_arr[i].id}`,{
            //     method:'PUT',
            //     headers:{
            //         'Content-type':'application/json'
            //     },
            //     body:JSON.stringify(content)
            // }
            // )
            commit('changePrice', {stt: state.stocks_arr[i], how: priceChangeDomain})
            // state.stocks_arr[i].price =+ priceChangeDomain
        }
        for(let i=0 ; i < rootState.portfolio.portfolio.length; i++){
            // priceChangeDomain = (Math.floor(Math.random()*(max - min))+ min)
            let st = state.stocks_arr.filter(st => {
                 if(st.name == rootState.portfolio.portfolio[i].name){
                     return st.price
            }
            })
            console.log('p is ',st[0].price);
            priceChangeDomain = st[0].price - rootState.portfolio.portfolio[i].price
            console.log('pricechange',priceChangeDomain);
            
            // let content= {
            //     name:rootState.portfolio.portfolio[i].name,
            //     // price: rootState.portfolio.portfolio[i].price + priceChangeDomain,
            //     price: st[0].price,
            //     earn_quantity: rootState.portfolio.portfolio[i].earn_quantity,
            //     sell_quantity : rootState.portfolio.portfolio[i].sell_quantity
            // }
            // await fetch(`https://my-json-server.typicode.com/malihee/stock_trader/portfolio/${rootState.portfolio.portfolio[i].id}`,{
            //     method:'PUT',
            //     headers:{
            //         'Content-type':'application/json'
            //     },
            //     body:JSON.stringify(content)
            // }
            // )
            // console.log('sttt: ', rootState.portfolio.portfolio[i]);
            commit('changePrice', {stt: rootState.portfolio.portfolio[i], how: priceChangeDomain})
            // rootState.portfolio.portfolio[i].price =+ priceChangeDomain
        } 
       

        // await fetch(`http://localhost:5000/stocks/${payload.st.id}`,{
        //     method:'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body:JSON.stringify([...state.stocks_arr ,{price : payload.st.price + payload.domain}])
        // }
        // ).then(res => res.json())
        // .then( data=> console.log(data))
    }
};

const mutations = {
    setStock(state, data){
        state.stocks_arr = data
    },
    changePrice(state, payload){
        console.log(state);
        console.log('chnageprice:', payload);
        payload.stt.price +=  payload.how
    },

    // endDay(state, commit, rootState){
    //     console.log('hhhh',rootState);
    //     const max = 5
    //     const min = -5
    //     let priceChangeDomain 
    //     for(let i=0 ; i < state.stocks_arr.length; i++){
    //         priceChangeDomain = (Math.floor(Math.random()*(max - min))+ min)
    //         // commit('changePrice', {st:state.stocks_arr[i], how: priceChangeDomain})
    //         state.stocks_arr[i].price =+ priceChangeDomain
    //     }
    //     for(let i=0 ; i < rootState.portfolio.portfolio.length; i++){
            
    //         priceChangeDomain = (Math.floor(Math.random()*(max - min))+ min)
    //         // commit('changePrice', {st:state.stocks_arr[i], how: priceChangeDomain})
    //         rootState.portfolio.portfolio[i].price =+ priceChangeDomain
    //     }
    //     // dispach('endDay', {domain:priceChangeDomain, st:state.stocks_arr[i]})
    //     // console.log(state.stocks_arr.length,priceChangeDomain); 
    // }
};

export default {
    namespaced :true,
    state ,
    getters ,
    actions,
    mutations
}
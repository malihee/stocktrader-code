
const state = {
    fund : null,
    portfolio: null, 
    savedportfolio :null
};

const getters = {
    portfolioGetter(state) {
        console.log(state.portfolio);
        return state.portfolio;
    },
    getfund(state){
        return state.fund;
    }
};

const mutations = {
    setPortfolio(state, data){
        state.portfolio = data
    }, 
    setfund(state, data){
        state.fund = data.data
    },
    save_Portfolio(state){
        state.savedportfolio = null
        state.savedportfolio = JSON.parse(JSON.stringify(state.portfolio));
        // state.savedportfolio = state.portfolio.map((x)=>x)
        console.log('spp:', state.savedportfolio);
        // context.dispatch('savePortfolio')
    },
    load_Portfolio(state){
        state.portfolio = null
        console.log('sll:', state.savedportfolio);
        state.portfolio = JSON.parse(JSON.stringify(state.savedportfolio));

        // state.portfolio = state.savedportfolio.map((x)=>x)
        // dispatch('loadPortfolio')
    },
    DelPort(state,payload){
        state.portfolio[payload.index] = payload.content

    }
};

const actions = {

    async fetchPortfolio({state,commit}){
        await fetch('https://my-json-server.typicode.com/malihee/stock_trader/portfolio')
        .then (res => res.json())
        .then(data =>{
            commit('setPortfolio', data)
            // state.portfolio = data
            console.log(state.portfolio);
        })
    },
    async deleteStockfromPortfolio({state,dispatch}, payload){
       
        if (parseInt(payload.stock.sell_quantity) == payload.stock.earn_quantity){
        
            state.portfolio.splice(state.portfolio.findIndex(item=> item.name == payload.stock.name), 1)
            dispatch('increase_fund', {price:payload.stock.price, quantity: payload.stock.sell_quantity})
        }
        else if(parseInt(payload.stock.sell_quantity) < payload.stock.earn_quantity){
            let content = {
                name:payload.stock.name,
                price: payload.stock.price,
                earn_quantity: payload.stock.earn_quantity-parseInt(payload.stock.sell_quantity),
                sell_quantity : 0
            }
            // state.portfolio[state.portfolio.findIndex(item=> item.name == payload.stock.name)] = content
            let index = state.portfolio.findIndex(item=> item.name == payload.stock.name)
            state.portfolio[index].earn_quantity = content.earn_quantity
            // commit('DelPort', {index, content})
            dispatch('increase_fund',  {price:payload.stock.price , quantity: payload.stock.sell_quantity})
        }
        else{
            alert('its more than stock')
        }
    },

    async addToPortfolio({state, dispatch}, payload){
        // dispatch('fetchPortfolio')
        if (state.portfolio.filter(stock=> stock.name == payload.stock.name).length>0){
            let st = state.portfolio.filter(stock => stock.name == payload.stock.name)

            let content = {
                name: payload.stock.name,
                price: payload.stock.price,
                earn_quantity: (parseInt(st[0].earn_quantity )+ parseInt(payload.quantity)),
                sell_quantity : 0
            }

            // await fetch(`https://my-json-server.typicode.com/malihee/stock_trader/portfolio/${st[0].id}`,{
            //     method: 'PUT',
            //     headers:{
            //         'Content-type':'application/json'
            //     },
            //     body:JSON.stringify(content)
            //     }).then(res => res.json())
            //     .then((data) => {
            //         // alert('add-put')
                    const index = state.portfolio.findIndex(item=> item.name == payload.stock.name);
                    // console.log('i,v',index, data);
                    state.portfolio[index] = content 
        
            // )
            dispatch('decrease_fund', {price:payload.stock.price, quantity: payload.quantity})
        }

        else{
            let content = {
                "name" : payload.stock.name,
                "price": payload.stock.price,
                "earn_quantity": parseInt(payload.quantity),
                "sell_quantity": ''
            }
            // await fetch('https://my-json-server.typicode.com/malihee/stock_trader/portfolio',{
            //     method: 'POST',
            //     headers:{
            //         'Content-type':'application/json'
            //     },
            //     body:JSON.stringify(content)
            // }).then(res => res.json())
            //   .then(data =>  {console.log('data',data)
              state.portfolio.push(content)
            //    alert('add-post')
            // }
            //   )

            dispatch('decrease_fund', {price:payload.stock.price, quantity: payload.quantity})
        }     
    },
    
    async fetchfund({commit}){
        
        await fetch(`https://my-json-server.typicode.com/malihee/stock_trader/fund/1`,{
        }).then(res => res.json())
        .then(data => {
            console.log('state', data);
            commit('setfund', {data :data.fund})
})
    },
    async increase_fund({state}, payload){
        let temp = state.fund + (parseInt(payload.quantity)*parseInt(payload.price))
        // console.log(state.fund, parseInt(payload.quantity), parseInt(payload.price));
        // await fetch(`https://my-json-server.typicode.com/malihee/stock_trader/fund/1`,{
        //     method: 'PUT',
        //     headers:{
        //         'Content-type':'application/json'
        //     },
        //     body:JSON.stringify({id:1, fund:temp})
        // }).then(res => res.json())
         state.fund= temp
    },
    
    async decrease_fund({state}, payload){
        let temp = state.fund - (parseInt(payload.quantity)*parseInt(payload.price))
        // await fetch('https://my-json-server.typicode.com/malihee/stock_trader/fund/1',{
        //     method: 'PUT',
        //     headers:{
        //         'Content-type':'application/json'
        //     },
        //     body:JSON.stringify({id:1, fund:temp})
        // }).then(res => res.json())
        // .then(data => 
        state.fund=temp
    },

    async savePortfolio({commit}){
        commit('save_Portfolio')
        alert('Portfolio data is saved')
        // const savedPortfolio = state.savedportfolio
        // var sp =[]
        // console.log('sp:', savedPortfolio);
        // await fetch(`https://my-json-server.typicode.com/malihee/stock_trader/saved`, {
        // }).then(res => res.json())
        // .then(data => {
        //     console.log(data);
        //     sp = data
        // })
        // for (var i=0; i<sp.length; i++){
        //     await fetch(`https://my-json-server.typicode.com/malihee/stock_trader/saved/${sp[i].id}`, {
        //         method: 'DELETE',
        //     })
        // }
        // for (i=0; i<savedPortfolio.length; i++){
        //     await fetch('https://my-json-server.typicode.com/malihee/stock_trader/saved', {
        //         method: 'POST',
        //         headers:{
        //             'Content-type':'application/json'
        //         },
        //         body:JSON.stringify(savedPortfolio[i])
        //     })
        //     .then (res => res.json())
        //     .then(data =>{
        //         console.log(data);
        //     })
        // }
    }, 

    async loadPortfolio({commit}){
        commit('load_Portfolio')
        // const savedPortfolio = state.savedportfolio
        // // console.log('sp:', savedPortfolio);
        // let stock = []
        // await fetch('https://my-json-server.typicode.com/malihee/stock_trader/saved')
        // .then (res => res.json())
        // .then(data => { 
        //      stock = data
        // })
        
        // stock.filter(async (st) => {
        //     for (var i=0; i<state.portfolio.length; i++){
        //         if (state.portfolio[i].name == st.name){
        //             var ind =  state.portfolio[i].id
        //             await fetch(`https://my-json-server.typicode.com/malihee/stock_trader/portfolio/${ind}`,
        //             {
        //                 method: 'PUT',
        //                 headers:{
        //                     'Content-type':'application/json'
        //                 },
        //                 body:JSON.stringify(st)
        //             })
        //             state.portfolio[i] = st
        //         }
        //     }
          
        // })
    }, 
};


export default{
    namespaced :true,
    state,
    getters,
    mutations,
    actions,
}

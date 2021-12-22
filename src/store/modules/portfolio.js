
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
        state.savedportfolio = state.portfolio
        console.log('spp:', state.savedportfolio);
        // context.dispatch('savePortfolio')
    },
    loadPortfolio({state}){
        state.portfolio = state.savedportfolio
        // dispatch('loadPortfolio')
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
    async deleteStockfromPortfolio({state, dispatch}, payload){
        console.log(payload.stock.sell_quantity);
       
        if (parseInt(payload.stock.sell_quantity) == payload.stock.earn_quantity){
            // console.log('first');
            await fetch(`https://my-json-server.typicode.com/malihee/stock_trader/portfolio/${payload.stock.id}`,{
                method: 'DELETE',
            }).then(res => res.json())
              .then(data=> state.portfolio = data)
            // state.fund += payload.stock.sell_quantity*payload.stock.price
            dispatch('increase_fund', {price:payload.stock.price, quantity: payload.stock.sell_quantity})
        }
        else if(parseInt(payload.stock.sell_quantity) < payload.stock.earn_quantity){
            // console.log('second');
            let content = {
                name:payload.stock.name,
                price: payload.stock.price,
                earn_quantity: payload.stock.earn_quantity-parseInt(payload.stock.sell_quantity),
                sell_quantity : 0
            }
            await fetch(`https://my-json-server.typicode.com/malihee/stock_trader/portfolio/${payload.stock.id}`,{
                method: 'PUT',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(content)
            })
            // state.fund += payload.stock.sell_quantity*payload.stock.price
            dispatch('increase_fund',  {price:payload.stock.price, quantity: payload.stock.sell_quantity})
        }
        else{
            console.log('third');
            alert('its more than stock')
        }
    },

    async addToPortfolio({state, dispatch}, payload){
        dispatch('fetchPortfolio')
        if (state.portfolio.filter(stock=> stock.name == payload.stock.name).length>0){
            let st = state.portfolio.filter(stock => stock.name == payload.stock.name)

            let content = {
                name: payload.stock.name,
                price: payload.stock.price,
                earn_quantity: (parseInt(st[0].earn_quantity )+ parseInt(payload.quantity)),
                sell_quantity : 0
            }

            await fetch(`https://my-json-server.typicode.com/malihee/stock_trader/portfolio/${st[0].id}`,{
                method: 'PUT',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(content)
                }).then(res => res.json())
                .then((data) => {
                    alert('add-put')
                    const index = state.portfolio.findIndex(item=> item.name == data.name);
                    console.log(index, data);
                    state.portfolio[index] = data 
        }
            )
            dispatch('decrease_fund', {price:payload.stock.price, quantity: payload.quantity})
        }

        else{
            let content = {
                "name" : payload.stock.name,
                "price": payload.stock.price,
                "earn_quantity": parseInt(payload.quantity),
                "sell_quantity": ''
            }
            await fetch('https://my-json-server.typicode.com/malihee/stock_trader/portfolio',{
                method: 'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(content)
            }).then(res => res.json())
              .then(data =>  {console.log('data',data)
              state.portfolio.push(data)
               alert('add-post')}
              )

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
        console.log(state.fund, parseInt(payload.quantity), parseInt(payload.price));
        await fetch(`https://my-json-server.typicode.com/malihee/stock_trader/fund/1`,{
            method: 'PUT',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({id:1, fund:temp})
        }).then(res => res.json())
        .then(data => state.fund=data.fund)
    },
    
    async decrease_fund({state}, payload){
        let temp = state.fund - (parseInt(payload.quantity)*parseInt(payload.price))
        await fetch('https://my-json-server.typicode.com/malihee/stock_trader/fund/1',{
            method: 'PUT',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({id:1, fund:temp})
        }).then(res => res.json())
        .then(data => state.fund=data.fund)
    },

    async savePortfolio({state , commit}){
        commit('save_Portfolio')
        const savedPortfolio = state.savedportfolio
        var sp =[]
        console.log('sp:', savedPortfolio);
        await fetch(`https://my-json-server.typicode.com/malihee/stock_trader/saved`, {
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            sp = data
        })
        for (var i=0; i<sp.length; i++){
            await fetch(`https://my-json-server.typicode.com/malihee/stock_trader/saved/${sp[i].id}`, {
                method: 'DELETE',
            })
        }
        for (i=0; i<savedPortfolio.length; i++){
            await fetch('https://my-json-server.typicode.com/malihee/stock_trader/saved', {
                method: 'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(savedPortfolio[i])
            })
            .then (res => res.json())
            .then(data =>{
                console.log(data);
            })
        }
    }, 

    async loadPortfolio({state}){
        // commit('load_Portfolio')
        // const savedPortfolio = state.savedportfolio
        // console.log('sp:', savedPortfolio);
        let stock = []
        await fetch('https://my-json-server.typicode.com/malihee/stock_trader/saved')
        .then (res => res.json())
        .then(data => { 
             stock = data
        })
        
        stock.filter(async (st) => {
            for (var i=0; i<state.portfolio.length; i++){
                if (state.portfolio[i].name == st.name){
                    var ind =  state.portfolio[i].id
                    await fetch(`https://my-json-server.typicode.com/malihee/stock_trader/portfolio/${ind}`,
                    {
                        method: 'PUT',
                        headers:{
                            'Content-type':'application/json'
                        },
                        body:JSON.stringify(st)
                    })
                    state.portfolio[i] = st
                }
            }
          
        })
    }, 
};


export default{
    namespaced :true,
    state,
    getters,
    mutations,
    actions,
}

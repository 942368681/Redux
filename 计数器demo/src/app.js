import {
   createStore,
   combineReducers,
   applyMiddleware,
   bindActionCreators
} from 'redux';
import thunk from 'redux-thunk';
import {Provider,connect} from 'react-redux';
//初始整个应用的state
let initState = [
   {id:Math.random(),value:0},
   {id:Math.random(),value:1},
   {id:Math.random(),value:2},
   {id:Math.random(),value:3},
   {id:Math.random(),value:4}
];
//reducer
function counter(state = initState,action){
   let {type,id} = action;
   switch (type) {
      case 'INCREMENT':
         return state.map((e) => {
            if (e.id === id) {
               e.value++;
            }
            return e;
         });
         break;
      case 'DECREMENT':
         return state.map((e) => {
            if (e.id === id) {
               e.value--;
            }
            return e;
         })
         break;
      default:
         return state;
   };
}
//创建store,激活中间件
const store = createStore(counter,applyMiddleware(thunk));
//action创造函数
function increment(id) {
   return function(dispatch,getSate){
      dispatch({type:"INCREMENT",id});
   }
}
function decrement(id) {
   return function(dispatch,getSate){
      dispatch({type:"DECREMENT",id});
   }
}
function inIfOdd(id){
   return function(dispatch,getState){
      let state = getState();
      let counter = null;
      state.forEach((e) => {
         if (e.id === id) {
            counter = e;
         }
      })
      if (counter && !(counter.value%2===0)) {
         dispatch(increment(id));
      }
   }
}
function async(id){
   return function(dispatch){
      setTimeout(() => {
         dispatch(increment(id))
      },1500);
   }
}

class Counter extends Component{
   render(){
      let {id,value,actions} = this.props;
      let {
         increment, inIfOdd, decrement, async
      } = actions;
      return(
         <div className="counter">
             <button
                 className="decrement"
                 onClick={ev=>{decrement(id)}}
             >-</button>

             <span style={{margin: '0 10px'}} className="val">{value}</span>

             <button
                 className="increment"
                 onClick={ev=>{increment(id)}}
             >+</button>
             <button
                 className="odd"
                 onClick={ev=>{inIfOdd(id)}}
             >increment if odd</button>
             <button
                 className="async"
                 onClick={ev=>{async(id)}}
             >async increment</button>
         </div>
      );
   };
}

class App extends Component{
   render(){
      let {
         counters,
         actions
      } = this.props;
      let list = counters.map((e)=>{
         let data = {
            value:e.value,
            id:e.id,
            key:e.id,
            actions
         }
         return <Counter {...data} />
      })
      return (
         <div className = "box">
            {list}
         </div>
      );
   };
}
//让App拿到整个应用的数据
App = connect(
   (state)=>{
      return {counters:state};
   },
   (dispatch)=>{
      return{
         actions:bindActionCreators({
            increment, decrement, inIfOdd, async
         },dispatch)
      }
   }
)(App);
class Ap extends Component{
   render(){
      return(
         <App />
      );
   };
}
ReactDOM.render(
   <Provider store = {store}>
      <Ap />
   </Provider>,
   document.getElementById('root')
);

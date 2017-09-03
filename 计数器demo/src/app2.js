import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

function counter(state = {
   value: 0
}, action) {
   let {type, val} = action;
   let {value} = state;
   switch (type) {
      case 'INCREMENT':
         return {
            ...state,
            value: ++value
         };
      case 'DECREMENT':
         return {
            ...state,
            value: --value
         };
      default:
         return state;
   }
};

const store = createStore(counter, applyMiddleware(thunk));

function increment(val) {
    return function(dispatch, getState) {
        dispatch({type: "INCREMENT", val});
    }
}
function decrement() {
    return {type: "DECREMENT"};
}
function inIfOdd(val) {
    return function (dispatch, getState) {
        let state = getState();
        if(!(state.value%2===0)){
            dispatch(increment(val));
        }
    }
}
function async() {
    return function(dispatch) {
        setTimeout(()=>{
            dispatch(increment())
        }, 1500)
    }
}
const boundIncrement = (val) => {
   store.dispatch(increment(val));
}
const boundDecrement = () => {
   store.dispatch(decrement());
}
const boundInIfOdd = () => {
   store.dispatch(inIfOdd());
}
const boundAsync = () => {
   store.dispatch(async());
}

class Counter extends Component {
   render() {
      console.log(this.props);
      return (
         <div className="counter">
            <button
               className="less"
               onClick = {this.props.boundDecrement}
            >-</button>
            <span className="val">
               {this.props.value}
            </span>
            <button
               className="add"
               onClick = {this.props.boundIncrement}
            >+</button>
            <button
               className="odd"
               onClick = {this.props.boundInIfOdd}
            >increment if odd</button>
            <button
               className="async"
               onClick = {this.props.boundAsync}
            >async increment</button>
         </div>
      );
   };
};

store.subscribe(render);

function render(){
   ReactDOM.render(
      <Counter
         value = {store.getState().value}
         {...{boundIncrement,boundDecrement,boundInIfOdd,boundAsync}}
      />, document.getElementById('root')
   );
};
render();

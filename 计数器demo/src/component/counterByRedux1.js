import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

let $add = $('.add');
let $less = $('.less');
let $val = $('.val');
let $odd = $('.odd');
let $async = $('.async');

function counter(state={value: 0},action){
   let {type, val} = action;
   let {value} = state;
   switch (type) {
      case 'INCREMENT':
         return {...state,value:++value};
      case 'DECREMENT':
         return {...state,value:--value};
      default:
         return state;
   }
};

const store = createStore(counter,applyMiddleware(thunk));

let preVal = store.getState();

store.subscribe(() => {
   let curtVal = store.getState();
   $val.val(curtVal.value);
   console.log( preVal === curtVal, preVal, curtVal);
   preVal = curtVal;
});

$add.click(() => {
   store.dispatch({type:'INCREMENT'});
});
$less.click(() => {
   store.dispatch({type:'DECREMENT'});
});
/*$odd.click(() => {

});*/

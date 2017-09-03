import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

let $add = $('.add');
let $less = $('.less');
let $val = $('.val');
let $odd = $('.odd');
let $async = $('.async');

function counter(state=0,action){
   switch (action.type) {
      case 'INCREMENT':
         return ++state;
      case 'DECREMENT':
         return --state;
      default:
         return state;
   }
};

const store = createStore(counter,applyMiddleware(thunk));


store.subscribe(() => {
   let curtVal = store.getState();
   $val.val(curtVal);
});

$add.click(() => {
   store.dispatch({type:'INCREMENT'});
});
$less.click(() => {
   store.dispatch({type:'DECREMENT'});
});

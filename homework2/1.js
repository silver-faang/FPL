/*
write custom realization of method bind in javascript:
function bind(fn, context, args) {
//...
}
const foo = () => {};
const context = {}; // any context, object, array, etc.
const data = []; // any object, array, etc.
const bindedFunction = bind(foo, context, data);
*/

function bind(fn, context, args) {
  return function () {
    const combinedArgs = args.concat(Array.from(arguments));
    return fn.apply(context, combinedArgs);
  };
}

let foo = function (...arg) {
  console.log(this, ...arg);
};

const context = { name: 'John' };
const data = ['hello', "hi"];

const bindedFunction = bind(foo, context, data);

bindedFunction('world');

console.log('b starting');
export let done = false;
import * as a from './a.js';
console.log('in b, a.done = %j', a.done);
done = true;
console.log('b done');
export const another = 'esm b!';
import  { increment }  from './incrementReducer';
import  { subductionReducer }  from './subductionReducer';
import  * as asyncReducers  from './asyncReducers';

export default{
    ...asyncReducers,
    increment,
    subductionReducer,
    a:1,
}

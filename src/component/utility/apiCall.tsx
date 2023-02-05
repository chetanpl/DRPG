import axios from 'axios';
import { gridUpdate } from './typeref';

const apiActions={
     Get(url:string){
        return axios.get(url);
    },
     put(url:string, body:gridUpdate){
        return axios.put(url,{body});
    },
}
export default apiActions;
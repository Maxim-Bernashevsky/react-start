import { DELETE_ITEM, EDIT_ITEM, ADD_ITEM, LIKE_ITEM } from '../constants/item';
import { initialState } from '../store/dataList';

export default function list( state = initialState, action ) {

    switch (action.type) {
        case DELETE_ITEM:
            const filteredArray = {};
            filteredArray.data = state.data.filter(function(el) {
                return el.id !== action.payload;
            });
            return filteredArray;

        case EDIT_ITEM:
            const item = action.payload;
            for(let i = 0; i < state.data.length; i++){
                if(state.data[i].id === item.id){
                    state.data[i].title = item.title;
                    state.data[i].subtitle = item.subtitle;
                    state.data[i].logoUrl = item.logoUrl;
                    break;
                }
            }
            state = Object.assign({}, state);
            return state;

        case ADD_ITEM:
            const data = action.payload;
            function uniqueId(data) {
                const newId = Math.floor(Math.random() * 100);
                const lengthData = data.filter( el => (el.id === newId) );
                return lengthData.length === 0 ? newId : uniqueId();
            }
            data.id = uniqueId(state.data);
            console.log(state.data);
            state.data = state.data.concat(data);
            state = Object.assign({}, state);
            return state;

        case LIKE_ITEM:
            const id = action.payload.id;
            const like = action.payload.like;

            for(let i = 0; i < state.data.length; i++){
                if(state.data[i].id === id){
                    state.data[i].like = like + 1;
                    break;
                }
            }
            state = Object.assign({}, state);
            return state;

        default:
            return state;
    }

}




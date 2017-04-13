import { DELETE_ITEM, EDIT_ITEM, ADD_ITEM, LIKE_ITEM } from '../constants/item';

export const deleteItem = id => {
    return {
        type: DELETE_ITEM,
        payload: id
    };
};

export const editItem = item => {
    return {
        type: EDIT_ITEM,
        payload: item
    };
};

export const addItem = item => {
    return {
        type: ADD_ITEM,
        payload: item
    };
};

export const likeItem = (id, like) => {
    return {
        type: LIKE_ITEM,
        payload: {
            like: like,
            id: id
        }
    };
};


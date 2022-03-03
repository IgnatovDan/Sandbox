import { SHOPPING_ITEM_CREATED, SHOPPING_LIST_CREATED } from '../eventTypes';

export default {
    createShoppingList: (state, { payload: { name }, aggregateId }) => {
        console.log('> createShoppingList, ' + aggregateId);
        if (!name) throw new Error('The "name" field is required');
        if (state && state.createdAt) throw new Error('Shopping list already exists');

        console.log('< createShoppingList');
        return {
            type: SHOPPING_LIST_CREATED,
            payload: { name },
        };
    },
    createShoppingItem: (state, { payload: { id, text } }) => {
        console.log("> createShoppingItem");
        if (!id) throw new Error('The "id" field is required')
        if (!text) throw new Error('The "text" field is required')
        if (!state || !state.createdAt) {
            throw new Error('Shopping list does not exist');
        }
        console.log("< createShoppingItem");
        return {
            type: SHOPPING_ITEM_CREATED,
            payload: { id, text },
        };
    },
};

import { SHOPPING_LIST_CREATED } from "../eventTypes";

export default {
    Init: async (store) => {
        console.log('read-models/shopping_lists.projection.Init')
        await store.defineTable(
            'ShoppingLists',
            {
                indexes: { id: 'string' },
                fields: ['createdAt', 'name'],
            }
        );
    },

    [SHOPPING_LIST_CREATED]: async (store, {
        aggregateId, timestamp, payload: { name }
    }) => {
        console.log('read-models/shopping_lists.projection.SHOPPING_LIST_CREATED')
        const shoppingList = {
            id: aggregateId,
            name,
            createdAt: timestamp,
        };
        await store.insert('ShoppingLists', shoppingList);
    }
};
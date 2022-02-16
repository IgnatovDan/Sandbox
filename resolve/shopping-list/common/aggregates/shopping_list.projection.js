import { SHOPPING_LIST_CREATED } from "../eventTypes";

export default {
    Init: () => ({}),
    [SHOPPING_LIST_CREATED]: (state, { timestamp }) => {
        console.log('projection: [SHOPPING_LIST_CREATED]');
        
        return {
            ...state,
            createdAt: timestamp,
        };
    },
};

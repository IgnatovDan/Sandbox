import { SHOPPING_LIST_CREATED } from "../eventTypes";

export default {
    Init: () => ({}),
    [SHOPPING_LIST_CREATED]: (state, { timestamp, aggregateId }) => {
        console.log('projection: [SHOPPING_LIST_CREATED], ' + aggregateId);
        
        return {
            ...state,
            createdAt: timestamp,
        };
    },
};

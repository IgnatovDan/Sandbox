export default {
    all: async (store) => {
        console.log('read-models/shopping_lists.resolvers.all')
        const result = await store.find('ShoppingLists', {}, null);
        console.log(result);
        return result;
    },
};
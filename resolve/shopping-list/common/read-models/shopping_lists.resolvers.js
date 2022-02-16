export default {
    all: async (store) => {
        console.log('read-models/shopping_lists.resolvers.all')
        const result = await store.find('ShoppingLists', {}, null, { createdAt: 1 });
        console.log(result);
        return result;
    },
};
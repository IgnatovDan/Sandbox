import { Selector, t } from 'testcafe'
import fetch from 'isomorphic-fetch'

const host = process.env.HOST || 'localhost'
const MAIN_PAGE = `http://${host}:3000`
// eslint-disable-next-line no-unused-expressions, no-undef
fixture`reSolve Application`.beforeEach(async (t) => {
  await t.setNativeDialogHandler(() => true)
  // Your app does not currently have a frontend, so comment out the line below.
  // await t.navigateTo(MAIN_PAGE)
})

test('validation should work correctly', async () => {
    const matches = [
      {
        command: {
          aggregateName: 'ShoppingList',
          aggregateId: 'shopping-list-2',
          type: 'createShoppingList',
          payload: {},
        },
        error: 'The "name" field is required',
      },
      {
        command: {
          aggregateName: 'ShoppingList',
          aggregateId: 'shopping-list-1',
          type: 'createShoppingList',
          payload: {
            name: 'List 1',
          },
        },
        error: 'Shopping list already exists',
      },
      {
        command: {
          aggregateName: 'ShoppingList',
          aggregateId: 'shopping-list-4000',
          type: 'createShoppingItem',
          payload: {
            id: '5',
            text: 'Bread',
          },
        },
        error: 'Shopping list does not exist',
      },
    ]
  
    for (const match of matches) {
      const response = await fetch(`${MAIN_PAGE}/api/commands`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(match.command),
      })
  
      const error = await response.text()
  
      await t.expect(error).contains(match.error)
    }
  })
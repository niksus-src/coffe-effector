import { createEvent, createStore } from 'effector'
import { Basket, ChangeCountBasket, Coffe } from '../../components/types'
import { persist } from 'effector-storage/session'

const $basket = createStore<Basket | null>(null)
$basket.watch((state) => console.log(state))

const delItem = createEvent<string>()
const delAllItem = createEvent()
const insertItem = createEvent<Basket | null>()
const changeAmount = createEvent<ChangeCountBasket>()

$basket.on(delItem, (state, payload) => state?.filter((item) => item.id !== payload))
$basket.on(delAllItem, () => null)
$basket.on(insertItem, (_, payload) => payload)

const insertItemFn = (coffe: Coffe, count: number, actualHeft: string) => {
  const basket = $basket.getState()
  if (basket) {
    const actualBasketItem = basket.find((item) => item.id === `${coffe._id}/${actualHeft}`)
    if (actualBasketItem) {
      actualBasketItem.amount = count
      const newBasket = basket.map((item) => {
        if (item.id === `${coffe._id}/${actualHeft}`) {
          item.amount = count
        }
        return item
      })
      insertItem(newBasket)
    } else {
      const newBasket = [
        ...basket,
        {
          id: `${coffe._id}/${actualHeft}`,
          imgSrc: coffe.imgSrc,
          name: coffe.name,
          heft: actualHeft,
          amount: count,
          price: coffe?.price[actualHeft],
        },
      ]
      insertItem(newBasket)
    }
  } else {
    const newBasket = coffe && [
      {
        id: `${coffe._id}/${actualHeft}`,
        imgSrc: coffe.imgSrc,
        name: coffe.name,
        heft: actualHeft,
        amount: count,
        price: coffe?.price[actualHeft],
      },
    ]
    insertItem(newBasket)
  }
}

const changeCountItem = (id: string, count: number) => {
  const basket = $basket.getState()
  if (basket) {
    const newBasket = basket.map((item) => {
      if (item.id === id) {
        item.amount = count
      }
      return item
    })
    basketService.insertItem(newBasket)
  }
}

persist({ store: $basket, key: 'basket' })

export const basketService = {
  changeCountItem,
  insertItemFn,
  changeAmount,
  insertItem,
  delAllItem,
  delItem,
  $basket,
}

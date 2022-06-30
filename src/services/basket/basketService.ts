import { createEvent, createStore, forward, guard, sample } from 'effector'
import { Basket, Coffe } from '../../components/types'
import { persist } from 'effector-storage/session'
import { api } from '../api'
import { createEffect } from 'effector/effector.umd'
import { appService, notNull } from '../app/appService'

const $basket = createStore<Basket | null>(null)
$basket.watch((state) => console.log(state))

const delItem = createEvent<string>()
const delAllItem = createEvent()
const insertItem = createEvent<{
  coffe: Coffe
  count: number
  actualHeft: string
}>()
const changeAmount = createEvent<{
  id: string
  count: number
}>()

$basket.on(delItem, (state, payload) => state?.filter((item) => item.id !== payload))
$basket.on(delAllItem, () => null)

sample({
  clock: insertItem,
  source: $basket,
  fn: (source, clock) => {
    const { coffe, count, actualHeft } = clock
    const basket = source
    if (basket) {
      const actualBasketItem = basket.find((item) => item.id === `${coffe._id}/${actualHeft}`)
      if (actualBasketItem) {
        const newBasket = basket.map((item) => {
          if (item.id === `${coffe._id}/${actualHeft}`) {
            item.amount += count
          }
          return item
        })
        return newBasket
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
        return newBasket
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
      return newBasket
    }
  },
  target: $basket,
})

sample({
  clock: changeAmount,
  source: guard({
    source: $basket,
    filter: notNull,
  }),
  fn: (source, clock) => {
    return source.map((item) => {
      if (item.id === clock.id) {
        item.amount = clock.count
      }
      return item
    })
  },
  target: $basket,
})

persist({ store: $basket, key: 'basket' })

const $allTotal = createStore(0)

sample({
  clock: [delItem, delAllItem, insertItem, changeAmount],
  source: $basket,
  fn: (source) =>
    source ? source.reduce((allTotal, next) => allTotal + next.price * next.amount, 0) : 0,
  target: $allTotal,
})

const $resAddOrder = createStore('')
const addOrderEvent = createEvent<any>()
const fetchAddOrderFx = createEffect({ handler: addOrder })

$resAddOrder.on(fetchAddOrderFx.doneData, (_, payload) => payload)

forward({
  from: addOrderEvent,
  to: fetchAddOrderFx,
})

//ASYNC

async function addOrder(orderData: { id: string; basket: []; discount: number }) {
  const newOrder = {
    id: orderData.id,
    discount: orderData.discount,
    products: orderData.basket,
  }
  const res = await api.post(`/accounts/addOrder`, newOrder)

  appService.ordersEvent(orderData.id)
  return res.data
}

export const basketService = {
  $resAddOrder,
  addOrderEvent,
  $allTotal,
  changeAmount,
  insertItem,
  delAllItem,
  delItem,
  $basket,
}

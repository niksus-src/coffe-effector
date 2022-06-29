import { createEvent, createStore, forward } from 'effector'
import { Basket, ChangeCountBasket, Coffe, Login } from '../../components/types'
import { persist } from 'effector-storage/session'
import basket from '../../components/basket/Basket'
import { api } from '../api'
import { Order } from '../../components/types'
import { createEffect } from 'effector/effector.umd'
import { appService } from '../app/appService'

const $basket = createStore<Basket | null>(null)
$basket.watch((state) => console.log(state))

const delItem = createEvent<string>()
const delAllItem = createEvent()
const insertItem = createEvent<Basket | null>()
const changeAmount = createEvent<ChangeCountBasket>()

$basket.on(delItem, (state, payload) => state?.filter((item) => item.id !== payload))
$basket.on(delAllItem, () => null)
$basket.on(insertItem, (_, payload) => {
  console.log('kek')
  return payload
})

const insertItemFn = (coffe: Coffe, count: number, actualHeft: string) => {
  const basket = $basket.getState()
  if (basket) {
    const actualBasketItem = basket.find((item) => item.id === `${coffe._id}/${actualHeft}`)
    if (actualBasketItem) {
      const newBasket = basket.map((item) => {
        if (item.id === `${coffe._id}/${actualHeft}`) {
          item.amount += count
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

const allTotal = () => {
  const basket = $basket.getState()
  if (basket) {
    const allTotal = basket?.reduce((allTotal, next) => allTotal + next.price * next.amount, 0)
    return allTotal
  } else return 0
}

persist({ store: $basket, key: 'basket' })

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
  allTotal,
  changeCountItem,
  insertItemFn,
  changeAmount,
  insertItem,
  delAllItem,
  delItem,
  $basket,
}

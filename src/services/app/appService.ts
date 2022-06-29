import { createStore, createEvent, createEffect, forward, sample, guard } from 'effector'
import { api } from '../api'

import { Account, Coffe, coffeType, Login, loginRes } from '../../components/types'
import { ChangeEvent } from 'react'

//ISLOGIN
const $isLogin = createStore(false)

const setIsLogin = createEvent<boolean>()

$isLogin.on(setIsLogin, (_, payload) => payload)
$isLogin.watch((state) => console.log('isLogin', state))

//COFFES FETCH
const initStateCoffes = {
  length: 0,
  data: [],
}
const $coffes = createStore<coffeType>(initStateCoffes)
const $foundCoffes = createStore<coffeType>(initStateCoffes)
const $coffe = createStore<Coffe | null>(null)

const $offset = createStore<number>(6)
const $isLoading = createStore(true)

const fetchCoffesFx = createEffect({ handler: fetchCoffes })
const fetchCoffeFx = createEffect({ handler: fetchCoffe })
const fetchFoundCoffesFx = createEffect({ handler: fetchSearch })

const fetchCoffesOffset = createEvent()
const fetchCoffeById = createEvent<string>()
const fetchFoundCoffes = createEvent<string>()
const setLoading = createEvent<boolean>()
const setOffset = createEvent<number>()

$coffes.on(fetchCoffesFx.doneData, (_, payload) => payload)
$coffe.on(fetchCoffeFx.doneData, (_, payload) => payload)

$foundCoffes.on(fetchFoundCoffesFx.doneData, (_, payload) => payload)

$isLoading.on(setLoading, (_, payload) => {
  return payload
})

$offset.on(setOffset, (_, payload) => {
  return payload
})

$coffes.watch((state) => console.log('coffes: ', state))

$isLoading.watch((state) => console.log('isloading: ', state))

$offset.watch((state) => console.log('offset: ', state))

forward({
  from: fetchCoffesOffset,
  to: fetchCoffesFx,
})

forward({
  from: fetchCoffeById,
  to: fetchCoffeFx,
})

forward({
  from: fetchFoundCoffes,
  to: fetchFoundCoffesFx,
})

//ACCOUNTS FETCH

const $registerResult = createStore<string | null>(null)
const $loginResult = createStore<loginRes | null>(null)

const registerEvent = createEvent<Account>()
const fetchRegisterFx = createEffect({ handler: fetchRegister })

const loginEvent = createEvent<Login>()
const fetchLoginFx = createEffect({ handler: fetchLogin })
const fetchOrdersFx = createEffect({ handler: fetchOrders })

const ordersEvent = createEvent<string>()

$registerResult.on(fetchRegisterFx.doneData, (_, payload) => payload)
$registerResult.watch((state) => console.log(state))

$loginResult.on(fetchLoginFx.doneData, (_, payload) => payload)
// $loginResult.on(fetchOrdersFx.doneData, (state, payload) => {
//   const newLoginRes: loginRes = {
//       ...state!,
//     data: { ...state!.data!, orders: payload },
//   }
//   console.log(newLoginRes)
//   return newLoginRes
// })

const notNull = <T>(payload: T): payload is Exclude<T, null> => payload !== null

sample({
  source: guard({
    source: $loginResult,
    filter: notNull,
  }),
  clock: fetchOrdersFx.doneData,
  fn: (state, clock) => ({ ...state, data: { ...state.data, orders: clock } }),
  target: $loginResult,
})
$loginResult.watch((state) => console.log(state))

forward({
  from: registerEvent,
  to: fetchRegisterFx,
})

forward({
  from: loginEvent,
  to: fetchLoginFx,
})
forward({
  from: ordersEvent,
  to: fetchOrdersFx,
})

//Async

async function fetchCoffes() {
  const res = await api.get(`/products-coffe`)

  setLoading(false)
  return res.data
}

async function fetchCoffe(id: string) {
  setLoading(true)
  const res = await api.get(`/products-coffe/${id}`)

  setLoading(false)
  return res.data
}

async function fetchSearch(search: string) {
  setLoading(true)
  const res = await api.get(`/products-coffe/search/${search}`)

  setLoading(false)
  return res.data
}

async function fetchRegister(account: Account) {
  setLoading(true)
  const res = await api.post(`/accounts/register`, { ...account, discount: 0 })
  setLoading(false)
  return res.data
}

async function fetchLogin(accountData: Login) {
  setLoading(true)
  const res = await api.post(`/accounts/login`, accountData)
  setLoading(false)
  res.data.login && setIsLogin(true)
  return res.data
}

async function fetchOrders(id: string) {
  const res = await api.get(`/accounts/getOrders/${id}`)
  return res.data
}

const handlerCount = (increase: number, count: number, setCount: (amount: number) => void) => {
  if ((count === 1 && increase < 1) || (count > 98 && increase > 0)) return
  setCount(count + increase)
}

const changeCount = (e: ChangeEvent<HTMLInputElement>, setCount: (amount: number) => void) => {
  const target = e.target.value
  if (target.match(/^\d+$/) !== null && +target < 100) setCount(+target)
}

export const appService = {
  ordersEvent,
  handlerCount,
  changeCount,
  fetchCoffeById,
  setIsLogin,
  fetchCoffesOffset,
  setOffset,
  setLoading,
  fetchFoundCoffes,
  registerEvent,
  loginEvent,
  $coffes,
  $isLoading,
  $offset,
  $isLogin,
  $coffe,
  $foundCoffes,
  $registerResult,
  $loginResult,
}

import { createForm, Rule } from 'effector-forms'
import { createEffect, createEvent, createStore, guard, sample } from 'effector'
import { api } from '../api'
import { forward } from 'effector/effector.umd'
import { basketService } from './basketService'
import { notNullArray } from '../app/appService'

const rules = {
  required: (): Rule<string> => ({
    name: 'required',
    validator: (value) => {
      return {
        isValid: Boolean(value),
        errorText: 'Пустое поле',
      }
    },
  }),
  phone: (): Rule<string> => ({
    name: 'phone',
    validator: (value) => ({
      isValid: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value),
      errorText: 'Введите номер телефона',
    }),
  }),
  mail: (): Rule<string> => ({
    name: 'phone',
    validator: (value) => ({
      isValid: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value),
      errorText: 'Введите почту',
    }),
  }),
  allString: (): Rule<string> => ({
    name: 'allString',
    validator: (value) => {
      return {
        isValid: !/\d/.test(value),
        errorText: 'allString',
      }
    },
  }),
  allNumbers: (): Rule<string> => ({
    name: 'allNumbers',
    validator: (value) => {
      return {
        isValid: !/[^0-9]/.test(value),
        errorText: 'allNumbers',
      }
    },
  }),
}

export const deliveryForm = createForm({
  fields: {
    name: {
      init: '',
      rules: [rules.required(), rules.allString()],
    },
    surname: {
      init: '',
      rules: [rules.required(), rules.allString()],
    },
    phone: {
      init: '',
      rules: [rules.required(), rules.phone()],
    },
    mail: {
      init: '',
      rules: [rules.required(), rules.mail()],
    },
    nameCompany: {
      init: '',
    },
    country: {
      init: '',
      rules: [rules.required(), rules.allString()],
    },
    city: {
      init: '',
      rules: [rules.required(), rules.allString()],
    },
    streetHome: {
      init: '',
      rules: [rules.required()],
    },
    postcode: {
      init: '',
      rules: [rules.required(), rules.allNumbers()],
    },
    comment: {
      init: '',
    },
  },
  validateOn: ['submit'],
})

export const $price = createStore(0)
type kek = {
  postcode: string
  heft: number
  price: number
}
const getPriceEvent = createEvent<kek>()
export const triggerFetchEvent = createEvent()
const fetchPriceDelFx = createEffect({ handler: getPriceDel })

$price.on(fetchPriceDelFx.doneData, (_, payload) => payload)
$price.on(basketService.delAllItem, () => 0)

sample({
  source: guard({
    source: [deliveryForm.$values, basketService.$basket],
    filter: notNullArray,
  }),
  fn: (source) => {
    const fields = source[0]
    const basket = source[1] ? source[1] : []
    const postcode = fields.postcode
    const heft = basket.reduce((totalHeft, next) => totalHeft + +next.heft, 0)
    const price = basket.reduce((totalPrice, next) => totalPrice + +next.price * next.amount, 0)
    console.log(postcode, heft, price, basket)
    return { postcode, heft, price }
  },
  target: getPriceEvent,
})

forward({
  from: getPriceEvent,
  to: fetchPriceDelFx,
})
fetchPriceDelFx.watch((data) => console.log(data))

//Async

async function getPriceDel(data: kek) {
  if (data.postcode.length === 6 && data.heft !== 0) {
    const res = await api.get(`/accounts/getPriceDel/${data.postcode}&${data.heft}&${data.price}`)
    console.log(res.data)
    return res.data
  } else return 0
}

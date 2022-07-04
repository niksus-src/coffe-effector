import { appService } from '../app/appService'
import { createStore, sample } from 'effector'
import { accountOrder } from '../../components/types'

const $nextDiscount = createStore(-5)
const $allTotal = createStore(0)

sample({
  clock: [appService.fetchLoginFx.doneData, appService.fetchOrdersFx.doneData],
  source: appService.$loginResult,
  fn: (source) => {
    const actualDiscount = source ? source.data.discount : 0
    let next = 0
    if (actualDiscount !== 20) {
      if (actualDiscount < 15 && actualDiscount >= 10) next = 15
      else if (actualDiscount === 15) next = 20
      else if (actualDiscount < 10) next = 10
    } else next = 20
    return next
  },
  target: $nextDiscount,
})

sample({
  clock: [appService.fetchLoginFx.doneData, appService.fetchOrdersFx.doneData],
  fn: (clock) => {
    const loginRes = clock.orders ? clock.orders : clock.data.orders
    return loginRes.reduce((total: number, next: accountOrder) => total + next.total, 0)
  },
  target: $allTotal,
})

export const accountService = {
  $nextDiscount,
  $allTotal,
}

import { appService } from '../app/appService'

export const nextDiscount = () => {
  const loginRes = appService.$loginResult.getState()!

  const actualDiscount = loginRes.data!.discount

  let nextDiscount

  if (actualDiscount !== 20) {
    if (actualDiscount! < 20 && actualDiscount! > 10) nextDiscount = 15
    else nextDiscount = 10
  }

  return String(nextDiscount)
}

export const allTotal = () => {
  const loginRes = appService.$loginResult.getState()!

  return loginRes.data!.orders.reduce((total, next) => total + next.total, 0)
}

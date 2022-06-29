import { appService } from '../app/appService'

export const nextDiscount = () => {
  const loginRes = appService.$loginResult.getState()

  const actualDiscount = loginRes && loginRes.data && loginRes.data.discount

  let nextDiscount
  if (actualDiscount !== 20) {
    if (actualDiscount! < 15 && actualDiscount! >= 10) nextDiscount = 15
    else if (actualDiscount! === 15) nextDiscount = 20
    else if (actualDiscount! < 10) nextDiscount = 10
  } else nextDiscount = 20
  return String(nextDiscount)
}

export const allTotal = () => {
  const loginRes = appService.$loginResult.getState()

  return (
    loginRes && loginRes.data && loginRes.data.orders.reduce((total, next) => total + next.total, 0)
  )
}

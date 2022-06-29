export type coffeType = {
  length: number
  data: Array<Coffe> | never[]
}

export type Coffe = {
  _id: string
  name: string
  desc: string
  geography: string
  sourness: number
  special: string
  kind: string
  sale: boolean
  roasting: number
  bitterness: number
  saturation: number
  imgSrc: string
  taste: Array<string>
  processing: string
  manufacturer: string
  sournessDegree: string
  price: {
    [index: string]: number
  }
  oldPrice: {
    [index: string]: number | null
  }
}

export type Filters = {
  roasting: string | null
  geography: string | null
  sourness: string | null
  special: string | null
  kind: string | null
  allAny: boolean
}

export type Account = {
  name: string
  mail: string
  phone: string
  password: string
}

export type Login = {
  mail: string
  password: string
}

export type loginRes = {
  login: boolean
  error: string | null
  id: string
  data: {
    name: string
    mail: string
    phone: string
    password: string
    discount: number
    orders: Array<accountOrder>
  }
}

export type accountOrder = {
  date: string
  status: string
  total: number
  discount: number
  products: Products
}

export type Products = {
  amount: number
  productName: string
  heft: number
  price: number
}[]

export type Basket = {
  id: string
  imgSrc: string
  name: string
  heft: string
  amount: number
  price: number
}[]

export type BasketItem = {
  id: string
  imgSrc: string
  name: string
  heft: string
  amount: number
  price: number
  discount: number
}

export type ChangeCountBasket = {
  id: string
  amount: number
}

export type Order = {
  id: string
  discount: number
  products: Array<{
    amount: number
    productName: string
    heft: number
    price: number
  }>
}

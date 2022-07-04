import { createStore, createEvent, combine } from 'effector'
import { Coffe, Filters } from '../../components/types'
import { appService } from '../app/appService'

type setFilter = {
  [key: string]: string
}

const initialFilters = {
  roasting: null,
  geography: null,
  sourness: null,
  special: null,
  kind: null,
  allAny: true,
}

const setSort = createEvent<string>()
const setFilters = createEvent<setFilter>()
const resetFilters = createEvent()

const $catalogSortDirection = createStore<string>('descPrice')
const $catalogFiltersDirection = createStore<Filters>(initialFilters)

$catalogFiltersDirection.on(setFilters, (state, payload) => ({
  ...state,
  ...payload,
  allAny: false,
}))

$catalogFiltersDirection.reset(resetFilters)
$catalogFiltersDirection.watch((state) => console.log(state))
$catalogSortDirection.on(setSort, (_, payload) => payload)
$catalogSortDirection.watch((state) => console.log('SORT BLYAT', state))

const filterCoffes = (coffes: Coffe[], filters: Filters, sort: string): Coffe[] => {
  const filtered = filters.allAny
    ? coffes
    : coffes.filter((coffe) => {
        return (
          ((filters.geography && coffe.geography === filters.geography) || !filters.geography) &&
          ((filters.kind && coffe.kind === filters.kind) || !filters.kind) &&
          ((filters.sourness && coffe.sournessDegree === filters.sourness) || !filters.sourness) &&
          ((filters.special &&
            ((filters.special === 'sales' && coffe.sale) || coffe.special === filters.special)) ||
            !filters.special) &&
          ((filters.roasting && coffe.roasting === +filters.roasting) || !filters.roasting) &&
          ((filters.special && coffe.special === filters.special) || !filters.special)
        )
      })
  const sorted = filtered.sort((coffeA, coffeB) => {
    switch (sort) {
      case 'ascPrice':
        console.log('1')
        return coffeA.price[250] - coffeB.price[250]
      case 'descPrice':
        console.log('2')
        return coffeB.price[250] - coffeA.price[250]
      case 'acidity':
        console.log('3')
        return coffeA.sourness - coffeB.sourness
      default:
        return coffeB.price[250] - coffeA.price[250]
    }
  })
  console.log('sorted1', sorted)

  return [...sorted]
}

const $filteredCoffes = combine(
  appService.$coffes,
  $catalogFiltersDirection,
  $catalogSortDirection,
  filterCoffes
)

$filteredCoffes.watch((state) => console.log('filteres', state))

export const serviceCatalog = {
  $filteredCoffes,
  setSort,
  $catalogSortDirection,
  setFilters,
  $catalogFiltersDirection,
  resetFilters,
}

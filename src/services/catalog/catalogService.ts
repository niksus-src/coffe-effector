import { createStore, createEvent } from "effector";
import { Filters } from "../../components/types";

type setFilter = {
  [key: string]: string;
};

const initialFilters = {
  roasting: null,
  geography: null,
  sourness: null,
  special: null,
  kind: null,
  allAny: true,
};

const setSort = createEvent<string>();
const setFilters = createEvent<setFilter>();
const resetFilters = createEvent();

const $catalogSortDirection = createStore<string>("descPrice");
const $catalogFiltersDirection = createStore<Filters>(initialFilters);

$catalogSortDirection.watch((state) => console.log(state));

$catalogFiltersDirection.on(setFilters, (state, payload) => ({
  ...state,
  ...payload,
  allAny: false,
}));

$catalogFiltersDirection.reset(resetFilters);

$catalogSortDirection.on(setSort, (_, payload) => payload);

export const serviceCatalog = {
  setSort,
  $catalogSortDirection,
  setFilters,
  $catalogFiltersDirection,
  resetFilters,
};

import { createStore, createEvent } from "effector";

type filters = {
  roasting: string;
  geography: string;
  sourness: string;
  special: string;
  kind: string;
};

type setFilter = {
  [key: string]: string;
};

const initialFilters = {
  roasting: "any",
  geography: "any",
  sourness: "any",
  special: "any",
  kind: "any",
};

const setSort = createEvent<string>();
const setFilters = createEvent<setFilter>();
const resetFilters = createEvent();

const $catalogSortDirection = createStore<string>("descPrice");
const $catalogFiltersDirection = createStore<filters>(initialFilters);
$catalogFiltersDirection.watch((state) => console.log(state));

$catalogFiltersDirection.on(setFilters, (state, payload) => ({
  ...state,
  ...payload,
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

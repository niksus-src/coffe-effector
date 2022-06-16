import { createStore, createEvent } from "effector";

const setSort = createEvent<string>();

const $catalogSortDirection = createStore<string>('descPrice');

$catalogSortDirection.on(setSort, (state, payload) => payload)

export const serviceCatalog = {
  setSort,
  $catalogSortDirection
};

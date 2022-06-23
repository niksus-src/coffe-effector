import {
  createStore,
  createEvent,
  createEffect,
  forward,
  sample,
} from "effector";
import axios from "axios";
import { api } from "../api";

import { Coffe, coffeType } from "../../components/types";

//ISLOGIN
const $isLogin = createStore(false);

const setIsLogin = createEvent<boolean>();

$isLogin.on(setIsLogin, (_, payload) => payload);
$isLogin.watch((state) => console.log(state));

//COFFES FETCH
const initStateCoffes = {
  length: 0,
  data: [],
};
const $coffes = createStore<coffeType>(initStateCoffes);
const $coffe = createStore<Coffe | null>(null);

const $offset = createStore<number>(6);
const $isLoading = createStore(true);

const fetchCoffesFx = createEffect({ handler: fetchCoffes });
const fetchCoffeFx = createEffect({ handler: fetchCoffe });

const fetchCoffesOffset = createEvent();
const fetchCoffeById = createEvent<string>();
const setLoading = createEvent<boolean>();
const setOffset = createEvent<number>();

$coffes.on(fetchCoffesFx.doneData, (_, payload) => payload);
$coffe.on(fetchCoffeFx.doneData, (_, payload) => payload);

$isLoading.on(setLoading, (_, payload) => {
  return payload;
});

$offset.on(setOffset, (_, payload) => {
  return payload;
});

$coffes.watch((state) => console.log("coffes: ", state));

$isLoading.watch((state) => console.log("isloading: ", state));

$offset.watch((state) => console.log("offset: ", state));

forward({
  from: fetchCoffesOffset,
  to: fetchCoffesFx,
});

forward({
  from: fetchCoffeById,
  to: fetchCoffeFx,
});

//Async

async function fetchCoffes() {
  const res = await api.get(`/products-coffe`);

  setLoading(false);
  return res.data;
}

async function fetchCoffe(id: any) {
  const res = await api.get(`/products-coffe/${id}`);

  setLoading(false);
  return res.data;
}

export const appService = {
  fetchCoffeById,
  setIsLogin,
  fetchCoffesOffset,
  setOffset,
  setLoading,
  $coffes,
  $isLoading,
  $offset,
  $isLogin,
  $coffe,
};

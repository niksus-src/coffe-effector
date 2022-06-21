import { createStore, createEvent } from "effector";

const $isLogin = createStore(false);

const setIsLogin = createEvent<boolean>();

$isLogin.on(setIsLogin, (_, payload) => payload);
$isLogin.watch((state) => console.log(state));

export const isLogin = { setIsLogin, $isLogin };

import { atom, selector } from "recoil";

export const headerVisibility = atom({
  key: "headerVisibility",
  default: true,
});

export const setHeaderVisibility = selector({
  key: "setHeaderVisibility",
  get: ({ get }) => {
    return get(headerVisibility);
  },
  set: ({ set }, newValue) => {
    set(headerVisibility, newValue);
  },
});

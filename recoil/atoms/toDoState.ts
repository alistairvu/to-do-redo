import { atom, RecoilState } from "recoil"

const defaultState: ToDo[] = []

export const toDoState: RecoilState<ToDo[]> = atom({
  key: "toDoState",
  default: defaultState,
})

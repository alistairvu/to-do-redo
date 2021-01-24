import { atom, RecoilState } from "recoil"

export const idTracker: RecoilState<number> = atom({
  key: "idTracker",
  default: 0,
})

import { Toasts } from "@/interfaces";
import { atom } from "recoil";
import { v1 } from 'uuid'

export const toast = atom<Toasts[]>({
 key: `toast${v1()}`,
 default:[]
})
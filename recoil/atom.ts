import { Toasts } from "@/interfaces";
import { atom } from "recoil";
import { v1 } from 'uuid'

export const toast = atom<Toasts[]>({
 key: `toast${v1()}`,
 default:[]
})

export const userImage = atom<string>({
    key: `image${v1()}`,
    default:''
})

export type Valueof<T> = T[keyof T]
export namespace CharType {


    export interface Initial {
        order:number,
        name: keyof typeof Category
        src: string,
        width: number,
        x?:number,
        y: number
    }

    export const enum List {
        'nely',
        'luky',
        'star',
        'hippy'
    }
}

export const Category = {
    'background': 0,
    'head':2,
    'body':1,
    'face':3,
    'acc':4,
    'item':5,
} as const

export interface DataType<T = any> {
    name?: string
    value: T
}

export namespace ApiData {
   export namespace Custom {
     export interface Default {
        category:keyof typeof Category,
        character:keyof typeof CharType.List
     }

     export interface Item {
        order:number
        id?:number,
        name:string,
        src:string,
        width:number,
        x?:number,
        y:number
        noValue?:boolean
     }
   }
}

export interface Toasts {
    id?:any,
    message:string
}

export namespace PopupTypes {
    export interface Default {
        onPositive?: () => void
        onNegative?: () => void
    }
}
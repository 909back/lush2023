
export type Valueof<T> = T[keyof T]
export namespace CharType {


    export interface Initial {
        src: string,
        width: number,
        y: number
    }


    export const enum List {
        'nely',
        'luky',
        'star',
        'hippy'
    }
}

export const enum Category {
    'head',
    'body',
    'face',
    'acc',
    'item',
    'background'
}

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
        id:number,
        name?:string,
        src:string,
        width?:number,
        x:number,
        y:number
     }
   }
}

export { }


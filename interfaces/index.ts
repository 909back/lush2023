

export type Valueof<T>  = T[keyof T] 

export namespace CharType {
    const enum List {
        'nely' = 1,
        'luky' = 2,
        'star' = 3,
        'hippy' = 4
    }
}

export interface DataType<T = any> {
    name?:string
    value:T
}
export {}
import { ApiData, Category, CharType } from "@/interfaces"
import useSWR,{ BareFetcher, KeyedMutator, SWRConfiguration } from "swr"
import { fetcher } from "./fetcher"

interface Result<Data,Error> {
    data?:Data,
    isLoading: boolean,
    isValidating:boolean,
    isError?:Error,
    mutate:KeyedMutator<Data>
}

const qs = (obj:{[key:string]:any}={}) => {
    const tmp = Object.entries(obj).reduce<string[]>((p,[key,value]) =>[...p, `${key}=${value}`],[]).join('&')
    if(tmp) return '?' + tmp
    return ''
}
export const useCustomList = <Data=ApiData.Custom.Item[],Error=unknown>(category:keyof typeof Category,character:keyof typeof CharType.List, fetcherConfig?: SWRConfiguration<Data, Error, BareFetcher<Data>>):Result<Data,Error> => {
    const {data, isLoading, isValidating, error, mutate} = useSWR<Data,Error>(`/api/v1/custom/${qs({category,character})}`,fetcher,fetcherConfig)

    return {data,isLoading,isValidating,isError:error,mutate}
}

export const useInitalCustom = <Data,Error=unknown>(
    character:keyof typeof CharType.List,
    fetcherConfig?:SWRConfiguration<Data,Error,BareFetcher<Data>>
) => {
    const {data, isLoading, isValidating, error, mutate} = useSWR<Data,Error>(`/api/v1/custom/inital${qs({character})}`,fetcher,fetcherConfig)

    return {data,isLoading,isValidating,isError:error,mutate}
}

export const useLogin = async (name:string,character:keyof typeof CharType.List) => {
    return await fetcher('/api/v1/user',{
        method:'POST',
        body: JSON.stringify({name,character})
    })
}   


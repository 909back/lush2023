export const fetcher = (input:RequestInfo, init?:RequestInit | undefined):any => (
    fetch(input, {
        ...init,
        headers: {'Content-Type': 'application/json; charset=utf-8',...init?.headers}
    }).then(async(response) => {
        if(response.ok && response.status === 200) return await response.json()
        else throw await response.json()
    })
)
import {ReactNode, useMemo} from 'react'
import ReactDOM from 'react-dom'

interface PortalsProps {
    children?:ReactNode
    id:string
}
const Portals = ({children,id}:PortalsProps) => {
    const portal = useMemo(() => document.getElementById(id),[])
    return !portal ? null : ReactDOM.createPortal(children,portal)
}

export default Portals
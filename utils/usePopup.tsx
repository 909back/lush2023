import { useState } from 'react'
import Popup from '@/components/popup/Popup'
import { PopupTypes } from '@/interfaces'
interface usePopupProps  extends PopupTypes.Default{
    content?: (props:any) => JSX.Element
    className?:string
}
const usePopup = ({
    content:Content = () => <></>,
    className,
    onPositive:handlePositive=()=>{},
    onNegative:handleNegative=()=>{},
}: usePopupProps = {}) => {
    const [show, setShow] = useState(false)
    const close = () => setShow(false)
    const open = () => setShow(true)

    const handleLocalNegative = () => {
        handleNegative()
        close()
    }
    const handleLocalPositive = () => {
        handlePositive()
        close()
    }
     return {
        popup: show  ? <Popup className={className} onClose={close}><Content onPositive={handleLocalPositive} onNegative={handleLocalNegative} /></Popup> : null,
        close,
        open
    }
}

export default usePopup
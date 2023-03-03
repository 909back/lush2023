import {useState,useEffect} from 'react'
import { Toasts } from '@/interfaces'
import classNames from 'classnames/bind'
import styles from '../../styles/Toast.module.scss'
import { toast } from '@/recoil/atom'
import { useRecoilValue } from 'recoil'

const cx = classNames.bind(styles)

interface ToastProps extends Toasts{
    children?: React.ReactNode
}

const ToastItem = ({
    message
}: ToastProps) => {
    const [show, setShow] = useState(true)

    useEffect(()=>{
        const timeid = window.setTimeout(()=> setShow(false),1000 * 2.5)
        return () => window.clearTimeout(timeid)
    },[])

    return (
        <div className={cx('toast',{show})}>
            {message}
        </div>
    )
}

const Toast = () => {
    const toasts = useRecoilValue(toast)

    return <>{toasts.map(toast => <ToastItem key={toast.id} {...toast}/>)}</>
}

export default Toast
import { useRef, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from '../../styles/Popup.module.scss'
import Portals from '@/utils/Portals'

const cx = classNames.bind(styles)

interface PopupProps {
    children?: React.ReactNode
    onClose?: () => void
    className?: string
}

const Popup = ({
    children,
    className,
    onClose: handleClose = () => { }
}: PopupProps) => {
    const popupEl = useRef<HTMLDivElement>(null)

    const handleClick = (e:React.MouseEvent) => {
        const target = e.target as HTMLElement
        if (e.currentTarget !== target) return
        handleClose()
    }   
    return (
        <Portals id='popup'>
            <div ref={popupEl} className={cx('popup-backdrop',className)} onClick={handleClick}>
                {children}
            </div>
        </Portals>
    )
}

export default Popup
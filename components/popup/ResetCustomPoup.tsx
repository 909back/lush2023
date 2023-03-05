import classNames from 'classnames/bind'
import styles from '../../styles/ResetCustomPopup.module.scss'
import { PopupTypes } from '@/interfaces'
const cx = classNames.bind(styles)

interface ResetCustomPopupProps extends PopupTypes.Default {
    children?: React.ReactNode
}

const ResetCustomPopup = ({
    onPositive:handlePositive=()=>{},
    onNegative:handleNegative=()=>{}
}: ResetCustomPopupProps) => {
    console.log(handlePositive)
    return (
        <div className={cx('reset-custom-popup')}>
            <div className={cx('info')}>
                크루원의 모든 착용 아이템을 되돌립니다.
            </div>
            <div className={cx('control-button-wrapper')}>
                <button className={cx('negative-button')} onClick={handleNegative}>아니요</button>
                <button className={cx('positive-button')} onClick={handlePositive}>예</button>
            </div>
        </div>
    )
}

export default ResetCustomPopup
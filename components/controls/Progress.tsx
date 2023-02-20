import classNames from 'classnames/bind'
import styles from '../../styles/Progress.module.scss'
import IconProgressNely from '@/components/icons/ic-progress-nely'
import IconProgressBar from '@/components/icons/ic-progressbar'

const cx = classNames.bind(styles)

interface ProgressProps {
    children?: React.ReactNode
    step?: number
    className?: string
}

const Progress = ({
    className,
    step=1,
}: ProgressProps) => {
    return (
        <div className={cx('progress-bar-container',className)}>
            <div className={cx('progress-box')}/>
            <IconProgressNely className={cx('icon-nely')}/>
            <IconProgressBar className={cx('progress-bar', step===1 ? 'step1' : 'step2')} step={step}/>
        </div>
    )
}

export default Progress
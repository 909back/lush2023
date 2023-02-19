import classNames from 'classnames/bind'
import { AllHTMLAttributes } from 'react'
import styles from '../../styles/Button.module.scss'

const cx = classNames.bind(styles)

interface ButtonProps extends Omit<AllHTMLAttributes<HTMLButtonElement>,'type'>{
    children?: React.ReactNode
    onDisabled?: (e:React.MouseEvent<HTMLButtonElement>) => void
    type?: 'default' | 'icon'
}

const Button = ({
    children,
    className,
    type = 'default',
    disabled,
    onClick:handleClick=()=>{},
    onDisabled:handleDisabled=()=>{},
    ...props
}: ButtonProps) => {
    return (
        <button className={cx('button', type)} disabled={disabled} onClick={disabled ? handleDisabled : handleClick}{...props}>
            {children}
        </button>
    )
}

export default Button
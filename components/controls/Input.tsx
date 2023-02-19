import React, { InputHTMLAttributes } from 'react'
import classNames from 'classnames/bind'
import styles from '../../styles/Input.module.scss'
import IconClose from '@/components/icons/ic-close'

const cx = classNames.bind(styles)

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode
}

const Input = ({
    className,
    type='text',
    value,
    max = 6,
    ...props
}: InputProps) => {
    return (
        <label className={cx('input-container', className)}>
            <input className={cx('input')} value={value} type={type} {...props}/>
            {value && <button className={cx('close-button')}><IconClose/></button>}
            <span className={cx('input-counter')}>{`${value?.toString().length??0}/${max}`}</span>
        </label>
    )
}

export default Input
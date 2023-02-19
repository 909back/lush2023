import React, { InputHTMLAttributes, useState } from 'react'
import classNames from 'classnames/bind'
import styles from '../../styles/Input.module.scss'
import IconClose from '@/components/icons/ic-close'

const cx = classNames.bind(styles)

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onClear?:() => void
}

const Input = ({
    className,
    type='text',
    value,
    maxLength = 6,
    onClear:handleClear=()=>{},
    ...props
}: InputProps) => {
    return (
        <label className={cx('input-container', className)}>
            <input className={cx('input')} value={value} type={type} maxLength={maxLength} {...props}/>
            {value && <button className={cx('close-button')} onClick={handleClear}><IconClose/></button>}
            <span className={cx('input-counter')}>{`${value?.toString().length??0}/${maxLength}`}</span>
        </label>
    )
}

export default Input
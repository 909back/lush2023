import { DataType } from '@/interfaces'
import Image from 'next/image'
import classNames from 'classnames/bind'
import styles from '../../styles/ItemContainer.module.scss'

const cx = classNames.bind(styles)

export interface ItemContainerProps<T = string> {
    children?: React.ReactNode
    classname?:string,
    data?: { color?: string[], item: DataType<T>[] }
    select?: T,
    onSelect?: (newVal: T) => void
    selColor?: string,
    onColorSelect?: (newColor?: string) => void
}

const ItemContainer = <T extends string>({
    data = { item: [] },
    select,
    classname,
    onSelect: handeSelect = () => { },
    selColor,
    onColorSelect: handleColorSelect = () => { }
}: ItemContainerProps<T>) => {
    return (
        <div className={cx('item-wrapper')}>
            <div className={cx('item-container')}>
                {data.color && <div className={cx("color-seleter-wrapper")}>{data.color.map(hex => <button key={hex} style={{ backgroundColor: hex }} className={cx('color-selecter')} />)}</div>}
                {data.item.map(item => <div key={item.name} className={cx('item',classname)} onClick={() => handeSelect(item.value)}>
                    <Image src={item?.value ?? ""} alt={item.name ?? ""} fill />
                </div>)}
            </div>
        </div>
    )
}

export default ItemContainer
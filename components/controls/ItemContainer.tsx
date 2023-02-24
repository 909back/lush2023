import { DataType } from '@/interfaces'
import Image from 'next/image'
import classNames from 'classnames/bind'
import styles from '../../styles/ItemContainer.module.scss'

const cx = classNames.bind(styles)

export interface ItemContainerProps<T=string> {
    children?: React.ReactNode
    data?: DataType<T>[]
    select?: T,
    onSelect?: (newVal:T) => void
}

const ItemContainer = <T extends string>({
    data=[],
    select,
    onSelect:handeSelect = () => {}
}: ItemContainerProps<T>) => {
    return (
        <div className={cx('item-container')}>
            {data.map(item => <div key={item.name} className={cx('item')}>
                <Image src={item?.value??""} alt={item.name??""}/>
            </div>)}
        </div>
    )
}

export default ItemContainer
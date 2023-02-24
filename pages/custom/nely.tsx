import { useRef,useState } from 'react'
import classNames from 'classnames/bind'
import styles from '../../styles/Nely.module.scss'
import CustomLayout from '@/components/layout/CustomLayout'
import { tabList } from '@/utils/data'



const cx = classNames.bind(styles)

interface NelyProps {
    children?: React.ReactNode
}

const Nely = ({

}: NelyProps) => {
    const canvasEl = useRef<HTMLCanvasElement>(null)
    const [category, setCategory] = useState(tabList[0].value)

    return (
        <CustomLayout ref={canvasEl} tab={category} onChangeTab={setCategory}>
        </CustomLayout>
    )
}

export default Nely
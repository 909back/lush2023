import { useRef } from 'react'
import classNames from 'classnames/bind'
import styles from '../../styles/Nely.module.scss'
import CustomLayout from '@/components/layout/CustomLayout'
import TabBar from '@/components/controls/TabBar'

const cx = classNames.bind(styles)

interface NelyProps {
    children?: React.ReactNode
}

const Nely = ({

}: NelyProps) => {
    const ctx = useRef<HTMLCanvasElement>(null)
    return (
        <CustomLayout>
          <TabBar/>
        </CustomLayout>
    )
}

export default Nely
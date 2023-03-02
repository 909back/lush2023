import { useRef, useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from '../../styles/Nely.module.scss'
import CustomLayout from '@/components/layout/CustomLayout'
import { tabList, initial, getImageSync } from '@/utils/data'

const cx = classNames.bind(styles)

interface NelyProps {
    children?: React.ReactNode
}

const Nely = ({

}: NelyProps) => {
    const canvasEl = useRef<HTMLCanvasElement>(null)
    const [category, setCategory] = useState(tabList[0].value)

    useEffect(() => {
        const ctx = canvasEl.current?.getContext('2d')
        if (!ctx || !canvasEl.current) return
        const x = (canvasEl.current?.clientWidth / 2)
    }, [])

    return (
        <CustomLayout tab={category} onChangeTab={setCategory}>
        </CustomLayout>
    )
}

export default Nely
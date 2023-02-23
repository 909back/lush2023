import { useRef } from 'react'
import classNames from 'classnames/bind'
import styles from '../../styles/Nely.module.scss'
import PageLayout from '@/components/layout/PageLayout'

const cx = classNames.bind(styles)

interface NelyProps {
    children?: React.ReactNode
}

const Nely = ({

}: NelyProps) => {
    const ctx = useRef<HTMLCanvasElement>(null)
    return (
        <PageLayout>
            <canvas ref={ctx} width='100%' height={460}>
                
            </canvas>
        </PageLayout>
    )
}

export default Nely
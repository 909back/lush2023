import classNames from 'classnames/bind'
import styles from '../../styles/CustomLayout.module.scss'
import PageLayout from './PageLayout'

const cx = classNames.bind(styles)

interface CustomLayoutProps {
    children?: React.ReactNode
    className?: string

}

const CustomLayout = ({
    className
}: CustomLayoutProps) => {
    return (
        <PageLayout>
            
        </PageLayout>
    )
}

export default CustomLayout
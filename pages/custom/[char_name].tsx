import React, {useState} from "react"
import styles from "../../styles/Custom.module.scss"
import classNames from "classnames/bind"
import PageLayout from "@/components/layout/PageLayout"
import Nely from "@/components/icons/nely"
import Head1 from "@/components/icons/head/head1"
import Head2 from "@/components/icons/head/head2"
import Head3 from "@/components/icons/head/head3"
import Head4 from "@/components/icons/head/head4"

const cx = classNames.bind(styles)

const CharHead = ({index}:{index:number}) => {
    const headers = [Head1, Head2, Head3, Head4]
    return   <div className={cx('head')}>{}</div>
}

interface Customprops {
  children?: React.ReactNode
}
const Custom = ({}:Customprops) => {
    const [color, setColor] = useState('#FFFFFF')
    const [head, setHead] = useState<any>(0)

    const pink = "#FFBBBB"
    const orange = '#FFB865'
    const blue = '#00AAE0'
    const purple = "#9519CF"

    const handleClick = (hex:string) => {
        setColor(hex)
    }

  return (
    <PageLayout>
        <div style={{color:color}} className={cx('show-case')}>
        <div className={cx('character')}>
        <div className={cx('head')}>{
            head === 1 ? <Head1/> : head === 2 ? <Head2/> : head === 3 ? <Head3/> : head === 4 ? <Head4/> : null
        }</div>
            <Nely/>
        </div>
        </div>
        <div className={cx('color-button-wrapper')}>
            <div style={{backgroundColor:pink}} className={cx('color-buttons')} onClick={e => handleClick(pink)}></div>
            <div style={{backgroundColor:orange}} className={cx('color-buttons')} onClick={e => handleClick(orange)}></div>
            <div style={{backgroundColor:blue}} className={cx('color-buttons')} onClick={e => handleClick(blue)}></div>
            <div style={{backgroundColor:purple}} className={cx('color-buttons')} onClick={e => handleClick(purple)}></div>
        </div>
        <div className={cx('item-grid-container')}>
            <button className={cx('item')} onClick={e => setHead(1)}>
                <Head1/>
            </button>
            <button className={cx('item')} onClick={e => setHead(2)}>
                <Head2/>
            </button>
            <button className={cx('item')} onClick={e => setHead(3)}>
                <Head3/>
            </button>
            <button className={cx('item')} onClick={e => setHead(4)}>
                <Head4/>
            </button>
        </div>
    </PageLayout>
  )
} 

export default Custom
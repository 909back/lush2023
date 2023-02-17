import React, { CSSProperties } from "react"
import styles from "../../styles/PageLayout.module.scss"
import classNames from "classnames/bind"
import IconGoBack from "@/components/icons/ic-goback"
import IconHome from "@/components/icons/ic-home"

const cx = classNames.bind(styles)


interface HeaderProps {
  title?: string
}
const Header = ({title}:HeaderProps) => {
  return <header className={cx('header')}>
    <button className={cx('header-button')}><IconGoBack/></button>
    <h1 className={cx('page-title')}>{title}</h1>
    <button className={cx('header-button')}><IconHome/></button>
  </header>
}

interface PageLayoutprops {
  children?: React.ReactNode
  style?: CSSProperties
  className?: string
  title?: string
}
const PageLayout = ({style, className, children, title}:PageLayoutprops) => {
  return (
    <main style={style} className={cx('page-layout', className)}>
      <Header title={title}/>
      <div className={cx("content")}>{children}</div>
    </main>
  )
} 

export default PageLayout
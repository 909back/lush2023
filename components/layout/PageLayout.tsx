import React, { CSSProperties } from "react"
import Link from 'next/link'
import Image from "next/image"
import { useRouter } from 'next/router'
import styles from "../../styles/PageLayout.module.scss"
import classNames from "classnames/bind"
import IconGoBack from "@/components/icons/ic-goback"
import IconHome from "@/components/icons/ic-home"

const cx = classNames.bind(styles)

const Header = () => {
  const router = useRouter()
  
  return <header className={cx('header')}>
    <button className={cx('header-button')} onClick={() => router.back() }><IconGoBack/></button>
    <h1 className={cx('logo')}>
      <Image src='/icons/logo.svg' width={90} height={39} alt='러쉬로고'/>
    </h1>
    <Link href='/'><button className={cx('header-button')}><IconHome/></button></Link>
  </header>
}

interface PageLayoutprops {
  children?: React.ReactNode
  style?: CSSProperties
  className?: string
}
const PageLayout = ({style, className, children}:PageLayoutprops) => {
  return (
    <main style={style} className={cx('page-layout', className)}>
      <Header/>
      <div className={cx("content")}>{children}</div>
    </main>
  )
} 

export default PageLayout
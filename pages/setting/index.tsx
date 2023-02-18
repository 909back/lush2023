import React from "react"
import styles from "../../styles/Setting.module.scss"
import classNames from "classnames/bind"
import PageLayout from "@/components/layout/PageLayout"
import Progress from "@/components/controls/Progress"

const cx = classNames.bind(styles)

interface Settingprops {
  children?: React.ReactNode
}
const Setting = ({}:Settingprops) => {
  return (
    <PageLayout>
      <div className={cx('setting-page')}>
        <Progress/>
        <p className={cx('page-desc')}>크루원의 새로운 이름을 정해주세요.</p>
      </div>
    </PageLayout>
  )
} 

export default Setting
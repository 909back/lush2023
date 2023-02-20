import React, { useState } from "react"
import Link from 'next/link'
import styles from "../../styles/Setting.module.scss"
import classNames from "classnames/bind"
import PageLayout from "@/components/layout/PageLayout"
import Progress from "@/components/controls/Progress"
import Input from "@/components/controls/Input"
import Button from "@/components/controls/Button"

const cx = classNames.bind(styles)

interface Settingprops {
  children?: React.ReactNode
}
const Setting = ({ }: Settingprops) => {
  const [nickname, setNickname] = useState<string>()

  const handleChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)
  return (
    <PageLayout>
      <div className={cx('setting-page')}>
        <section className={cx('setting-nickname-section')}>
          <Progress />
          <p className={cx('page-desc')}>크루원의 새로운 이름을 정해주세요!</p>
          <Input placeholder="닉네임을 입력해주세요" value={nickname} onChange={handleChangeNickName} onClear={() => setNickname('')} />
        </section>
        <Link href={`/setting/character?name=${nickname}`}>
          <Button disabled={!nickname}>다음</Button>
        </Link>
      </div>
    </PageLayout>
  )
}

export default Setting
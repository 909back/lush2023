import React, { useState } from "react"
import { useRouter } from "next/router"
import styles from "../../styles/SettingCharacter.module.scss"
import classNames from "classnames/bind"
import Image from "next/image"
import PageLayout from "@/components/layout/PageLayout"
import Progress from "@/components/controls/Progress"
import Button from "@/components/controls/Button"
import Hippy from "@/components/icons/character/hippy.png"
import Luky from "@/components/icons/character/luky.png"
import Star from "@/components/icons/character/star.png"
import Nely from "@/components/icons/character/nely.png"
import { StaticImageData } from "next/image"

const cx = classNames.bind(styles)

interface characterItem<T extends string | number> {
  value: T,
  name: string,
  src: StaticImageData | string
}

const characterList: characterItem<number>[] = [
  { value: 1, name: 'nely', src: Nely },
  { value: 2, name: 'luky', src: Luky },
  { value: 3, name: 'star', src: Star },
  { value: 4, name: 'hippy', src: Hippy },
]

interface CharacterSliderProps {
  data: characterItem<number>[],
  selected?: number,
  onSelect?: (value: number) => void
}
const CharacterSlider = ({ data, selected, onSelect: handleSelect = () => { } }: CharacterSliderProps) => {
  return <div className={cx("character-slider-container")}>
    <div className={cx('slider')}>
      <div className={cx('slider-container')}>
        <div className={cx('slider-wrapper')}>
          {data.map((item, index) => <div key={item.name} className={cx('slider-item')}>
            <Image src={item.src} alt={item.name} />
          </div>)}
        </div>
      </div>
    </div>
    <div className={cx('slider-index-container')}>
      {data.map(item => <div key={item.name} className={cx('slide-index', { active: item.value === selected })} />)}
    </div>
  </div>
}

interface Characterprops {
  children?: React.ReactNode
}
const Character = ({ }: Characterprops) => {
  const router = useRouter()
  const { name: nickname } = router.query
  const [character, setCharacter] = useState(characterList[0].value)


  return (
    <PageLayout>
      <section className={cx('setting-character')}>
        <section className={cx('select-character-section')}>
          <Progress step={2} />
          <p className={cx('page-desc')}>변장시킬 크루원을 선택해주세요!</p>
          <CharacterSlider data={characterList} selected={character} onSelect={setCharacter} />
        </section>
        <Button>선택</Button>
      </section>
    </PageLayout>
  )
}

export default Character
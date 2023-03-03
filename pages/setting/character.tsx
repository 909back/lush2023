import React, { CSSProperties, MemoExoticComponent, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import styles from "../../styles/SettingCharacter.module.scss"
import classNames from "classnames/bind"
import Image from "next/image"
import PageLayout from "@/components/layout/PageLayout"
import Progress from "@/components/controls/Progress"
import Button from "@/components/controls/Button"
import Hippy from "@/components/icons/character/hippy"
import Luky from "@/components/icons/character/luky"
import Star from "@/components/icons/character/star"
import Nely from "@/components/icons/character/nely"
import { StaticImageData } from "next/image"
import { useLogin } from "@/utils/apiHook"
import useToast from "@/utils/useToast"
import { CharType } from "@/interfaces"

const cx = classNames.bind(styles)

export const TIMINGFUNC_MAP = {
  linear: (t: number) => t,
  'ease-in': (t: number) => t * t,
  'ease-out': (t: number) => t * (2 - t),
  'ease-in-out': (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
}


interface characterItem<T extends any> {
  value: T,
  name: string,
  icon: MemoExoticComponent<any>
}

const characterList: characterItem<string>[] = [
  { value: 'nely', name: 'nely', icon: Nely },
  { value: 'luky', name: 'luky', icon: Luky },
  { value: 'star', name: 'star', icon: Star },
  { value: 'hippy', name: 'hippy', icon: Hippy },
]

interface CharacterSliderProps<T> {
  data: characterItem<T>[],
  onSelect?: (value: T) => void
}
const CharacterSlider = <T extends any>({ data, onSelect: handleSelect = () => { } }: CharacterSliderProps<T>) => {
  const [index, setIndex] = useState<number>(0)
  const [translate, setTranslate] = useState(0)
  const touchX = useRef<number>(0)
  const timing = TIMINGFUNC_MAP['ease-in-out']

  useEffect(() => {
    handleSelect(data[index].value)
  }, [index])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (index === data.length - 1) return
    touchX.current = e.touches[0].pageX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].pageX - touchX.current

    if (diff < 0) forward()
    else back()
    touchX.current = 0;
  }

  const forward = (duration = 400) => {
    if (index > data.length - 1) return

    let start: number;

    const step: FrameRequestCallback = (timestamp) => {
      if (!start) start = timestamp;
      const diff = timestamp - start
      const progress = Math.min(1, diff / duration)

      setTranslate(-1 * ((timing(progress) * 450) + (450 * index)))

      if (diff < duration) requestAnimationFrame(step)
      else endTransition()
    }

    const id = requestAnimationFrame(step)

    const endTransition = () => {
      cancelAnimationFrame(id)
      setIndex(prev => prev + 1)
    }
  }

  const back = (duration = 400) => {
    if (!index) return
    let start: number;

    const step: FrameRequestCallback = (timestamp) => {
      if (!start) start = timestamp;
      const diff = timestamp - start
      const progress = Math.min(1, diff / duration)

      setTranslate((timing(progress) * 450) - (450 * index))

      if (diff < duration) requestAnimationFrame(step)
      else endTransition()
    }

    const id = requestAnimationFrame(step)

    const endTransition = () => {
      setIndex(prev => prev - 1)
      cancelAnimationFrame(id)
    }
  }


  return <div className={cx("character-slider-container")}>
    <div className={cx('slider')} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className={cx('slider-container')}>
        <div style={{ transform: `translate3d(${translate}px,0,0)` }} className={cx('slider-wrapper')}>
          {data.map(({ name, icon: Icon }) => <div key={name} className={cx('slider-item')}>
            <Icon />
          </div>)}
        </div>
      </div>
    </div>
    <div className={cx('slider-index-container')}>
      {data.map((item, idx) => <div key={item.name} className={cx('slide-index', { active: index === idx })} />)}
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
  const { addToast } = useToast()

  const handleClickComplete = async (e: React.MouseEvent) => {
    try {
      await useLogin(nickname as string, character as keyof typeof CharType.List)
      router.push(`/custom/${character}`)
    } catch (err) {
      if (err) addToast('알 수 없는 에러로 로그인 할  수 없습니다.')
    }
  }
  
  return (
    <PageLayout>
      <section className={cx('setting-character')}>
        <section className={cx('select-character-section')}>
          <Progress className={cx('select-character-progress')} step={2} />
          <p className={cx('page-desc')}>변장시킬 크루원을 선택해주세요!</p>
          <CharacterSlider data={characterList} onSelect={setCharacter} />
        </section>
        <Button onClick={handleClickComplete}>선택</Button>
      </section>
    </PageLayout>
  )
}

export default Character
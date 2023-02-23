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

const cx = classNames.bind(styles)

export const TIMINGFUNC_MAP = {
  linear: (t: number) => t,
  'ease-in': (t: number) => t * t,
  'ease-out': (t: number) => t * (2 - t),
  'ease-in-out': (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
}


interface characterItem<T extends string | number> {
  value: T,
  name: string,
  icon: MemoExoticComponent<any>
}

const characterList: characterItem<number>[] = [
  { value: 1, name: 'nely', icon: Nely },
  { value: 2, name: 'luky', icon: Luky },
  { value: 3, name: 'star', icon: Star },
  { value: 4, name: 'hippy', icon: Hippy },
]

interface CharacterSliderProps {
  data: characterItem<number>[],
  onSelect?: (value: number) => void
}
const CharacterSlider = ({ data, onSelect: handleSelect = () => { } }: CharacterSliderProps) => {
  const [index, setIndex] = useState<number>(0)
  const [translate, setTranslate] = useState(0)
  const touchX = useRef<number>(0)
  const timing = TIMINGFUNC_MAP['ease-in-out']

  useEffect(()=> {
    handleSelect(data[index].value)
  },[index])

  const handleTouchStart = (e:React.TouchEvent) => {
    if(index === data.length-1) return
    touchX.current = e.touches[0].pageX
  }

  const handleTouchEnd = (e:React.TouchEvent) => {
    const diff =  e.changedTouches[0].pageX - touchX.current

    if(diff < 0) forward()
    else back()
    touchX.current = 0;
  }

  const forward = (duration= 400) => {
    if(index > data.length-1) return

    let start:number;

    const step:FrameRequestCallback = (timestamp) => {
      if(!start) start = timestamp;
      const diff = timestamp - start
      const progress = Math.min(1, diff/duration)

      setTranslate(-1 * ((timing(progress) * 450) + (450 * index)) )
      
      if(diff < duration) requestAnimationFrame(step)
      else endTransition()
    }
    
    const id = requestAnimationFrame(step)
    
    const endTransition = () => {
      cancelAnimationFrame(id)
      setIndex(prev => prev+1)
    }
  }

  const back = (duration= 400) => {
    if(!index) return
    let start:number;

    const step:FrameRequestCallback = (timestamp) => {
      if(!start) start = timestamp;
      const diff = timestamp - start
      const progress = Math.min(1, diff/duration)

      setTranslate((timing(progress) * 450) - (450 * index))
      
      if(diff < duration) requestAnimationFrame(step)
      else endTransition()
    }
    
    const id = requestAnimationFrame(step)
    
    const endTransition = () => {
      setIndex(prev => prev-1)
      cancelAnimationFrame(id)
    }
  }


  return <div className={cx("character-slider-container")}>
    <div className={cx('slider')} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className={cx('slider-container')}>
        <div style={{transform: `translate3d(${translate}px,0,0)`}} className={cx('slider-wrapper')}>
          {data.map(({name, icon:Icon}) => <div key={name} className={cx('slider-item')}>
            <Icon/>
          </div>)}
        </div>
      </div>
    </div>
    <div className={cx('slider-index-container')}>
      {data.map((item,idx) => <div key={item.name} className={cx('slide-index', { active: index === idx })} />)}
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

  console.log(character)

  const handleClickComplete = (e:React.MouseEvent) => {
    const findName = characterList.find(char => char.value === character)?.name

    router.push(`/custom/${findName}`)
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
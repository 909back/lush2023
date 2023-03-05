import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/Hippy.module.scss";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import CustomLayout from "@/components/layout/CustomLayout";
import { tabList, initial, getImageSync } from "@/utils/data";
import { useCustomList, useInitalCustom } from "@/utils/apiHook";
import { Category, CharType, DataType } from "@/interfaces";
import usePopup from "@/utils/usePopup";
import ResetCustomPoup from "@/components/popup/ResetCustomPoup";
import CapturePoup from "@/components/popup/CapturePopup";

const cx = classNames.bind(styles);

interface Hippyprops {
  children?: React.ReactNode;
}
const Hippy = ({ }: Hippyprops) => {
  const router = useRouter()
  const character = router.query.character as keyof typeof CharType.List
  const [category, setCategory] = useState(tabList[0].value);
  const [background, setBackground] = useState<string>()
  const { data: initial } = useInitalCustom(character)
  const { data: list } = useCustomList(category, character)
  const [custom, setCustom] = useState(initial ?? []);
  const [data, setData] = useState<DataType[]>([])
  const canvasEl = useRef<HTMLCanvasElement>(null);

    
  const resetCanvas = () => {
    const ctx = canvasEl.current?.getContext("2d");
    if (!ctx || !canvasEl.current) return;
    const { width: x, height } = canvasEl.current.getBoundingClientRect();
    ctx.clearRect(0, 0, x, height);
  }

  const { open: resetPopupOpen, popup: resetPopup } = usePopup({
    content: ResetCustomPoup,
    onPositive: () => {
      resetCanvas();
      setBackground('')
      setCustom(initial ?? [])
      if (!canvasEl.current) return;
    //   drawCharacter(canvasEl.current, initial??[]);
    },
    onNegative: () => { }
  })

  const { open: capturePopupOpen, popup: capturePoup } = usePopup({
    content: () => <CapturePoup image={canvasEl?.current?.toDataURL('image/png')??''} />,
    onPositive: () => { },
    onNegative: () => { }
  })

  const [select, setSelect] = useState<string>();
  const drawCharacter = async (canvas: HTMLCanvasElement, data: typeof custom) => {
    const ctx = canvas.getContext("2d");
    const { width: x } = canvas.getBoundingClientRect();
    if (!ctx) return;
    const images = await Promise.all(custom.map(item => getImageSync(item.src, '#FFF')))
    images.forEach((image, i) =>{
        ctx.drawImage(image, x / 2 - (data[i].width / 2), data[i].y)
    })

    // const imageData = ctx.getImageData(0, 0, 480,600)
    // const newCtx = document.createElement('canvas')
    // newCtx.width = 480
    // newCtx.height= 600
    // const a = newCtx.getContext('2d')
    // a?.putImageData(imageData,0,0)
    // console.log(newCtx.toDataURL())
  };

  useEffect(() => {
    setCustom(initial ?? [])
  }, [initial])

  useEffect(() => {
    if (!list) return
    setData(list?.reduce<DataType<string>[]>((p, v) => v.noValue ? [...p, { name: v.src, value: '' }] : [...p, { name: v.name, value: v.src }], []))
  }, [category, list])

  useEffect(() => {
    if (!custom) return
    const ordered = custom.sort((a, b) => a.order - b.order);
    if (!canvasEl.current) return;
    drawCharacter(canvasEl.current, ordered);
  }, [custom]);

  const handleSelect = (val: string) => {
    if (!custom) return
    resetCanvas()
    if (!val) {
      setCustom((prev) => {
        const filtered = prev.filter((item) => item.name !== category);
        return [...filtered];
      });

      return
    }
    let prevVal = custom.find((item) => item.name === category);
    if (!prevVal) prevVal = list?.find(item => item.src === val)!
    if(category === 'background'){
        const tmp = val.replace(`/${character}`,'')
        setBackground(`url(${tmp})`)
    }
    setSelect(val);
    setCustom((prev) => {
      const filtered = prev.filter((item) => item.name !== category);
      return [...filtered, { width: 0, y: 0, ...prevVal, src: val, order: Category[category], name: category }];
    });
  };

  return <>
    {resetPopup}
    {capturePoup}
    <CustomLayout background={background} classname={(category === 'face' && character === 'hippy') ? cx('black') : undefined} onClickReset={resetPopupOpen} onClickCapture={capturePopupOpen} ref={canvasEl} tab={category} data={tabList} onChangeTab={setCategory} itemList={{ item: data ?? [] }} select={select} onSelect={handleSelect}></CustomLayout>
  </>
};

export default Hippy;

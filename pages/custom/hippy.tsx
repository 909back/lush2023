import React, {useState, useEffect, useRef} from "react";
import styles from "../../styles/Hippy.module.scss";
import classNames from "classnames/bind";
import CustomLayout from "@/components/layout/CustomLayout";
import {tabList, initial, getImageSync} from "@/utils/data";
import { useCustomList, useInitalCustom } from "@/utils/apiHook";
import { Category, DataType } from "@/interfaces";

const cx = classNames.bind(styles);

interface Hippyprops {
  children?: React.ReactNode;
}
const Hippy = ({}: Hippyprops) => {
  const [category, setCategory] = useState(tabList[0].value);
  const {data:initial,isValidating} = useInitalCustom('hippy')
  const {data:list} = useCustomList(category,'hippy')
  const [custom, setCustom] = useState(initial??[]);
  const [data, setData] = useState<DataType[]>([])
  const canvasEl = useRef<HTMLCanvasElement>(null);

  const [select, setSelect] = useState<string>();
  const drawCharacter = async (canvas: HTMLCanvasElement, data: typeof custom) => {
    const ctx = canvas.getContext("2d");
    const {width: x} = canvas.getBoundingClientRect();
    if (!ctx) return;
    const images = await Promise.all(custom.map(item => getImageSync(item.src,'#FFF')))
    
    images.forEach((image,i) => ctx.drawImage(image, x/2 - (data[i].width /2),data[i].y))
  };

  useEffect(()=>{
    setCustom(initial??[])
  },[initial])

  useEffect(()=>{
    if(!list) return
    setData(list?.reduce<DataType<string>[]>((p,v) =>[...p, {name:v.name,value:v.src}],[]))
  },[category, list])

  useEffect(() => {
    if(!custom) return
    const ordered = custom.sort((a, b) => a.order - b.order);
    if (!canvasEl.current) return;
    drawCharacter(canvasEl.current, ordered);
  }, [custom]);

  console.log(list)
  const handleSelect = (val: string) => {
    if(!custom) return
    const prevVal = custom.find((item) => item.name === category)!;
    const ctx = canvasEl.current?.getContext("2d");
    if (!ctx || !canvasEl.current) return;
    const {width: x,height} = canvasEl.current.getBoundingClientRect();
    ctx.clearRect(0,0, x,height );

    setSelect(val);
    setCustom((prev) => {
      const filtered = prev.filter((item) => item.name !== category);
      return [...filtered, {...prevVal, src: val, order:Category[category]}];
    });
  };

  return <CustomLayout classname={category==='face' ? cx('black') : undefined} ref={canvasEl} tab={category} data={tabList} onChangeTab={setCategory} itemList={{item: data??[]}} select={select} onSelect={handleSelect}></CustomLayout>;
};

export default Hippy;

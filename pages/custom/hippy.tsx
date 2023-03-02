import React, {useState, useEffect, useRef} from "react";
import styles from "../../styles/Hippy.module.scss";
import classNames from "classnames/bind";
import CustomLayout from "@/components/layout/CustomLayout";
import {tabList, initial, getImageSync} from "@/utils/data";

const cx = classNames.bind(styles);

interface Hippyprops {
  children?: React.ReactNode;
}
const Hippy = ({}: Hippyprops) => {
  const [category, setCategory] = useState(tabList[0].value);
  const [custom, setCustom] = useState(initial.hippy);
  const canvasEl = useRef<HTMLCanvasElement>(null);

  const data = [
    {name: "head1", value: "https://lush.s3.ap-northeast-2.amazonaws.com/hippy/head/head3.svg"},
    {name: "head2", value: "https://lush.s3.ap-northeast-2.amazonaws.com/hippy/head/head4.svg"},
    {name: "head3", value: "https://lush.s3.ap-northeast-2.amazonaws.com/hippy/head/head5.svg"},
    {name: "head4", value: "https://lush.s3.ap-northeast-2.amazonaws.com/hippy/head/head9.svg"},
  ];
  const [select, setSelect] = useState<string>();

  const drawCharacter = async (canvas: HTMLCanvasElement, data: typeof initial.hippy) => {
    const ctx = canvas.getContext("2d");
    const {width: x} = canvas.getBoundingClientRect();
    if (!ctx) return;
    const images = await Promise.all(custom.map(item => getImageSync(item.src)))
    
    images.forEach((image,i) => ctx.drawImage(image, x/2 - (data[i].width /2),data[i].y))
  };

  useEffect(() => {
    const ordered = custom.sort((a, b) => a.order - b.order);
    if (!canvasEl.current) return;
    drawCharacter(canvasEl.current, ordered);
  }, [custom]);

  const handleSelect = (val: string) => {
    const prevVal = custom.find((item) => item.name === category)!;
    const ctx = canvasEl.current?.getContext("2d");
    if (!ctx || !canvasEl.current) return;
    const {width: x} = canvasEl.current.getBoundingClientRect();
    ctx.clearRect(x / 2 - prevVal.width / 2, prevVal.y, prevVal.width, prevVal.width);

    setSelect(val);
    setCustom((prev) => {
      const filtered = prev.filter((item) => item.name !== category);
      return [...filtered, {...prevVal, src: val}];
    });
  };

  return <CustomLayout ref={canvasEl} tab={category} onChangeTab={setCategory} itemList={{item: data}} select={select} onSelect={handleSelect}></CustomLayout>;
};

export default Hippy;

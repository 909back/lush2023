import React, { useState, useEffect, useRef } from "react"
import styles from "../../styles/Hippy.module.scss"
import classNames from "classnames/bind"
import CustomLayout from "@/components/layout/CustomLayout"
import { tabList, initial, drawCharacter } from "@/utils/data"

const cx = classNames.bind(styles)

interface Hippyprops {
  children?: React.ReactNode
}
const Hippy = ({ }: Hippyprops) => {
  const [category, setCategory] = useState(tabList[0].value)
  const [custom, setCustom] = useState(initial.hippy)
  
  const data = [
    { name:"head1" , value: "https://lush.s3.ap-northeast-2.amazonaws.com/hippy/head/head3.svg" },
    { name:"head1" , value: "https://lush.s3.ap-northeast-2.amazonaws.com/hippy/head/head4.svg" },
    { name:"head1" , value: "https://lush.s3.ap-northeast-2.amazonaws.com/hippy/head/head5.svg" },
    { name:"head1" , value: "https://lush.s3.ap-northeast-2.amazonaws.com/hippy/head/head9.svg" },
  ]
  const [select, setSelect] = useState<string>()


  return (
    <CustomLayout tab={category} onChangeTab={setCategory} itemList={{item:data}} select={select} onSelect={setSelect}>
    </CustomLayout>
  )
}

export default Hippy
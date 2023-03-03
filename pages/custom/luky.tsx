import React from "react"
import styles from "../../styles/Luky.module.scss"
import classNames from "classnames/bind"
import CustomLayout from "@/components/layout/CustomLayout"
import { tabList } from "@/utils/data"

const cx = classNames.bind(styles)

interface Lukyprops {
  children?: React.ReactNode
}
const Luky = ({}:Lukyprops) => {
  return (
    <CustomLayout data={tabList}>
    </CustomLayout>
  )
} 

export default Luky
import React from "react"
import styles from "../../styles/Luky.module.scss"
import classNames from "classnames/bind"
import CustomLayout from "@/components/layout/CustomLayout"

const cx = classNames.bind(styles)

interface Lukyprops {
  children?: React.ReactNode
}
const Luky = ({}:Lukyprops) => {
  return (
    <CustomLayout>
    </CustomLayout>
  )
} 

export default Luky
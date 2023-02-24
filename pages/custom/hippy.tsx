import React from "react"
import styles from "../../styles/Hippy.module.scss"
import classNames from "classnames/bind"
import CustomLayout from "@/components/layout/CustomLayout"

const cx = classNames.bind(styles)

interface Hippyprops {
  children?: React.ReactNode
}
const Hippy = ({}:Hippyprops) => {
  return (
    <CustomLayout>
    </CustomLayout>
  )
} 

export default Hippy
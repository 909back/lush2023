import React from "react"
import styles from "../../styles/Star.module.scss"
import classNames from "classnames/bind"
import CustomLayout from "@/components/layout/CustomLayout"

const cx = classNames.bind(styles)

interface Starprops {
  children?: React.ReactNode
}
const Star = ({}:Starprops) => {
  return (
    <CustomLayout>
    </CustomLayout>
  )
} 

export default Star
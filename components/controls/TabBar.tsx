import React from "react";
import styles from "../../styles/TabBar.module.scss";
import classNames from "classnames/bind";
import { DataType } from "@/interfaces";
import IconArrow from "@/components/icons/ic-arrow";

const cx = classNames.bind(styles);


export interface TabBarprops<T> {
  className?: string;
  data?: DataType<T>[];
  tab?: T;
  onChangeTab?: (newTab: T) => void;
}
const TabBar = <T extends string>({
  className,
  data = [],
  tab,
  onChangeTab: handleChangeTab = () => { },
}: TabBarprops<T>) => {

  const handleClickNext = (e: React.MouseEvent) => {
    const nextIndex = data.findIndex(item => item.value === tab) + 1
    handleChangeTab(nextIndex > data.length - 1 ? data[0].value : data[nextIndex].value)
  }

  const handleClickPrev = (e: React.MouseEvent) => {
    const prevIndex = data.findIndex(item => item.value === tab) - 1
    handleChangeTab(prevIndex < 0 ? data[data.length - 1].value : data[prevIndex].value)
  }

  const handleClickTab = (value:T) => handleChangeTab(value)

  return (
    <div className={cx("tabBar-container", className)}>
      <button className={cx('control-button')} onClick={handleClickPrev}>
        <IconArrow />
      </button>
      <div className={cx('tab-wrapper')}>
        {data.map(item => <button key={item.value} className={cx("tab-btn", { active: tab === item.value })} onClick={() => handleClickTab(item.value)}>{item.name}</button>)}
      </div>
      <button className={cx('control-button', 'right')} onClick={handleClickNext}>
        <IconArrow />
      </button>
    </div>
  );
};

export default TabBar;

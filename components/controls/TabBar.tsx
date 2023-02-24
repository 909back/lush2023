import React from "react";
import styles from "../../styles/TabBar.module.scss";
import classNames from "classnames/bind";
import { DataType } from "@/interfaces";
import IconArrow from "@/components/icons/ic-arrow";

const cx = classNames.bind(styles);

const tabList:DataType<string>[] = [
    {value: 'head', name:'머리'},
    {value: 'face', name:'표정'},
    {value: 'cloth', name:'옷'},
    {value: 'acc', name:'악세사리'},
    {value: 'item', name:'아이템'},
    {value: 'background', name:'배경'},
]

interface TabBarprops<T> {
  className?: string;
  data?: DataType<string>[];
  tab?: T;
  onChangeTab?: (newTab: T) => void;
}
const TabBar = <T extends string>({
  className,
  data = tabList,
  tab,
  onChangeTab: handleChangeTab = () => {},
}: TabBarprops<T>) => {
  return (
    <div className={cx("tabBar-container")}>
      <button className={cx('control-button')}>
        <IconArrow />
      </button>
      <button className={cx('control-button','right')}>
        <IconArrow />
      </button>
    </div>
  );
};

export default TabBar;

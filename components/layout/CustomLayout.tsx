import classNames from "classnames/bind";
import {forwardRef, ForwardedRef} from "react";
import styles from "../../styles/CustomLayout.module.scss";
import PageLayout from "./PageLayout";
import {DataType} from "@/interfaces";
import IconCarmera from "../icons/ic-carmera";
import IconReset from "../icons/ic-reset";
import TabBar, {TabBarprops} from "../controls/TabBar";
import ItemContainer, {ItemContainerProps} from "../controls/ItemContainer";

const cx = classNames.bind(styles);

interface CustomLayoutProps<T> extends TabBarprops<T>, Omit<ItemContainerProps, "data"> {
  children?: React.ReactNode;
  className?: string;
  background?:string
  itemList?: {color?: string[]; item: DataType[]};
  onClickReset?: () => void,
  onClickCapture?: () => void
}

const CustomLayout = <T extends string>(
  {
    className,
    classname,
    background,
    data: tabData,
    tab,
    onChangeTab: handleChangeTab = () => {},
    itemList,
    select,
    onSelect: handleSelect = () => {},
    onClickReset:handleClickReset = () => {},
    onClickCapture:handleClickCapture = () => {}
  }: CustomLayoutProps<T>,
  ref: ForwardedRef<HTMLCanvasElement>
) => {
  return (
    <PageLayout>
      <div className={cx("custom-content-wrapper")}>
        <div style={{background}} className={cx("showcase-container", className)}>
          <canvas ref={ref} className={cx("showcase")} height={640} />
          <div className={cx('action-button-wrapper')}>
              <button className={cx('reset-button')} onClick={handleClickReset}>
                <IconReset/>
              </button>
              <button className={cx('capture-button')} onClick={handleClickCapture}>
                <IconCarmera/>
              </button>
          </div>
        </div>
        <TabBar tab={tab} data={tabData} onChangeTab={handleChangeTab} />
        <ItemContainer data={itemList} select={select} onSelect={handleSelect} classname={classname} />
      </div>
    </PageLayout>
  )
}

export default forwardRef<HTMLCanvasElement, CustomLayoutProps<any>>(CustomLayout)

import classNames from "classnames/bind";
import {useRef, forwardRef, ForwardedRef} from "react";
import styles from "../../styles/CustomLayout.module.scss";
import PageLayout from "./PageLayout";
import {DataType} from "@/interfaces";
import {tabList} from "@/utils/data";
import TabBar, {TabBarprops} from "../controls/TabBar";
import ItemContainer, {ItemContainerProps} from "../controls/ItemContainer";

const cx = classNames.bind(styles);

interface CustomLayoutProps extends TabBarprops<string>, Omit<ItemContainerProps, "data"> {
  children?: React.ReactNode;
  className?: string;
  itemList?: {color?: string[]; item: DataType[]};
}

const CustomLayout = (
  {
    children,
    className,
    data: tabData = tabList,
    tab,
    onChangeTab: handleChangeTab = () => {},
    itemList,
    select,
    onSelect: handleSelect = () => {},
  }: CustomLayoutProps,
  ref: ForwardedRef<HTMLCanvasElement>
) => {
  return (
    <PageLayout>
      <div className={cx("custom-content-wrapper")}>
        {/* <div className={cx("showcase-container", className)}>
          <div className={cx("showcase")}>{children}</div>
        </div> */}
        <div className={cx("showcase-container", className)}>
          <canvas ref={ref} className={cx("showcase")} width={480} height={600} />
        </div>
        <TabBar tab={tab} data={tabData} onChangeTab={handleChangeTab} />
        <ItemContainer data={itemList} select={select} onSelect={handleSelect} />
      </div>
    </PageLayout>
  );
};

export default forwardRef<HTMLCanvasElement, CustomLayoutProps>(CustomLayout);

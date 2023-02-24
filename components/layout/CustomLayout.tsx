import classNames from "classnames/bind";
import { useRef, forwardRef, ForwardedRef } from "react";
import styles from "../../styles/CustomLayout.module.scss";
import PageLayout from "./PageLayout";
import { DataType } from "@/interfaces";

const cx = classNames.bind(styles);

interface CustomLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

const CustomLayout = (
  { children, className }: CustomLayoutProps,
  ref: ForwardedRef<HTMLCanvasElement>
) => {
  return (
    <PageLayout>
      <div className={cx("showcase-container",className)}>
        <canvas className={cx("showcase")} ref={ref} height={640}/>
      </div>
      {children}
    </PageLayout>
  );
};

export default forwardRef<HTMLCanvasElement, CustomLayoutProps>(CustomLayout);

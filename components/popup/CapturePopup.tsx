import {useRouter} from "next/router";
import classNames from "classnames/bind";
import styles from "../../styles/CapturePopup.module.scss";
import Button from "../controls/Button";
import {PopupTypes} from "@/interfaces";
import {useRecoilState} from "recoil";
import {userImage} from "@/recoil/atom";

const cx = classNames.bind(styles);

interface CapturePopupProps extends PopupTypes.Default {
  children?: React.ReactNode;
  image: string;
}

const CapturePopup = ({onPositive: handlePositive = () => {}, onNegative: handleNegative = () => {}, image}: CapturePopupProps) => {
  const [_, setImage] = useRecoilState(userImage);
  const router = useRouter();
  const handleClick = () => {
    handlePositive();
    sessionStorage.setItem("image", image);
    setImage(image);
    router.push("/print");
  };
  return (
    <div className={cx("capture-container")}>
      <section className={cx("capture-section")}>
        <img src={image} alt="완성된 그림" className={cx("complete-png")} />
        <section className={cx("carmera-section")}>
          <div className={cx("rect-top-left")} />
          <div className={cx("rect-top-right")} />
          <div className={cx("rect-center")} />
          <div className={cx("rect-bottom-left")} />
          <div className={cx("rect-bottom-right")} />
        </section>
      </section>
      <Button onClick={handleClick}>촬영하기</Button>
    </div>
  );
};

export default CapturePopup;

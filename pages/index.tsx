import classNames from "classnames/bind";
import styles from "@/styles/Home.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import IconLogo from "@/components/icons/ic-logo";
import IconLuchChar from "@/components/icons/ic-lush-chrs"


const cx = classNames.bind(styles)

export default function Home() {

  return (
    <section className={cx("main")}>
      <IconLogo className={cx('lush-logo')} />
      <IconLuchChar className={cx('lush-characters')} />
      <Link href={`/prologue/`}>
        <button className={cx('start-button')}>시작하기</button>
      </Link>
    </section>
  );
}

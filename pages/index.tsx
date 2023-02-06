import classNames from "classnames";
import styles from "@/styles/Home.module.scss";
import IconHead1 from "@/components/icons/head1"
import { useEffect, useState } from "react";

const cx = classNames.bind(styles)

export default function Home() {
  const [click, setClick] = useState(false)

  useEffect(()=>{
    window.scrollTo(0,1)
  },[])
  return (
    <section className={styles['page-layout']}>
      <div className={styles.showcase}>
        <div className={styles.head}>
          {click && <IconHead1/>}
        </div>
      </div>
      <div className={styles['button-wrapper']}>
        <button>hair</button>
        <button>body</button>
        <button>acc</button>
        <button>shoes</button>
      </div>

      <div className={styles['item-selector']}>
        <div className={styles.head1} onClick={()=> setClick(prev => !prev)}>
          <IconHead1/>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
}

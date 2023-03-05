import classNames from 'classnames/bind'
import Image from 'next/image'
import styles from '../../styles/Print.module.scss'
import PageLayout from '@/components/layout/PageLayout'
import Button from '@/components/controls/Button'
import { userImage } from '@/recoil/atom'
import { useRecoilValue } from 'recoil'
import { useUser } from '@/utils/apiHook'
const cx = classNames.bind(styles)

interface PrintProps {
    children?: React.ReactNode
}

const Print = ({

}: PrintProps) => {
    const {data:name} = useUser()
    const image = useRecoilValue(userImage)

    const handleClick = () => {
        const download = document.createElement('a')
        download.href = image
        download.download = `${name}.png`
        download.click()

        location.href ='alisionsocial://'
    }
    return (
        <PageLayout className={cx('print-page')}>
            <section className={cx('print-content')}>
                <div className={cx('preview-container')}>
                    <h2 className={cx('page-title')}>크루원 변신 완료!</h2>
                    <div className={cx("complete-image")}>
                        <Image src={image} alt='이미지' fill />
                    </div>
                    <p className={cx('page-description')}>이제 이미지를 저장하고<br />내가 꾸민 크루원을 출력해봐요!</p>
                </div>
                <Button onClick={handleClick}>이미지 저장하기</Button>
            </section>
        </PageLayout>
    )
}

export default Print
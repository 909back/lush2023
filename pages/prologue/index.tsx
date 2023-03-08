import classNames from 'classnames/bind'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../styles/Prologue.module.scss'

const cx = classNames.bind(styles)

const MessageBox = () => {
    return <div className={cx('message-box')}>

    </div>
}

interface IndexProps {
    children?: React.ReactNode
}
const steps = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7']
const Index = ({
}: IndexProps) => {
    const [step, setStep] = useState(steps[0])
    const router = useRouter()
    const handleClick = () => {
        const nextIndex = steps.findIndex(item => item === step) + 1
        if(nextIndex === steps.length){
            return router.push('/setting')
        }
        setStep(steps[nextIndex])
    }
    return (
        <section className={cx('prologue-section')}>
            <div className={cx('step1', { visible: step === 'step1' })} onClick={handleClick} />
            <div className={cx('step2', { visible: step === 'step2' })} onClick={handleClick} />
            <div className={cx('step3', { visible: step === 'step3' })} onClick={handleClick}>
                <div className={cx('message')}>
                    <Image src='/image/messagebox1.png' alt='쿠당탕탕!' fill />
                </div>
            </div>
            <div className={cx('step4', { visible: step === 'step4' })} onClick={handleClick}>
                <div className={cx('message')}>
                    <Image src='/image/messagebox2.png' alt='쿠당탕탕!' fill />
                </div>
            </div>
            <div className={cx('step5', { visible: step === 'step5' })} onClick={handleClick}>
                <div className={cx('message')}>
                    <Image src='/image/messagebox3.png' alt='쿠당탕탕!' fill />
                </div>
            </div>
            <div className={cx('step6', { visible: step === 'step6' })} onClick={handleClick}>
            <div className={cx('message')}>
                    <Image src='/image/messagebox4.png' alt='쿠당탕탕!' fill />
                </div>
            </div>
            <div className={cx('step7', { visible: step === 'step7' })} onClick={handleClick}>
            <div className={cx('message')}>
                    <Image src='/image/messagebox5.png' alt='쿠당탕탕!' fill />
                </div>
            </div>
        </section>
    )
}

export default Index
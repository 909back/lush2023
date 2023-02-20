import * as React from "react"
import { SVGProps, memo } from "react"

interface IconProgressBarProps extends SVGProps<SVGSVGElement> {
    step?: number
}
const IconProgressBar = ({ step = 1, ...props }: IconProgressBarProps) => step === 1 ? (
    <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 3.5C12.7329 3.5 21.3803 5.22007 29.4484 8.56201C37.5166 11.9039 44.8475 16.8023 51.0226 22.9774C57.1977 29.1525 62.0961 36.4834 65.438 44.5516C68.7799 52.6197 70.5 61.2671 70.5 70" stroke="#851AFF" strokeWidth="7" strokeLinecap="round" stroke-linejoin="round" />
    </svg>
) : (<svg width="132" height="140" viewBox="0 0 132 140" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M69.0399 3.87368C80.3503 5.0778 91.1628 9.16288 100.444 15.7384C109.725 22.314 117.164 31.1602 122.051 41.4314C126.937 51.7027 129.107 63.0556 128.354 74.4049C127.601 85.7543 123.949 96.7207 117.747 106.256C111.546 115.791 103.003 123.576 92.9338 128.867C82.8649 134.158 71.6073 136.778 60.2369 136.477C48.8666 136.175 37.7636 132.962 27.9894 127.145C18.2152 121.328 10.0965 113.1 4.40931 103.25" stroke="#851AFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
</svg>)

export default memo(IconProgressBar)
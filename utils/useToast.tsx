import { Toasts } from "@/interfaces"
import { useRecoilState } from "recoil"
import { toast } from "@/recoil/atom"

const useToast = () => {
    const [toasts, setToast] = useRecoilState(toast)
    const addToast = (message:Toasts['message']) => setToast([{message, id:new Date().getTime()}])
    return {toasts, addToast}
}

export default useToast
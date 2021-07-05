import { useContext } from "react"
import { LoaderContext } from "../../context"

export const useLoader = () => {
    const [, setLoad] = useContext(LoaderContext);

    const showLoader = () => {
        setLoad(true);
    }

    const hideLoader = () => {
        setLoad(false)
    }

    return {
        showLoader,
        hideLoader
    }

}
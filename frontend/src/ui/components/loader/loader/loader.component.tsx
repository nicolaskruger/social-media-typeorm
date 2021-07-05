import { useContext } from "react"
import { LoaderContext } from "../../../../hooks"
import "./loader.css"

export const Loader = () => {
    const [load] = useContext(LoaderContext);

    return <div className={load ? "loader" : "loader__place_holder"} ></div>
}
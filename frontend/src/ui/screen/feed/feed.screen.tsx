import { useContext } from "react"
import { FunctionComponent } from "react"
import { UserContext } from "../../../hooks"
import { Page } from "../../components";

export const Feed: FunctionComponent = () => {

    const [user] = useContext(UserContext);

    return (
        <Page user={user} />
    )
}
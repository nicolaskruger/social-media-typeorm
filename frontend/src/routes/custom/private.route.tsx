import { useContext } from "react"
import { RouteProps } from "react-router-dom"
import { RoutesEnum } from "../../enum"
import { UserContext } from "../../hooks"
import { invalidUserId } from "../../types"
import { CustomRoute } from "./custom.route"

export const PrivateRoute = (props: RouteProps) => {

    const [user] = useContext(UserContext);

    const { login } = RoutesEnum;

    const access = user.id !== invalidUserId;

    return <CustomRoute redirect={login} acces={access}  {...props} />
}
import { useContext } from "react";
import { RouteProps } from "react-router-dom";
import { RoutesEnum } from "../../enum";
import { UserContext } from "../../hooks";
import { invalidUserId } from "../../types";
import { CustomRoute } from "./custom.route";

export const PublicRoute = (props: RouteProps) => {

    const [user] = useContext(UserContext);

    const { feed } = RoutesEnum;

    const access = user.id === invalidUserId;

    return <CustomRoute redirect={feed} acces={access}  {...props} />
}
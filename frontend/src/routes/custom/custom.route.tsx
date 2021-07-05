import { Route, RouteProps, Redirect } from "react-router-dom"

interface CustomRouteProps extends RouteProps {
    acces: boolean;
    redirect: string;
}

export const CustomRoute = (props: CustomRouteProps) => {

    const { acces, redirect } = props;

    if (!acces)
        return <Redirect to={redirect} />

    return <Route {...props} />
}
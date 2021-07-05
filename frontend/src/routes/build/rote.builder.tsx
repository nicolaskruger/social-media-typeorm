import React from "react";
import { KinkRouteEnum, RoutesEnum } from "../../enum"
import { Feed, Login } from "../../ui";
import { PrivateRoute, PublicRoute } from "../custom";

const { login, feed } = RoutesEnum;

const { privateRoute, publicRoute } = KinkRouteEnum;

type RouteBuild = {
    path: string,
    exact: boolean,
    kind: KinkRouteEnum,
    component: React.FunctionComponent
}


export const RouterBuilder = () => {
    const Builder: RouteBuild[] = [
        {
            path: login,
            exact: true,
            kind: publicRoute,
            component: Login
        },
        {
            path: feed,
            exact: true,
            kind: privateRoute,
            component: Feed

        },
        {
            path: './',
            exact: false,
            kind: publicRoute,
            component: Login
        }
    ]

    return (
        <>
            {Builder.map((route, index) => {
                const { kind, component, exact, path } = route;
                if (kind === privateRoute) {
                    return <PrivateRoute key={index} component={component} exact={exact} path={path} />
                }
                return <PublicRoute key={index} component={component} exact={exact} path={path} />
            })}
        </>
    )

}
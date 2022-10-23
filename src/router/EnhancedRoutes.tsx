import React, {cloneElement, ReactElement, ReactNode} from 'react';
import {Route, Routes, RoutesProps} from 'react-router-dom';
import EnhancedRoute from './EnhancedRoute';
import ProtectedRoute from './ProtectedRoute';

interface EnhancedRoutesProps extends RoutesProps {
    isAuthed?: boolean;
    userPermissions?: string[];
    loginRoute?: string;
    notAuthorizedRoute?: string;
}

const EnhancedRoutes = (props: EnhancedRoutesProps): ReactElement | null => {
    const {isAuthed, userPermissions, loginRoute, notAuthorizedRoute, children, ...rest} = props;

    const createRoutesFromChildren = (children: ReactNode | ReactNode[]): ReactElement[] => {
        const routes: ReactElement[] = [];

        React.Children.forEach(children, (element) => {
            if (!React.isValidElement(element)) {
                return;
            }

            if (element.type !== EnhancedRoute) {
                console.log(
                    `[${typeof element.type === 'string' ? element.type : element.type.name}]
                        is not a <Route> component. All component children of <Routes> must be a <Route>`
                );
                return;
            }

            let nextLevelChildren = null;
            if (element.props.children) {
                nextLevelChildren = createRoutesFromChildren(element.props.children);
            }

            let routeProps = element.props;
            if (element.props.auth || element.props.permissions) {
                routeProps = {
                    ...routeProps,
                    element: (
                        <ProtectedRoute
                            auth={element.props.auth}
                            permissions={element.props.permissions}
                            isAuthed={isAuthed}
                            userPermissions={userPermissions}
                            loginRoute={loginRoute}
                            notAuthorizedRoute={notAuthorizedRoute}
                        >
                            {element.props.element}
                        </ProtectedRoute>
                    ),
                };
            }
            const route = cloneElement(<Route />, routeProps, nextLevelChildren);
            routes.push(route);
        });

        return routes;
    };

    return <Routes {...rest}>{createRoutesFromChildren(children)}</Routes>;
};

export default EnhancedRoutes;

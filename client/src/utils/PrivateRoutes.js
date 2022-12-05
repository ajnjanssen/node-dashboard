import { Outlet, Navigate, Route } from 'react-router-dom'
import { useAuth } from '../service/AuthContext'

export const PrivateRoutes = ({ component: Component, ...rest }) => {
    // const auth = { token: true }
    const { currentUser } = useAuth()

    return (
        <Outlet
            {...rest}
            render={(props) => {
                return currentUser ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/login" />
                )
            }}
        />
    )
}

export default PrivateRoutes

import React from "react"
import { useSelector } from "react-redux"
import UnAuthPage from '../pages/UnAuthPage'
import checkRole from '../utils/checkRole'
import _ from 'lodash'
const ProtectedRoute = ({ children }) => {
    const user = useSelector(state => state.User.userInfor)
    if (_.isEmpty(user)) {
        return <UnAuthPage />
    }
    else {
        if (!checkRole(user)) {
            return <UnAuthPage />
        }
        return children
    }
}

export default ProtectedRoute

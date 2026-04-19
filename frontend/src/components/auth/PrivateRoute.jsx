/**
 * Route guard component that redirects unauthenticated users
 * to the login page, preserving the originally requested path.
 *
 * Developers:
 *  - Mohd Javed Khan      - 301523744
 *  - Brian Nubila         - 301514904
 *  - Osamahiemen Idemudia - 301476106
 *  - Andrelle Thompson    - 301519338
 *  - Adib Md. Mahin       - 301424034
 */

import { useLocation, Navigate   } from 'react-router-dom'
import { isAuthenticated } from './auth-helper'

function PrivateRoute({children}){

    let location = useLocation();

    if(!isAuthenticated()){
        return <Navigate to="/login" state={{from: location.pathname}}  />
    }

    return children
}

export default PrivateRoute;
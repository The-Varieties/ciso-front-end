import jwt_decode from 'jwt-decode'
import useToken from '../useToken'

export const GetUserIdFromToken = () => {
    const {token} = useToken();
    return jwt_decode(token).id
}
import { fetchUser } from "../utils/fetchLocalStroageData"

const userInfo = fetchUser();
export const initialState = {
    user: userInfo,
}
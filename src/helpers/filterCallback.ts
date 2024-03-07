import {IFilters, IGroup} from "../types/types";

export const filterCallback = (filterObj: IFilters, item: IGroup) => {
    let res = true
    if (filterObj.privacy !== null) {
        res = res && item.closed === filterObj.privacy
    }
    if (filterObj.hasFriends !== null) {
        res = res && (filterObj.hasFriends ? 'friends' in item : !('friends' in item))
    }
    if (filterObj.color !== null) {
        res = res && item.avatar_color === filterObj.color
    }
    return res
}
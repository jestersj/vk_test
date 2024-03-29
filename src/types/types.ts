export interface IGetGroupsResponse {
    result: 1 | 0,
    data?: IGroup[]
}

export interface IGroup {
    "id": number,
    "name": string,
    "closed": boolean,
    "avatar_color"?: string,
    "members_count": number,
    "friends"?: IUser[]
}

export interface IUser {
    "first_name": string,
    "last_name": string
}

export interface IFilters {
    privacy: boolean | null
    color: string | null
    hasFriends: boolean | null
}
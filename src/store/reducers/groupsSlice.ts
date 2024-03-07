import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFilters, IGroup} from "../../types/types";
import {fetchGroups} from "./ActionCreators";
import {filterCallback} from "../../helpers/filterCallback";

interface IState {
    groups: IGroup[],
    filteredList: IGroup[]
    filters: IFilters
    isLoading: boolean
    error: string
}

const initialState: IState = {
    groups: [],
    filteredList: [],
    filters: {
        color: null,
        privacy: null,
        hasFriends: null
    },
    isLoading: false,
    error: ''
}

export const groupsSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        setColor(state, action: PayloadAction<string | null>) {
            state.filters.color = action.payload
        },
        setPrivacy(state, action: PayloadAction<boolean | null>) {
            state.filters.privacy = action.payload
        },
        setFriends(state, action: PayloadAction<boolean | null>) {
            state.filters.hasFriends = action.payload
        },
        filterState(state) {
            const filteredArr = [...state.groups]
                .filter(el => filterCallback(state.filters, el))
            state.filteredList = [...filteredArr]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGroups.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.isLoading = false
                state.groups = action.payload.data as IGroup[]
                state.filteredList = action.payload.data as IGroup[]
                state.error = ''
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.isLoading = false
                state.error = 'Произошла ошибка'
            })
    }
})

export const {
    setColor,
    setPrivacy,
    setFriends,
    filterState
} = groupsSlice.actions
export default groupsSlice.reducer
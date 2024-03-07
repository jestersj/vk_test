import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IGetGroupsResponse, IGroup} from "../../types/types";

export const fetchGroups = createAsyncThunk<IGetGroupsResponse>(
    'group/fetchAll',
    async (_, thunkApi) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const {data} = await axios.get<IGroup[]>('http://localhost:5000/groups')
            return {
                result: 1,
                data
            }
        } catch (e) {
            return thunkApi.rejectWithValue({result: 0})
        }
    }
)
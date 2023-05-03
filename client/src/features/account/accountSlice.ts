// interface AccountState {user: User | null;}

import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";

// const initialState: AccountState = {user:null}

// exp const signinUser =  createAsyncThunk<User, FieldValues>

//export const fetchCurrentUser = createAsyncThunk<User>

//create slice


interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user:null
}

export const signinUser = createAsyncThunk<User, FieldValues>(
    'account/signinUser',
    async (data, thunkAPI) => {
        try {
            const user: any = await agent.Account.login(data);
            localStorage.setItem('user',JSON.stringify(user));
            return user;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            const user = await agent.Account.curentUser();
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        condition: () => {
            if(!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            console.log("state");
            state.user = null;
            localStorage.removeItem('user');
        },
        setUser: (state,action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            console.log('Session expiredd -please login again');
        })
        builder.addMatcher(isAnyOf(signinUser.fulfilled, fetchCurrentUser.fulfilled),(state,action) => {
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(signinUser.rejected), (state,action) => {
            throw action.payload;
        })
    })
})

export const {signOut, setUser} = accountSlice.actions;
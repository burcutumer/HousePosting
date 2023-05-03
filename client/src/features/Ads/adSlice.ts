
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { HomeAd } from "../../app/models/homeAd";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";



interface AdsState {
    adsLoaded: boolean;
    status: string;
}

const adsAdapter = createEntityAdapter<HomeAd>();

export const fetchAdsAsync = createAsyncThunk<HomeAd[],void, {state:RootState}>(
    'ads/fetchAdsAsync',
    async(_, thunkAPI) => {
        try {
            const response = await agent.Ads.list();
            return response.data;
        }catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchAdAsync = createAsyncThunk<HomeAd, number>(
    'Ads/fetchAdAsync',
    async(adId,thunkAPI) => {
        try {
            const response = await agent.Ads.fetch(adId);
            return response.data;
        }catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const adsSlice = createSlice({
    name:'ads',
    initialState: adsAdapter.getInitialState<AdsState>({
        adsLoaded: false,
        status: 'idle',
    }),
    reducers: {

    },
    extraReducers: (builder => {
        builder.addCase(fetchAdsAsync.pending, (state) => {
            state.status ='pendingAds';
        });
        builder.addCase(fetchAdsAsync.fulfilled, (state, action) => {
            adsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.adsLoaded = true;
        });
        builder.addCase(fetchAdsAsync.rejected, (state,action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchAdAsync.pending, (state) => {
            state.status ='pendingFetchAd';
        });
        builder.addCase(fetchAdAsync.fulfilled, (state, action) => {
            adsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.adsLoaded = true;
        });
        builder.addCase(fetchAdAsync.rejected, (state,action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    })
})

export const adsSelectors = adsAdapter.getSelectors((state: RootState) => state.ads);
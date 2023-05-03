// wanna add sort options

import { Grid, Paper } from "@mui/material";
import AdsList from "./AdsList";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { adsSelectors, fetchAdsAsync } from "./adSlice";
import { useEffect } from "react";

export default function Ads() {

const ads = useAppSelector(adsSelectors.selectAll);
const dispatch = useAppDispatch();
const {adsLoaded} = useAppSelector(state => state.ads);

useEffect(() => {
    if (!adsLoaded) dispatch(fetchAdsAsync());
}, [adsLoaded, dispatch])

    return (
        <Grid container columnSpacing={4}>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2 }}>
                    SEARCH OPTIONS HERE
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <AdsList ads={ads}/>
            </Grid>
        </Grid>
    )
}
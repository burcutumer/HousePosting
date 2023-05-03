import { Grid } from "@mui/material";
import { HomeAd } from "../../app/models/homeAd";
import { useAppSelector } from "../../app/store/configureStore";
import AdCardSkeleton from "./AdCardSkeleton";
import AdCard from "./AdCard";

interface Props {
    ads: HomeAd[];
}

export default function AdsList ({ads}:Props) {
    const {adsLoaded} = useAppSelector(state => state.ads);

    return (
        <Grid container spacing={4}>
            {ads.map((ad)=> (
                <Grid item xs={4} key={ad.id} >
                    {!adsLoaded ? (
                        <AdCardSkeleton/>
                    ) : (
                        <AdCard ad={ad}/>
                    )}

                </Grid>
            ))}
        </Grid>
    )
}
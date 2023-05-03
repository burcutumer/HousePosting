import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { HomeAd } from "../../app/models/homeAd";
import { Link } from "react-router-dom";

interface Props {
    ad: HomeAd;
}

export default function AdCard({ ad }: Props) {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={ad.location}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: '#00695c' }//#00796b
                }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain' }}
                image={ad.photoUrl}
                title={ad.location}
            />
            <CardContent>
                <Typography gutterBottom color="#00796b" variant="h5">
                    {ad.numberOfRooms} rooms
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {ad.squareMeters} squareMeters
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {ad.floorNumber} . floor
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {ad.heating}
                </Typography>
                {ad.balcony ? (<Typography gutterBottom variant="body2" color="text.secondary">
                    balcony
                </Typography>) : ("")}
                <Typography color="#00796b" variant="h5">
                    {ad.price} $
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={Link} to={`/ads/${ad.id}`}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#81b29a',
                            color: '#ffffff'
                        }
                    }} size="small">View
                </Button>
            </CardActions>
        </Card>
    )
}
import { Box, Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { adsSelectors, fetchAdAsync } from "./adSlice";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function AdDetails() {

    const { id } = useParams<{ id: string }>();
    const ad = useAppSelector(state => adsSelectors.selectById(state, id!));
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!ad) dispatch(fetchAdAsync(parseInt(id!)));
    }, [id, dispatch, ad])

    if (!ad) return <h3>Home Ad not found</h3>

    return (
        <Grid container spacing={6} >
            <Grid item xs={6}>
                <img src={ad.photoUrl} alt={ad.location} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Box display='flex' justifyContent='space-betwen'>
                    <Typography sx={{ color: '#00695c' }}variant="h3">{ad.location}</Typography>
                    <Button
                        size='large'  variant='contained'
                        component={Link} to={'/ads'}
                        style={{ marginLeft: "auto" }}
                        sx={{ backgroundColor: '#00796b',
                        '&:hover': {
                            backgroundColor: '#81b29a',
                            color: '#ffffff'
                          }
                         }}>
                        Back to Ads
                    </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <TableContainer>
                    <Table>
                        <TableBody>
                        {ad.isRented ? (<TableRow>
                                <TableCell>Rent</TableCell>
                                <TableCell>{ad.price}</TableCell>
                            </TableRow>) : (<TableRow>
                                <TableCell>Sale</TableCell>
                                <TableCell>{ad.price}</TableCell>
                            </TableRow>)}
                            <TableRow>
                                <TableCell>Square Meters</TableCell>
                                <TableCell>{ad.squareMeters}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Rooms</TableCell>
                                <TableCell>{ad.numberOfRooms}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Floor number</TableCell>
                                <TableCell>{ad.floorNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Heating</TableCell>
                                <TableCell>{ad.heating}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Balcony</TableCell>
                                {ad.balcony ? (<TableCell>yes</TableCell>) : (<TableCell>no</TableCell>)
                                }
                            </TableRow>
                            <TableRow>
                                <TableCell>Coordinates</TableCell>
                                <TableCell>{ad.mapCoordinates}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Created at</TableCell>
                                <TableCell>{ad.createdAt}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}
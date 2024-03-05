import { Card, CardContent, Grid } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Chart from "react-apexcharts";
export default function HeartPage({ leftHeartBPMData }) {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item sx={{ textAlign: "center" }} xs={12}>
                    <h3>Heart Rate <FavoriteIcon sx={{ color: "Red" }} /></h3>
                </Grid>
                <Grid item sx={{ textAlign: "center" }} xs={12}>
                    <h3>Heart Beats Per Minute (BPM)</h3>
                </Grid>
                <Grid item xs={12}>

                    <Card sx={{ width: '100%', backgroundColor: "white" }}>
                        <CardContent>
                            <Chart
                                options={{chart:{id: "heartpage-bpm-line"},xaxis:{categories:leftHeartBPMData.time}}}
                                series={[{name:"Heart Beats Per Minute (BPM)", data:leftHeartBPMData.bpm}]}
                                type="line"
                            />
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </>
    )
}
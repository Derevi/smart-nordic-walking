import { Card, CardContent, Grid } from "@mui/material";
import Chart from "react-apexcharts";

export default function ForcePage({ leftForceData, rightForceData }) {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item sx={{ textAlign: "center" }} xs={12}>
                    <h3>Force Exerted on Left Pole, in grams</h3>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ width: '100%', backgroundColor: "white" }}>
                        <CardContent>
                            <Chart
                                options={{ chart: { id: "dashboard-force-line" }, xaxis: { categories: leftForceData.count } }}
                                series={[{ name: "Left Force (g)", data: leftForceData.data }]}
                                type="line"
                            />
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item sx={{ textAlign: "center" }} xs={12}>
                    <h3>Force Exerted on Right Pole, in grams</h3>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ width: '100%', backgroundColor: "white" }}>
                        <CardContent>
                            <Chart
                                options={{ chart: { id: "dashboard-force-line" }, xaxis: { categories: rightForceData.count } }}
                                series={[{ name: "Right Force (g)", data: rightForceData.data }]}
                                type="line"
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sx={{ textAlign: "center" }} xs={12}>
                    <h3>Raw Force Data of Left Pole</h3>
                    <h5>current number of force data points: {leftForceData.count.at(-1)}</h5>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ width: '100%', backgroundColor: "white" }}>
                        <CardContent>
                            <pre>{JSON.stringify(leftForceData, null, 2)}</pre>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sx={{ textAlign: "center" }} xs={12}>
                    <h3>Raw Force Data of Right Pole</h3>
                    <h5>current number of force data points: {rightForceData.count.at(-1)}</h5>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ width: '100%', backgroundColor: "white" }}>
                        <CardContent>
                            <pre>{JSON.stringify(rightForceData, null, 2)}</pre>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
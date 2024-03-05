import { Card, CardContent, Grid } from "@mui/material";
import { TrackballControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Chart from "react-apexcharts";
export default function DashBoard({ objLeft, objRight, leftQuaternionData,rightQuaternionData, leftHeartBPMData, leftForceData, rightForceData }) {


    return (
        <>
            <Grid container spacing={2}>
                <Grid item sx={{ textAlign: "center" }} xs={6}>
                    <h3>Left side </h3>
                </Grid>
                <Grid item sx={{ textAlign: "center" }} xs={6}>
                    <h3>Right side </h3>
                </Grid>
                <Grid item xs={6} sx={{ height: '400px' }}>

                    <Card sx={{ height: '100%', bgcolor: "#d9ead3"  }} >
                        <CardContent sx={{ height: '100%' }}>
                            <Canvas camera={{ position: [0, 20, 20] }} >
                                {/* <PerspectiveCamera   position={[5, 5, 5]}> */}
                                <pointLight position={[10, 10, 10]} />
                                <gridHelper />
                                <axesHelper />
                                <TrackballControls />
                                <mesh quaternion={leftQuaternionData}>
                                    {/* <sphereGeometry /> */}
                                    <primitive object={objLeft} />
                                    {/* <meshStandardMaterial color="hotpink" /> */}

                                </mesh>
                                {/* </PerspectiveCamera> */}
                            </Canvas>
                            {/* <Button onClick={() => setPosition([5, 5, 5])}>click</Button> */}
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item sx={{ height: '400px' }} xs={6}>

                    <Card sx={{ height: '100%', bgcolor: "#d9ead3" }}>
                        <CardContent sx={{ height: '100%' }}>
                            <Canvas camera={{ position: [0, 20, 20] }}>
                                {/* <PerspectiveCamera   position={[5, 5, 5]}> */}
                                <pointLight position={[10, 10, 10]} />
                                <gridHelper />
                                <axesHelper />
                                <TrackballControls />
                                <mesh quaternion={rightQuaternionData}>
                                    {/* <sphereGeometry /> */}
                                    <primitive object={objRight} />
                                    {/* <meshStandardMaterial color="hotpink" /> */}

                                </mesh>
                                {/* </PerspectiveCamera> */}
                            </Canvas>
                            {/* <Button onClick={() => setPosition([5, 5, 5])}>click</Button> */}
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item sx={{ textAlign: "center" }} xs={12}>
                    <h3>Heart Beats Per Minute (BPM)</h3>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ width: '100%', backgroundColor: "white" }}>
                        <CardContent>

                            <Chart
                                options={{ chart: { id: "heartpage-bpm-line" }, xaxis: { categories: leftHeartBPMData.time } }}
                                series={[{ name: "Heart Beats Per Minute (BPM)", data: leftHeartBPMData.bpm }]}
                                type="line"
                            />
                        </CardContent>
                    </Card>

                </Grid>
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
            </Grid>
        </>
    )
}

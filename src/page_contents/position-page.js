import { Card, CardContent, Grid } from "@mui/material";
import { TrackballControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Battery80Icon from '@mui/icons-material/Battery80';

export default function PositionPage({ objLeft, objRight, leftQuaternionData, rightQuaternionData, leftPositionalData, rightPositionalData }) {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item sx={{ textAlign: "center" }} xs={6}>
                    <h3>Left side <Battery80Icon sx={{ color: "green" }} /></h3>
                </Grid>
                <Grid item sx={{ textAlign: "center" }} xs={6}>
                    <h3>Right side <Battery80Icon sx={{ color: "green" }} /></h3>
                </Grid>
                <Grid item xs={6} sx={{ height: '400px' }}>

                    <Card sx={{ height: '100%', bgcolor: "#d9ead3" }}>
                        <CardContent sx={{ height: '100%' }}>
                            <Canvas camera={{ position: [0, 20, 20] }}>
                                <pointLight position={[10, 10, 10]} />
                               
                                
                                <TrackballControls />
                                <mesh quaternion={leftQuaternionData}>
                                    <primitive object={objLeft} />
                                </mesh>
                            </Canvas>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item sx={{ height: '400px' }} xs={6}>

                    <Card sx={{ height: '100%', bgcolor: "#d9ead3" }}>
                        <CardContent sx={{ height: '100%' }}>
                            <Canvas camera={{ position: [0, 20, 20] }}>
                                <pointLight position={[10, 10, 10]} />
                             
                                <TrackballControls />
                                <mesh quaternion={rightQuaternionData}>
                                    <primitive object={objRight} />
                                </mesh>
                            </Canvas>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item sx={{ textAlign: "center" }} xs={12}>
                    <h3>Raw Positional Data of Left Pole</h3>
                    <h5>current number of force data points: {leftPositionalData.count.at(-1)}</h5>
                </Grid>
                <Grid item xs={12}>
                    <Card
                        sx={{ width: '100%', backgroundColor: "white" }}
                    // {...props}
                    >
                        <CardContent>
                            <pre>{JSON.stringify(leftPositionalData, null, 2)}</pre>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sx={{ textAlign: "center" }} xs={12}>
                    <h3>Raw Positional Data of Right Pole</h3>
                    <h5>current number of force data points: {rightPositionalData.count.at(-1)}</h5>
                </Grid>
                <Grid item xs={12}>
                    <Card
                        sx={{ width: '100%', backgroundColor: "white" }}
                    // {...props}
                    >
                        <CardContent>
                            <pre>{JSON.stringify(rightPositionalData, null, 2)}</pre>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

import { Box, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const videoList = [
    {
        id: 1,
        video: "./beauTemps1.mp4",
        title: "Beau temps",
    },
    {
        id: 2,
        video: "./beauTemps2.mp4",
        title: "Beau temps",
    },
    {
        id: 3,
        video: "./doucePluie1.mp4",
        title: "Douce pluie",
    },
    {
        id: 4,
        video: "./doucePluie2.mp4",
        title: "Douce pluie",
    },
    {
        id: 5,
        video: "./orage1.mp4",
        title: "Orage",
    },
    {
        id: 6,
        video: "./orage2.mp4",
        title: "Orage",
    },
];

export default function App() {
    const theme = useTheme();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isFirstVideo, setIsFirstVideo] = useState(true);
    const nextVideoIndex = (currentVideoIndex + 1) % videoList.length;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentVideoIndex(
                (prevIndex) => (prevIndex + 1) % videoList.length
            );
            setIsFirstVideo((prev) => !prev);
        }, 10000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Stack
            sx={{
                width: "100%",
                height: "100%",
                bgcolor: theme.palette.background.default,
            }}
        >
            <Stack
                component="header"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "300px",
                    overflow: "hidden",
                    bgcolor: "black",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <motion.video
                        key={`video-1-${currentVideoIndex}`}
                        autoPlay
                        muted
                        loop
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: isFirstVideo ? 1 : 0, scale: 1 }}
                        transition={{
                            duration: 1.5,
                            ease: "easeOut",
                        }}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                    >
                        <source
                            src={videoList[currentVideoIndex].video}
                            type="video/mp4"
                        />
                    </motion.video>
                    <motion.video
                        key={`video-2-${nextVideoIndex}`}
                        autoPlay
                        muted
                        loop
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: isFirstVideo ? 0 : 1, scale: 1 }}
                        transition={{
                            duration: 1.5,
                            ease: "easeOut",
                        }}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                    >
                        <source
                            src={videoList[nextVideoIndex].video}
                            type="video/mp4"
                        />
                    </motion.video>
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "#BCF2F6",
                            fontSize: { xs: "1.5rem", md: "4rem" },
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <Typography
                                variant="h1"
                                sx={{
                                    color: "#BCF2F6",
                                    fontSize: { xs: "1.5rem", md: "4rem" },
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                            >
                                Weather App
                            </Typography>
                        </motion.div>
                        <Typography
                            variant="h5"
                            sx={{
                                color: "#BCF2F6",
                            }}
                        >
                            Découvrez les météos de la semaine à partir du nom
                            de la ville
                        </Typography>
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
}

import {
    Box,
    Stack,
    Typography,
    useTheme,
    TextField,
    Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import CompressIcon from "@mui/icons-material/Compress";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const videoList = [
    { id: 1, video: "./beauTemps1.mp4", title: "Beau temps" },
    { id: 2, video: "./beauTemps2.mp4", title: "Beau temps" },
    { id: 3, video: "./doucePluie1.mp4", title: "Douce pluie" },
    { id: 4, video: "./doucePluie2.mp4", title: "Douce pluie" },
    { id: 5, video: "./orage1.mp4", title: "Orage" },
    { id: 6, video: "./orage2.mp4", title: "Orage" },
];

export default function App() {
    const theme = useTheme();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isFirstVideo, setIsFirstVideo] = useState(true);
    const nextVideoIndex = (currentVideoIndex + 1) % videoList.length;
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    const handleSearch = async () => {
        if (!city.trim()) {
            alert(
                "Veuillez remplir le champ Ville avant de lancer la recherche."
            );
            return;
        }
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
                    import.meta.env.VITE_KEYAPIOPENWEATHER
                }&lang=fr`
            );
            setWeather(response.data);
        } catch (error) {
            alert(
                "Ville non trouvée, veuillez réessayer avec une autre ville."
            );
            console.error("Erreur lors de la recherche de la météo:", error);
        }
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentVideoIndex(
                (prevIndex) => (prevIndex + 1) % videoList.length
            );
            setIsFirstVideo((prev) => !prev);
        }, 10000);

        return () => clearInterval(timer);
    }, []);

    // Fonction utilitaire pour convertir la température de Kelvin à Celsius
    const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

    return (
        <Stack
            sx={{
                width: "100%",
                height: "100%",
                bgcolor: theme.palette.background.default,
            }}
        >
            {/* Section vidéo en header */}
            <Stack
                component="header"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "400px",
                    overflow: "hidden",
                    bgcolor: "black",
                }}
            >
                <Box
                    sx={{ position: "relative", width: "100%", height: "100%" }}
                >
                    <motion.video
                        key={`video-1-${currentVideoIndex}`}
                        autoPlay
                        muted
                        loop
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: isFirstVideo ? 1 : 0, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
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
                        transition={{ duration: 1.5, ease: "easeOut" }}
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
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                delay: 0.3,
                            }}
                        >
                            <Typography variant="h5" sx={{ color: "#BCF2F6" }}>
                                Découvrez les météos de la semaine à partir du
                                nom de la ville
                            </Typography>
                        </motion.div>
                    </Box>
                </Box>
            </Stack>

            {/* Section de recherche */}
            <Box
                sx={{
                    bgcolor: "#BCF2F6",
                    minHeight: "500px",
                    padding: "20px",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        bgcolor: "#006BFF",
                        borderRadius: "10px",
                        padding: "20px",
                        width: "90%",
                        maxWidth: "500px",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <TextField
                        label="Ville"
                        variant="outlined"
                        value={city}
                        onChange={handleCityChange}
                        sx={{
                            bgcolor: "white",
                            borderRadius: "4px",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white" },
                                "&:hover fieldset": { borderColor: "white" },
                                "&.Mui-focused fieldset": {
                                    borderColor: "white",
                                },
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        disabled={!city.trim()}
                        sx={{
                            bgcolor: "#BCF2F6",
                            color: "#006BFF",
                            "&:hover": { bgcolor: "#9CE2E6" },
                        }}
                    >
                        Rechercher
                    </Button>
                </Box>

                {weather && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Box
                            sx={{
                                bgcolor: "rgba(255, 255, 255, 0.95)",
                                borderRadius: "15px",
                                padding: "30px",
                                width: "90%",
                                maxWidth: "600px",
                                margin: "30px auto",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <Stack spacing={3}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color: "#006BFF",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <LocationOnIcon /> {weather.name},{" "}
                                        {weather.sys.country}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: 4,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Box sx={{ textAlign: "center" }}>
                                        <ThermostatIcon
                                            sx={{
                                                fontSize: 40,
                                                color: "#006BFF",
                                            }}
                                        />
                                        <Typography
                                            variant="h3"
                                            sx={{ color: "#006BFF" }}
                                        >
                                            {kelvinToCelsius(weather.main.temp)}
                                            °C
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{ color: "#666" }}
                                        >
                                            {weather.weather[0].description}
                                        </Typography>
                                    </Box>

                                    <Stack spacing={2}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <DeviceThermostatIcon
                                                sx={{ color: "#666" }}
                                            />
                                            <Typography>
                                                Ressenti:{" "}
                                                {kelvinToCelsius(
                                                    weather.main.feels_like
                                                )}
                                                °C
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <OpacityIcon
                                                sx={{ color: "#666" }}
                                            />
                                            <Typography>
                                                Humidité:{" "}
                                                {weather.main.humidity}%
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <AirIcon sx={{ color: "#666" }} />
                                            <Typography>
                                                Vent:{" "}
                                                {Math.round(
                                                    weather.wind.speed * 3.6
                                                )}{" "}
                                                km/h
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <CompressIcon
                                                sx={{ color: "#666" }}
                                            />
                                            <Typography>
                                                Pression:{" "}
                                                {weather.main.pressure} hPa
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                    </motion.div>
                )}
            </Box>
            <Stack
                component="footer"
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ bgcolor: "#006BFF", height: "100px", padding: "24px" }}
            >
                <Typography variant="h6" sx={{ color: "#BCF2F6" }}>
                    Météo de la semaine à partir du nom de la ville
                </Typography>
                <Typography variant="h6" sx={{ color: "#BCF2F6" }}>
                    @2025 WeatherPlan App, Claude Lk
                </Typography>
            </Stack>
        </Stack>
    );
}

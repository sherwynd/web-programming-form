import { Box, Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme/color";
import EventCard from "../../components/EventCard";
import Grid from "@mui/material/Grid";
import { Outlet, useNavigate } from "react-router-dom";

export function Coaching() {
  const eventIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/coaching/create");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <Button onClick={handleCreateClick} variant="outlined" color="primary">
          Create
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={4}>
          {eventIds.map((id) => (
            <Grid key={id} item xs={12} sm={6} md={4}>
              <EventCard id={id} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Outlet />
    </ThemeProvider>
  );
}

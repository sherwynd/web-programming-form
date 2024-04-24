import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/Logo.webp";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else {
      setEmailError("");
    }
    if (!newPassword) {
      setNewPasswordError("New Password is required");
      return false;
    } else {
      setNewPasswordError("");
    }
    const forgotPasswordFormDetail = { email, newPassword };
    console.log(forgotPasswordFormDetail);
  };
  const handleNavigateToLogin = (e) => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: 'url("https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 400,
          maxWidth: 600,
        }}
        elevation={8}
      >
        <Box sx={{ textAlign: "center" }}>
          <img src={logo} alt="Sport Mou Logo" style={{ maxWidth: "150px", marginBottom: "5px" }} />
          <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
            Reset Password
          </Typography>
        </Box>
        <TextField
          fullWidth
          required
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          type={showPassword ? "text" : "password"}
          id="newPassword"
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={!!newPasswordError}
          helperText={newPasswordError}
          margin="normal"
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            )
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleNavigateToLogin}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

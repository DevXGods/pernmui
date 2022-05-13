import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import {AppBar, Box, Container, Toolbar, Typography, Button} from "@mui/material";




const Navbar = () => {
    const navigate = useNavigate();



  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
            <Container>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: "none", color: '#eee'}}>
                        PERN Stack
                        </Link>
                    </Typography>
                    <Button variant="contained"
              color="primary" onClick={() => navigate("/tasks/new")}>New Task</Button>
                </Toolbar>
            </Container>
        </AppBar>
    </Box>
  )
}

export default Navbar
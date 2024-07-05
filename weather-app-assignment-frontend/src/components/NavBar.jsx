import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Dialog,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    Stack,
    Toolbar,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { styled } from "@mui/system";
  import { useNavigate } from "react-router-dom";
  import PersonIcon from '@mui/icons-material/Person';

  const StyledDialog = styled(Dialog)`
    & .MuiBackdrop-root {
      backdrop-filter: none;
      background-color: transparent;
      position: fixed !important;
      z-index: -1 !important;
    }

    position: absolute;
    top: -320px;
    left: 900px;
  `;

  const NavBar = () => {
    const [heading, setHeading] = useState();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    let {name} =  JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
      let op = localStorage.getItem("heading");
      setHeading(op);

    }, []);

    let handleClickOpen = () => {
      setOpen(true);
    };

    let handleClose = () => {
      setOpen(false);
    };

    let handleSignOut = () => {
        console.log('clicked')
      navigate("/login");
      localStorage.clear();
    };

    return (
      <>
        <Box sx={{position:"relative",height: "20px", width: "97vw" }}>


        <List
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <ListItem>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "rgb(86, 85, 85)",
                paddingLeft: "20px",
                fontSize: "20px",
              }}
            >
              {heading == null ? `Dashboard` : `${heading}`}
            </Typography>
          </ListItem>

          <Stack
            sx={{
              width: "400px",
              alignItems: "center",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            direction="row"
            spacing={2}
            onClick={handleClickOpen}
          >
              <>
              <Typography component="h5" sx={{ fontWeight: "bold",color:"black" }}>
                    {name}
                    </Typography>
                <ListItemAvatar>
                <Avatar>
                    <PersonIcon />
                 </Avatar>
                </ListItemAvatar>

              </>
          </Stack>
        </List>
        <Divider sx={{ margin: "0 auto", width: "94%" }} />
        <StyledDialog onClose={handleClose} open={open}>
            <div
              style={{
                width: "201px",
                height: "101px",
              }}
            >
              <List>
              <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ borderRadius: "20px", marginTop: "15px" }}
                    onClick={handleSignOut}
                  >
                    <Typography component="h5" sx={{ fontWeight: "bold" }}>
                      Sign Out
                    </Typography>
                  </Button>
                </ListItem>
                <Divider sx={{ width: "90%", margin: "0 auto" }} />


              </List>
            </div>
        </StyledDialog>
        </Box>



      </>
    );
  };

  export default NavBar;

import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  Container,
  Hidden,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { HOME } from "../../routers/routes";
import SigninDialog from "./components/SigninDialog";
import SignupDialog from "./components/SignupDialog";
import { mainLayoutStyles } from "./styles";

type MainLayoutProps = {
  children: NonNullable<React.ReactNode>;
  handleSearch?: (data: any) => Promise<void>;
};

const MainLayout = ({ children, handleSearch }: MainLayoutProps) => {
  const classes = mainLayoutStyles();
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const pass = () => {
    return;
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            QA-App
          </Typography>
          <Hidden smDown>
            <form onSubmit={handleSubmit(handleSearch ? handleSearch : pass)}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  {...register("search")}
                />
              </div>
            </form>
          </Hidden>
          {!auth?.user?.isAuthenticated && <SignupDialog />}
          {!auth?.user?.isAuthenticated && <SigninDialog />}
          {auth?.user?.isAuthenticated && (
            <Button color="inherit" onClick={auth?.signout}>
              Sign out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className={classes.containerCustom}>
        {children}
      </Container>
    </>
  );
};

export default MainLayout;

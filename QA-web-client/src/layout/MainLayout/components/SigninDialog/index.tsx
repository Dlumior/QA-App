import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../hooks/useAuth";
import { IUser } from "../../../../interfaces/IUser";

const SigninDialog = () => {
  const auth = useAuth();
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: IUser) => {
    auth?.signin(data.username, data.password);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Sign in
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
          <DialogContent>
            <DialogContentText>Welcome back!</DialogContentText>
            <TextField
              margin="dense"
              id="usernameSignin"
              label="Username"
              type="text"
              fullWidth
              {...register("username", { required: true })}
            />
            <TextField
              margin="dense"
              id="passwordSignin"
              label="Password"
              type="password"
              fullWidth
              {...register("password", { required: true })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Sign in
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default SigninDialog;

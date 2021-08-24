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

type QuestionDialogProps = {
  refreshQuestionsObj?: {
    refreshQuestions: boolean;
    setRefresQuestions: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const QuestionDialog = ({ refreshQuestionsObj }: QuestionDialogProps) => {
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

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/question/${auth?.user?.id}`,
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
          }),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
      }
    } catch (error) {
      console.log(error.message);
    }
    if (refreshQuestionsObj)
      refreshQuestionsObj.setRefresQuestions((prev) => !prev);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Make a question
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {!auth?.user?.isAuthenticated && (
          <>
            <DialogTitle id="alert-dialog-title">
              You can't make post
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                In order to make a new question you need to signin
              </DialogContentText>
            </DialogContent>
          </>
        )}
        {auth?.user?.isAuthenticated && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle id="form-dialog-title">
              Make a new question
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                {...register("title", { required: true })}
              />
              <TextField
                margin="dense"
                id="description"
                label="Description"
                multiline
                minRows={5}
                maxRows={10}
                fullWidth
                {...register("description", { required: true })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Ask!
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>
    </div>
  );
};

export default QuestionDialog;

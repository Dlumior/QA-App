import { Avatar, Box, Button, Typography } from "@material-ui/core";
import React from "react";
import QuestionDialog from "../QuestionDialog";

type UserInformationCardProps = {
  username?: string;
  refreshQuestionsObj?: {
    refreshQuestions: boolean;
    setRefresQuestions: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const UserInformationCard = ({
  username,
  refreshQuestionsObj,
}: UserInformationCardProps) => {
  return (
    <>
      <Typography variant="h5" color="textSecondary">
        User Information
      </Typography>
      <Box my={2} display="flex" alignItems="center" justifyItems="center">
        {username && <Avatar>{username[0]}</Avatar>}
        <Box ml={2}>
          <Typography>{username}</Typography>
        </Box>
      </Box>
      <QuestionDialog refreshQuestionsObj={refreshQuestionsObj} />
    </>
  );
};

export default UserInformationCard;

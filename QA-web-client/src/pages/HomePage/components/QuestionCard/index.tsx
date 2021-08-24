import React from "react";
import Typography from "@material-ui/core/Typography";
import { QuestionCardStyles } from "./styles";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import ForumIcon from "@material-ui/icons/Forum";
import { Link as RouterLink } from "react-router-dom";

type QuestionProps = {
  id: number;
  title: string;
  description: string;
  solved: boolean;
};

type UserQuestionProp = {
  username: string;
  createdAt?: string;
  updatedAt?: string;
};

type QuestionCardProps = {
  questionProp: QuestionProps;
  userQuestionProp: UserQuestionProp;
};

const QuestionCard = ({
  questionProp,
  userQuestionProp,
}: QuestionCardProps) => {
  const classes = QuestionCardStyles();

  return (
    <List className={classes.root}>
      <ListItem
        alignItems="flex-start"
        button
        component={RouterLink}
        to={{ pathname: "/question", search: `?id=${questionProp.id}` }}
      >
        <ListItemText
          primary={questionProp.title}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {userQuestionProp.username + " - " + questionProp.description}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider />
    </List>
  );
};

export default QuestionCard;

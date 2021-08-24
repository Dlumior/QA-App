import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "../../hooks/useQuery";
import { IAnswerUser } from "../../interfaces/IAnswer";
import { IQuestionUser } from "../../interfaces/IQuestion";
import MainLayout from "../../layout/MainLayout";

const QuestionPage = () => {
  const query = useQuery();
  const auth = useAuth();
  const [question, setQuestion] = useState<IQuestionUser>();
  const [answers, setAnswers] = useState<IAnswerUser[] | null>(null);
  const [refreshAnswers, setRefreshAnswers] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/question-p/${query.get("id")}`,
          {
            method: "GET",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setQuestion(data.question);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchQuestion();
  }, []);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/answer/${query.get("id")}`,
          {
            method: "GET",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setAnswers(data.answer);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAnswers();
  }, [refreshAnswers]);

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/answer/${query.get("id")}`,
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: auth?.user?.id,
            answer: data.answer,
          }),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setRefreshAnswers((prev) => !prev);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <MainLayout>
      <Paper>
        <Box p={2}>
          <Typography variant="h4">Question</Typography>
          <Box mt={2}>
            <Typography variant="h5">{question?.title}</Typography>
            <Typography variant="body1">{question?.description}</Typography>
          </Box>
        </Box>
      </Paper>
      <Box mt={3}>
        <Paper>
          <Box p={2}>
            <Typography variant="h4">Answers</Typography>
            {answers &&
              answers.map((item) => (
                <Box key={item.id}>
                  <Box mt={2} mb={1}>
                    <Typography variant="caption">
                      {item.UserInstance.username}
                    </Typography>
                    <Typography variant="body1">{item.answer}</Typography>
                  </Box>
                  <Divider />
                </Box>
              ))}
            {(answers === null || answers.length === 0) && (
              <Box mt={2} mb={1}>
                <Typography variant="body1">
                  There is no answers yet.
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
      {auth?.user?.isAuthenticated && (
        <Box mt={3}>
          <Paper>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box p={2}>
                <Typography variant="h5">Your answer</Typography>
                <Box mt={2} mb={1} display="flex">
                  <TextField
                    id="standard-textarea"
                    label="Write your answer"
                    minRows={8}
                    maxRows={12}
                    variant="outlined"
                    multiline
                    fullWidth
                    {...register("answer")}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Post
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>
        </Box>
      )}
    </MainLayout>
  );
};

export default QuestionPage;

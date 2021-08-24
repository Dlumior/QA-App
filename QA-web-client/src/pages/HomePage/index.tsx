import { Avatar, Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import QuestionCard from "./components/QuestionCard";
import fetch from "isomorphic-fetch";
import { IQuestionUser } from "../../interfaces/IQuestion";
import { Paper } from "@material-ui/core";
import { useAuth } from "../../hooks/useAuth";
import UserInformationCard from "./components/UserInformationCard/indes";

const HomePage = () => {
  const [questions, setQuestions] = useState<IQuestionUser[]>([]);
  const [refreshQuestions, setRefresQuestions] = useState<boolean>(false);
  const auth = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/question/", {
          method: "GET",
        });
        if (response.status === 200) {
          const data = await response.json();
          setQuestions(data.question.reverse());
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchQuestions();
  }, [refreshQuestions]);

  const handleSearch = async (data: any) => {
    try {
      const response = await fetch("http://localhost:5000/api/question-s/", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: data.search,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        setQuestions(data.question.reverse());
      }
    } catch (error) {
      console.log(error.message);
      setRefresQuestions((prev) => !prev);
    }
  };

  return (
    <MainLayout handleSearch={handleSearch}>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={12} md={3} xl={2}>
          <Paper>
            <Box p={2}>
              <UserInformationCard
                username={auth?.user?.email}
                refreshQuestionsObj={{
                  refreshQuestions,
                  setRefresQuestions,
                }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9} xl={10}>
          <Paper>
            <Box p={2}>
              <Typography variant="h4">Questions</Typography>
              {questions.map((item) => {
                return (
                  <QuestionCard
                    key={item.id}
                    questionProp={{
                      id: item.id,
                      title: item.title,
                      description: item.description,
                      solved: item.solved,
                    }}
                    userQuestionProp={{
                      username: item.UserInstance.username,
                      createdAt: item.UserInstance.createdAt,
                    }}
                  />
                );
              })}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default HomePage;

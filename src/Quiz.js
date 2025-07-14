import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  LinearProgress,
  Alert,
  Slide
} from '@mui/material';

function QuizHeader({ current, total }) {
  const progress = ((current + 1) / total) * 100;
  return (
    <Box mb={2}>
      <LinearProgress variant="determinate" value={progress} sx={{ borderRadius: 1 }} />
    </Box>
  );
}

export default function Quiz({ questions, onRestart }) {
  const [current, setCurrent]       = useState(0);
  const [selected, setSelected]     = useState(null);
  const [score, setScore]           = useState(0);
  const [showScore, setShowScore]   = useState(false);
  const [answered, setAnswered]     = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);

  const q = questions[current];

  const handleAnswer = idx => {
    setSelected(idx);
    const correct = q.answerOptions[idx].isCorrect === 'true';
    setWasCorrect(correct);
    if (correct) setScore(s => s + 1);
    setAnswered(true);
  };

  const handleNext = () => {
    setAnswered(false);
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <Slide in mountOnEnter unmountOnExit>
        <Paper elevation={2}>
          <Box textAlign="center" p={4}>
            <Typography variant="h2" gutterBottom>
              🎉 You scored {score} / {questions.length}
            </Typography>
            <Button variant="contained" onClick={onRestart}>
              Take another quiz
            </Button>
          </Box>
        </Paper>
      </Slide>
    );
  }

  return (
    <Slide direction="left" in mountOnEnter unmountOnExit timeout={300}>
      <Paper elevation={2}>
        <Box p={4}>
          <QuizHeader current={current} total={questions.length} />

          <Typography variant="subtitle1" color="neutral.main">
            Question {current + 1} / {questions.length}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {q.questionText}
          </Typography>

          <FormControl component="fieldset">
            <RadioGroup value={selected !== null ? String(selected) : ''}>
              {q.answerOptions.map((opt, idx) => (
                <FormControlLabel
                  key={idx}
                  value={String(idx)}
                  control={<Radio color="primary" />}
                  label={
                    <Typography
                      sx={{
                        fontWeight: selected === idx ? 600 : 400,
                        color: selected === idx ? 'primary.main' : 'text.primary'
                      }}
                    >
                      {opt.answerText}
                    </Typography>
                  }
                  onChange={() => handleAnswer(idx)}
                  disabled={answered}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {answered && (
            <Alert severity={wasCorrect ? 'success' : 'error'} sx={{ mt: 2 }}>
              {wasCorrect ? 'Correct!' : 'Oops, incorrect.'}
            </Alert>
          )}

          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              disabled={!answered}
              onClick={handleNext}
            >
              {current + 1 === questions.length ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Slide>
  );
}

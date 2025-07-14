// src/App.js
import React, { useState, useMemo } from 'react';
import quizData from './quizData.json';
import Quiz from './Quiz';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Paper,
  Stack,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Fade,
  Slide,
  InputBase,
  useScrollTrigger,
  CssBaseline,
  ThemeProvider
} from '@mui/material';

import { experimental_extendTheme, styled, alpha } from '@mui/material/styles';
import QuizIcon from '@mui/icons-material/Quiz';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon  from '@mui/icons-material/DarkMode';

// 1) Build an M3-compatible theme with light/dark schemes
const theme = experimental_extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary:           { main: '#6750A4', contrastText: '#fff' },
        primaryContainer: { main: '#EADDFF', contrastText: '#21005D' },
        secondary:         { main: '#625B71', contrastText: '#fff' },
        background:        { default: '#F2EFEA', paper: '#FFFFFF' }
      }
    },
    dark: {
      palette: {
        primary:           { main: '#D0BCFF', contrastText: '#381E72' },
        primaryContainer: { main: '#4F378B', contrastText: '#EADDFF' },
        secondary:         { main: '#CCC2DC', contrastText: '#332D41' },
        background:        { default: '#1D192B', paper: '#2E2A37' }
      }
    }
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: 'var(--mui-palette-background-default)' }
      }
    }
  }
});

// 2) Hide/show elevation on scroll
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  return React.cloneElement(children, { elevation: trigger ? 4 : 0 });
}

// 3) Styled Search wrapper & input
const Search = styled('div')(({ theme }) => ({
  position:  'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto'
  }
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems:'center',
  justifyContent:'center'
}));
const StyledInput = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1,1,1,0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '12ch',
    '&:focus': { width: '20ch' }
  }
}));

export default function App() {
  // state: quiz selection, search term, theme mode
  const allQuizzes    = quizData[0].quizzes;
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [searchTerm,  setSearchTerm]     = useState('');
  const [mode,        setMode]           = useState('light');

  // filter & group logic (unchanged)
  const filtered = useMemo(
    () => allQuizzes.filter(q => q.title.toLowerCase().includes(searchTerm.toLowerCase())),
    [allQuizzes, searchTerm]
  );
  const grouped = useMemo(() => {
    return filtered.reduce((acc, q) => {
      const ln = q.title.match(/^Lesson\s+(\d+)/)?.[1] || '0';
      (acc[ln] = acc[ln]||[]).push(q);
      return acc;
    }, {});
  }, [filtered]);
  const lessons = useMemo(() => Object.keys(grouped).sort((a,b)=>a-b), [grouped]);

  return (
    <ThemeProvider theme={theme} mode={mode}>
      <CssBaseline />

      <ElevationScroll>
        <AppBar
          position="sticky"
          sx={{
            bgcolor: 'primaryContainer.main',
            color:  'primaryContainer.contrastText',
            borderBottomLeftRadius: 16,
            borderBottomRightRadius:16
          }}
        >
          <Toolbar
            sx={{
              justifyContent:{ xs:'center', md:'flex-start' },
              '& .MuiTypography-root': {
                textAlign:{ xs:'center', md:'left' }
              }
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              sx={{ mr: { md:1 }, display:{ xs:'none', md:'inline-flex'} }}
            >
              <QuizIcon />
            </IconButton>

            <Typography variant="h6" noWrap sx={{ flexGrow:1 }}>
              IoT Development for Beginners: Quizzes
            </Typography>

            {/* integrated search */}
            <Search>
              <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
              <StyledInput
                placeholder="Search…"
                inputProps={{ 'aria-label':'search' }}
                value={searchTerm}
                onChange={e=>setSearchTerm(e.target.value)}
              />
            </Search>

            {/* dark/light toggle */}
            <IconButton
              color="inherit"
              onClick={() => setMode(m => (m==='light'?'dark':'light'))}
            >
              {mode==='light' ? <DarkModeIcon/> : <LightModeIcon/>}
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <Container maxWidth="md" sx={{ py:4 }}>
        {!selectedQuiz ? (
          lessons.map((lesson, idx) => (
            <Fade in key={lesson} timeout={300+idx*100}>
              <Paper elevation={2} sx={{ mb:3, p:2 }}>
                <Typography variant="h5" gutterBottom>
                  Lesson {lesson}
                </Typography>
                <Stack spacing={2}>
                  {grouped[lesson].map(q => (
                    <Card
                      key={q.id}
                      sx={{
                        width:'100%',
                        transition:'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform:'scale(1.05)',
                          boxShadow: theme=>theme.shadows[6]
                        }
                      }}
                    >
                      <CardActionArea onClick={()=>setSelectedQuiz(q)}>
                        <CardContent sx={{ display:'flex', alignItems:'center' }}>
                          <QuizIcon color="secondary" sx={{ mr:1 }} />
                          <Typography variant="subtitle1">
                            {q.title}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))}
                </Stack>
              </Paper>
            </Fade>
          ))
        ) : (
          <>
            <Box mb={2}>
              <Typography
                component="span"
                onClick={()=>setSelectedQuiz(null)}
                sx={{
                  cursor:'pointer',
                  color:'secondary.main',
                  fontWeight:500,
                  '&:hover':{ textDecoration:'underline' }
                }}
              >
                ← Back to quiz list
              </Typography>
            </Box>
            <Typography variant="h4" gutterBottom>
              {selectedQuiz.title}
            </Typography>
            <Quiz
              questions={selectedQuiz.quiz}
              onRestart={()=>setSelectedQuiz(null)}
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

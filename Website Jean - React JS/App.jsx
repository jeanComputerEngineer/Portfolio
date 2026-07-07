import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './Utils/ThemeContext';
import TopMenu from './MainScreens/TopMenu/TopMenu';
import NotFound from './MainScreens/NotFound/NotFound';
import AuthPage from './Projects/ToDoList/AuthPage';
import ProtectedRoute from './Projects/ToDoList/ProtectedRoute';
import SoftwareDivider from './Projects/DivisorSoftware/DivisorSoftware';
import IC from './Projects/CI/CI';
import Blog from './MainScreens/Blog/Blog';


const HomeScreen = lazy(() => import('./MainScreens/Resume/Resume'));
const QuoteRequest = lazy(() => import('./MainScreens/BudgetRequest/BudgetRequest'));
const ProjectsPage = lazy(() => import('./MainScreens/Projects/Projects'));
const Showcase = lazy(() => import('./MainScreens/Showcase/Showcase'));
const ToDoList = lazy(() => import('./Projects/ToDoList/ToDoList'));
const Countdown = lazy(() => import('./Projects/Countdown/CountdownIndex'));
const Quiz = lazy(() => import('./Projects/Quiz/QuizApp'));
const AnimalAgeSimulator = lazy(() => import('./Projects/AnimalAgeSimulator/AnimalAgeSimulator'));
const Evaluation = lazy(() => import('./Projects/Evaluation/Evaluation'));
const WebDevInitialScreen = lazy(() => import('./Projects/WebDevUepg/WebDevHome'));
const WebDevWork1 = lazy(() => import('./Projects/WebDevUepg/HomeWork 1/Trabalho1DevWeb'));
const BottomMenu = lazy(() => import('./MainScreens/BottomMenu/BottomMenu'));
const Personal = lazy(() => import('./MainScreens/Personal/Personal'));
const DesktopSoftware = lazy(() => import('./Projects/DesktopSoftware/DesktopSoftware'));
const ResidentialExpenses = lazy(() => import('./Projects/ResidentialExpenses/index'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {


  return (
    <Router>
      <ThemeProvider>
        <ScrollToTop />
        <Suspense fallback={<div>Loading...</div>}>
          <TopMenu />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/Resume" element={<HomeScreen />} />
            {/* <Route path="/QuoteRequest" element={<QuoteRequest />} />
            <Route path="/Showcase" element={<Showcase />} />
            <Route path="/Blog" element={<Blog />} /> */}
            <Route path="/Personal" element={<Personal />} />
            <Route path="/Projects" element={<ProjectsPage />} />
            <Route path="/Projects/To-Do-List/auth" element={<AuthPage />} />
            <Route
              path="/Projects/To-Do-List"
              element={
                <ProtectedRoute>
                  <ToDoList />
                </ProtectedRoute>
              }
            />
            <Route path="/Projects/Countdown" element={<Countdown />} />
            <Route path="/Projects/Quiz" element={<Quiz />} />
            <Route path="/Projects/AnimalAgeSimulator" element={<AnimalAgeSimulator />} />
            <Route path="/Projects/Evaluation" element={<Evaluation />} />
            <Route path="/Projects/WebDev" element={<WebDevInitialScreen />} />
            <Route path="/Projects/WebDev/Work1" element={<WebDevWork1 />} />
            <Route path="/Projects/SoftwareDivider" element={<SoftwareDivider />} />
            <Route path="/Projects/IC" element={<IC />} />
            <Route path="/Projects/DesktopSoftware" element={<DesktopSoftware />} />
            <Route path="/Projects/ResidentialExpenses" element={<ResidentialExpenses />} />
          </Routes>
          <BottomMenu />
        </Suspense>
      </ThemeProvider>
    </Router>
  );
}

export default App;

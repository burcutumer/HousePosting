import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './Header';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import Ads from '../../features/Ads/Ads';
import Profile from '../../features/profile/Profile';
import Register from '../../features/account/Register';
import AdDetails from '../../features/Ads/AdDetails';
import Login from '../../features/account/Login';

function App() {

  const theme = createTheme({
    palette: {
      background: {
        default: '#eaeaea'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/ads' element={<Ads/>}/>
          <Route path='/ads/:id' element={<AdDetails/>}/>
          <Route path='/new' element={<Ads/>}/>
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<HomePage/>}/>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;

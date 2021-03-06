import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import './App.css';
import BookDetails from './BookDetails';
import AllBooksPage from './AllBooksPage';
import { BrowserRouter as Router, Link as RouterLink, 
  Switch, Route, useHistory, Redirect, 
  useLocation} from 'react-router-dom';

import { Button } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { addBook } from './accessHooks';
import BookDetailsPage from './BookDetailsPage';
import BookSearchPage from './BookSearchPage';

import { useAuth, ProvideAuth} from './useAuth';
import { Formik } from 'formik';
import { TextField } from '@mui/material';


const AuthButton = () => {
  const [login, error, signin, signout] = useAuth();
  const history = useHistory();
  if(login){
      return <Button variant="contained" onClick={() => {
          signout( () => history.push("/"));            
      }}>Излогуј се</Button>
  }else{
      return <Button variant="contained" component={RouterLink} to="/login">Логин</Button>
  }
}

const PrivateRoute = ({children, ...rest}) => {
  const [login, error, signin, signout] = useAuth();
  return (
      <Route
          {...rest}
          render={({location}) => {
              if(login){
                  return children;
              }else{
                  return <Redirect
                      to={{pathname: "/login", state: {from: location}}}
                  />
              }
          }}
          />
  ); 
}

const LoginBox = () => {
  const history = useHistory();
  const location = useLocation();
  const [login, error, signin, signout] = useAuth();
  
  let {from} = location.state || { from : { pathname: "/"}};
  return <div className="loginBox">
      <h3>Форма за логин</h3>
      <Formik
          initialValues={{username: "", password: ""}}
          onSubmit={(values, { setSubmitting }) => {
              signin(values.username, values.password, () => {
                  setSubmitting(false);
              }, () => {
                  history.replace(from);
              });
          }}
      >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            validateField,
            isSubmitting
          }) => (
              <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth 
                    variant="outlined" 
                    name="username" 
                    value={values.username} 
                    label="Корисничко име" 
                    onChange={handleChange}
                  /><br/>
                  <TextField 
                    fullWidth
                    variant="outlined" 
                    name="password" 
                    value={values.password} 
                    label="Лозинка" 
                    onChange={handleChange}
                    type="password"                    
                  /><br/>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    Логин
                  </Button>
                  <div>{(error) ? error : ""}</div>
              </form>
          )}
      </Formik>
  </div>
}

const AddBookPage = () => {
  const [login] = useAuth();
  return <BookDetails startingMode="create" action={(book) => addBook(book, login)}/>
}

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <ProvideAuth>
        <Router>
          <div className="main">
            <div className="zaglavlje">
              <h1>Недовршена књижара</h1>
            </div>
              
            <div class="levi_meni">
                <div class="dropdown">
                    <button class="dropbtn"> <h3> Категорије ∇ </h3> </button>
                    <div class="dropdown-content">
                        <a href="akc"><p><i> Акција ⨁ </i></p></a>
                        <a href="dtk"><p> <i> Детективски ⨁ </i> </p></a>
                        <a href="drm"><p> <i> Драма ⨁ </i> </p></a>
                        <a href="ksk"><p> <i> Класици светске књижевности ⨁ </i> </p></a>
                        <a href="tr"><p> <i> Трилери ⨁ </i> </p></a>
                        <a href="strlt"><p> <i> Стручна литература ⨁ </i> </p></a>
                    </div>
                </div>

                <div class="dropdown">
                    <button class="dropbtn"> <h3> Аутори ▹ </h3> </button>
                </div> 

                <div class="dropdown">
                    <button class="dropbtn"> <h3> Наслови ▹ </h3> </button>
                </div> 

            </div>


            <nav className="mainNav">
              <Button component={RouterLink} to="/allbooks" variant="contained" sx={{marginRight: "10px"}}>
                  Све књиге
              </Button>
              <Button component={RouterLink} to="/searchbooks" variant="contained" sx={{marginRight: "10px"}}>
                  Претрага
              </Button>
              <Button component={RouterLink} to="/searchauthor" variant="contained" sx={{marginRight: "10px"}}>
                  Аутори
              </Button>
              <Button component={RouterLink} to="/addbook" variant="contained">
                  Додај књигу
              </Button>
              <span style={{flexGrow: 1}}/>
              <AuthButton></AuthButton>
            </nav>
            <div className="mainContent">
              <Switch>
                <Route path="/login">
                  <LoginBox/>
                </Route>
             {/* <Route path="/register">
                <RegisterBox/>
              </Route>  */}
                <PrivateRoute path="/allbooks">
                  <AllBooksPage/>
                </PrivateRoute>
                <PrivateRoute path="/searchbooks">
                  <BookSearchPage/>
                </PrivateRoute>
               {/* <PrivateRoute path="/searchauthor">
                  <SearchAuthorPage/>
                </PrivateRoute> */}
                <PrivateRoute path="/book/new">
                  <AddBookPage/>
                </PrivateRoute>
                <PrivateRoute path="/book/:cid/:operation">
                  <BookDetailsPage/>
                </PrivateRoute>
                <Route path="/">
                  <h1>Пример недовршеног задатка</h1>
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </ProvideAuth>
    </LocalizationProvider>
  );
}

export default App;
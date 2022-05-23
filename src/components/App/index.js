import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Home from '../Home';
import { getCurrentUser } from '../../services/authServices';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        {
          getCurrentUser() ? null : <Route path="/registre" exact element={<SignUp />} />
        }
        <Route path="/" exact element={getCurrentUser() ? <Home /> : <SignIn />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
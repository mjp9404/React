import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes,  Route, Link} from "react-router-dom";
import CategoryList from './components/categories-list.component';
import EditCategory from './components/edit-category.component';
import MyNavbar from './components/user-navbar.component';
import Register from "./components/Register";
import Login from "./components/login"
import UserList from './components/users-listbyAdmin';
import EditUser from './components/edit-users';

function App() {
  return (
    <Router>
      <MyNavbar/>
      <div className='container'>
        <br/>
        <Routes>
          {/* <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/categories" element={<CategoryList/>}/>
          <Route path="/edit/:id" element = {<EditCategory/>}/> */}


          <Route path="/" element={<UserList/>}/>
          <Route path="/edit/:id" element = {<EditUser/>}/>
        </Routes>
      </div>
    </Router>
   );
 }

export default App;

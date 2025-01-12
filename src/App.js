import { Route, Routes,Navigate } from 'react-router-dom';
import './App.css';
import CourseSubcategory from './components/CourseSubCategory/CourseSubcategory';
import Coursecategory from './components/CourseCategory/CourseCategoty';
import Course from './components/Course/Course';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signin/Signup';
import Footer from './components/Footer/Footer';
import UserLogin from './components/UserLogin/UserLogin';
import Education from './components/Education/Education';
import ProfilePage from './components/Profile/ProfilePage';
import Faculty from './components/Faculty/Faculty';
import PlayerSimple from './components/Player/PlayerSimple';


function App() {
  return (
    <div>
      <Routes>
        
      <Route path="/courseSubcategory" element={<CourseSubcategory/>}> </Route>
      <Route path="/courseCategory" element={<Coursecategory/>}> </Route>
      <Route path="/course" element={<Course/>}> </Route>
      <Route path="/login" element={<Login/>}> </Route>
      <Route path="/navbar" element={<Navbar/>}> </Route>
      <Route path="/signup" element={<Signup/>}> </Route>
      <Route path="/footer" element={<Footer/>}> </Route>
      <Route path="/userlogin" element={<UserLogin/>}> </Route>
      <Route path="/education" element={<Education/>}> </Route>
      <Route path="/profile" element={<ProfilePage/>}> </Route>
      <Route path="/faculty" element={<Faculty/>}> </Route>
      <Route path="/player" element={<PlayerSimple/>}> </Route>

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
        
  </div>
  );
}

export default App;

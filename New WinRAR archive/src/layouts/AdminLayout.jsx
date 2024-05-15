import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ShowProfileList from "../pages/Profile/ShowProfileList";
import CreateProfile from "../pages/Profile/CreateProfile";
import UpdateProfileInfo from "../pages/Profile/UpdateProfileInfo";
// import UpdateProfileInfo from "../pages/Profile/UpdateProfileInfo";
import PendingExpenses from "../pages/Expense/PendingExpenses";
import Header from "../components/Header";
import Footer from "../components/Footer";

//hasitha
import HomePage from "../pages/Slips/homePage";
import PayslipList from "../pages/Slips/payslipList";
import AddPayslipForm from "../pages/Slips/payslips";


//Hiruni
import AddRatingForm from "../pages/Rating/AddRatingForm";
import RatingList from "../pages/Rating/RatingList";
// import EditRating from "../pages/Rating/EditRatingForm";

const AdminLayout = () => {
  return (
    <>
    <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile-list" element={<ShowProfileList />} />
        <Route path="/create-Profile" element={<CreateProfile />} />
        <Route path="/update-details/:id" element={<UpdateProfileInfo />} />

        
        <Route path="/pending" element={<PendingExpenses />} />

         {/*Hasitha*/}
         <Route path ='/home-slip' element={<HomePage/>}/>
        <Route path ='/payslips-list' element={<PayslipList/>}/>
        <Route path="/payslips" element={<AddPayslipForm />} />

        {/*Hiruni*/}
        <Route path="/add-rating" element={<AddRatingForm />} />
        <Route path="/rating-list" element={<RatingList />} />
        {/* <Route path="/edit-rating/" element={<EditRating />} /> */}
        
      </Routes>
      <Footer />
    </>
  );
};

export default AdminLayout;

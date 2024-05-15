import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import SignIn from "../pages/signin";
import Signup from "../pages/signup";

//danisha
import Expenses from "../pages/Expense/Expenses";
import UpdateExpense from "../pages/Expense/UpdateExpense";
import CreateExpense from "../pages/Expense/CreateExpense";
import PayslipListDriver from "../pages/Slips/payslipListDriver";



const DriverLayout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />

        {/*Danisha*/}
        <Route path="/expense-list" element={<Expenses/>} />
        <Route path ='/update/:id' element={<UpdateExpense/>}/>
        <Route path ='/create' element={<CreateExpense/>}/>
 
        {/*Hasitha*/}
        <Route path ='/payed-slip' element={<PayslipListDriver/>}/>

       
        
      </Routes>
      <Footer />
    </>
  );
};

export default DriverLayout;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import DoctorPage from './components/doctor/DoctorPage';
import Home from './components/home/Home';
import Dashboard from './components/doctor/dashboard/Dashboard';
import DoctorAppointments from './components/doctor/doctorAppointments/DoctorAppointments';
import DoctorNotifications from './components/doctor/doctorNotifications/DoctorNotifications';
import DoctorBillings from './components/doctor/doctorBillings/DoctorBillings';
import DoctorReports from './components/doctor/doctorReports/DoctorReports';
import DoctorMessaging from './components/doctor/doctorMessaging/DoctorMessaging';
import PatientDashboard from './components/patient/patientDashboard/PatientDashboard';
import PatientPage from './components/patient/PatientPage';
import PatientAppointments from './components/patient/patientAppointments/PatientAppointments';
import PatientNotifications from './components/patient/patientNotifications/PatientNotifications';
import PatientBillings from './components/patient/patientBillings/PatientBillings';
import PatientReports from './components/patient/patientReports/PatientReports';
import PatientMessaging from './components/patient/patientMessaging/PatientMessaging';
import Login from './components/home/loginRegister/Login';
import Register from './components/home/loginRegister/Register';
import AdminPage from './components/admin/AdminPage';
import AdminDashboard from './components/admin/adminDashboard/AdminDashboard';
import AddNews from './components/admin/addNews/AddNews';
import DoctorDetails from './components/doctor/doctorDetails/DoctorDetails';
import EditDoctorDetails from './components/doctor/editDoctorDetails/EditDoctorDetails';
import PatientDetails from './components/patient/patientDetails/PatientDetails';
import EditPatientDetails from './components/patient/editPatientDetails/EditPatientDetails';
import AdminDetails from './components/admin/adminDetails/AdminDetails';
import EditAdminDetails from './components/admin/editAdminDetails/EditAdminDetails';
import AdminNotifications from './components/admin/adminNotifications/AdminNotifications';
import ViewNotificationDetail from './components/admin/viewNotificationDetail/ViewNotificationDetail';
import DoctorAvailability from './components/doctor/doctorAvailability/DoctorAvailability';


function App() {
  const isAuth = localStorage.getItem("authToken");
  return (
    <div className="App">
      
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/doctor/*' element={<DoctorPage />} >
          <Route index element={<Dashboard />} />
          <Route exact path='doctorappointments' element={<DoctorAppointments />} />
          <Route exact path='doctornotifications' element={<DoctorNotifications />} />
          <Route exact path='doctorbillings' element={<DoctorBillings />} />
          <Route exact path='doctorreports' element={<DoctorReports />} />
          <Route exact path='doctormessagings' element={<DoctorMessaging />} />
          <Route exact path='doctoravailability' element={<DoctorAvailability />} />
          <Route exact path='doctordetails' element={<DoctorDetails />} />
          <Route exact path='doctordetails/editdoctordetails' element={<EditDoctorDetails />} />
        </Route>
        <Route exact path='/patient/*' element={<PatientPage />} >
          <Route index element={<PatientDashboard />} />
          <Route exact path='patientappointments' element={<PatientAppointments />} />
          <Route exact path='patientnotifications' element={<PatientNotifications />} />
          <Route exact path='patientbillings' element={<PatientBillings />} />
          <Route exact path='patientreports' element={<PatientReports />} />
          <Route exact path='patientmessagings' element={<PatientMessaging />} />
          <Route exact path='patientdetails' element={<PatientDetails />} />
          <Route exact path='patientdetails/editpatientdetails' element={<EditPatientDetails />} />
        </Route>
        <Route exact path='/admin/*' element={<AdminPage />}>
          <Route index element={<AdminDashboard />} />
          <Route exact path='news' element={<AddNews />} />
          <Route exact path='admindetails' element={<AdminDetails />} />
          <Route exact path='admindetails/editadmindetails' element={<EditAdminDetails />} />
          <Route exact path='adminnotifications' element={<AdminNotifications />} />
          <Route exact path='adminnotifications/viewnotificationdetail/:id' element={<ViewNotificationDetail />} />
        </Route>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/register' element={<Register />} />
      </Routes>
      
    </div>
  );
}

export default App;

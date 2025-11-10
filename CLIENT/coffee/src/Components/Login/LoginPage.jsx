import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
  MDBSpinner,
} from "mdb-react-ui-kit";
import AOS from "aos";
import "aos/dist/aos.css";
import ToastMessage from "../ToastMessage/ToastMessage";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from "../AuthContext/AuthContext";
import loadLoginStyles from "../../Managers/Component/LoadStyleandScript/LoadLoginStyles";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [assetsLoaded, setAssetsLoaded] = useState(false); // ✅ theo dõi tình trạng CSS
  useEffect(() => {
    (async () => {
      try {
        await loadLoginStyles();
      } catch (err) {
        console.error("⚠️ Lỗi load CSS login:", err);
      } finally {
        setAssetsLoaded(true);
        AOS.init({
          duration: 1000, // thời gian animation (ms)
          once: true,     // chỉ chạy 1 lần khi scroll tới
        });
      }
    })();
  }, []);





  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

  };

  // 🔹 Form luôn hiển thị (kể cả khi chưa login)
  return (
    <>
      <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

            <MDBCard className='bg-white my-5 mx-auto' data-aos="zoom-in" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

                <MDBInput wrapperClass='mb-4 w-100' data-aos="fade-right" label='Email address' id='email' type='email' size="lg" name="email" value={form.email} onChange={handleChange}/>
                <MDBInput wrapperClass='mb-4 w-100' data-aos="fade-left" label='Password' id='password' type='password' size="lg" name="password" value={form.password} onChange={handleChange}/>

              <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

              <MDBBtn size='lg' onClick={handleLogin}>
                Login
              </MDBBtn>

              <hr className="my-4" />

              <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                <MDBIcon fab icon="google" className="mx-2" />
                Sign in with google
              </MDBBtn>

              <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
                <MDBIcon fab icon="facebook-f" className="mx-2" />
                Sign in with facebook
              </MDBBtn>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    </>
  );
}
export default LoginPage;

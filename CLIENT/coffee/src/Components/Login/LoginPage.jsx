import { useState, useEffect,useCallback } from "react";
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
} from "mdb-react-ui-kit";
import AOS from "aos";
import "aos/dist/aos.css";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from "../../Hook/AuthContext/AuthContext";
import loadLoginStyles from "../../Managers/Component/LoadStyleandScript/LoadLoginStyles";
import { loginUser } from "../../Managers/API/Auth/authAPI";
import { toastMessage } from "../ToastMessage/ToastMessage";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const location = useLocation();
  const isRoute = location.pathname.startsWith('/managers');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const loadAssets = async () => {
      try {
        await loadLoginStyles(); // load CSS login
      } catch (err) {
        console.error("⚠️ Lỗi load CSS login:", err);
      } finally {
        // Dùng requestAnimationFrame để init AOS mượt hơn
        requestAnimationFrame(() => {
          AOS.init({
            duration: 1000, // thời gian animation (ms)
            once: true,     // chỉ chạy 1 lần khi scroll tới
          });
        });
      }
    };

    loadAssets();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true); 
      try {
        const { email, password } = form;

        // ✅ Gọi API login
        const data = await loginUser(email, password);

        if (data?.data?.token) {
          // Lưu token vào context
          login(data.data.token);

          // Thông báo thành công
          toastMessage("Đăng nhập thành công!", "success");

          // Navigate sau login
          if (isRoute) {
            navigate("/managers/admin", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        } else {
          throw new Error("Không nhận được token từ server");
        }
      } catch (err) {
        console.error(err);
        toastMessage(err.message || "Đăng nhập thất bại", "error");
      } finally {
        setLoading(false); // ✅ Dù thành công hay lỗi đều tắt loading
      }
    },
    [form, login, navigate, isRoute]
  );

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

                <form onSubmit={handleLogin}>
                  <MDBInput
                    wrapperClass='mb-4 w-100'

                    label='Email address'
                    id='email'
                    type='email'
                    size="lg"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    floating="true"
                  />
                  <MDBInput
                    wrapperClass='mb-4 w-100'

                    label='Password'
                    id='password'
                    type='password'
                    size="lg"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    floating="true"
                  />


                  <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

                  <MDBBtn
                    type="submit"
                    size="lg"
                    className="w-100 mb-4 py-2"
                    style={{ fontWeight: '600' }}
                    disabled={loading} // ✅ Khi loading thì khóa nút
                  >
                    {loading ? (
                      <>
                        <MDBIcon fas icon="spinner" spin className="me-2" />
                        Đang đăng nhập...
                      </>
                    ) : (
                      "Login"
                    )}
                  </MDBBtn>

                </form>
                {!isRoute && (
                  <>
                    <hr className="my-4" />

                    <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                      <MDBIcon fab icon="google" className="mx-2" />
                      Sign in with Google
                    </MDBBtn>

                    <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
                      <MDBIcon fab icon="facebook-f" className="mx-2" />
                      Sign in with Facebook
                    </MDBBtn>
                  </>)}

              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>

      </MDBContainer>
    </>
  );
}
export default LoginPage;

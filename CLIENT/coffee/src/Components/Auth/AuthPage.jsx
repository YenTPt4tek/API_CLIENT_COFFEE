import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

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
import { loginUser, registerUser } from "../../Managers/API/Auth/authAPI";
import { toastMessage } from "../ToastMessage/ToastMessage";
import DashboardAssets from "../LoadStyleandScript/DashboardAssets";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const isManagerRoute = location.pathname.startsWith("/managers");
  const isUserRoute = location.pathname.startsWith("/users");
  const isLogin = isManagerRoute || isUserRoute;

  const [form, setForm] = useState({
    full_name:"",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const loginAssets = ["css/style_login.css"];

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        if (isLogin) {
          const { email, password } = form;
          const data = await loginUser(email, password);

          if (data?.data?.token) {
            login(data.data.token);
            toastMessage("Đăng nhập thành công!", "success");

            // Redirect về trang trước nếu có
            const redirectTo = location.state?.from?.pathname || (isManagerRoute ? "/managers/admin" : "/");
            navigate(redirectTo, { replace: true });
          } else throw new Error("Không nhận được token từ server");
        } else {
          // Register
          const { full_name,username, email, password, confirmPassword } = form;

          if (!full_name ||!username || !email || !password || !confirmPassword)
            throw new Error("Vui lòng điền tất cả thông tin");

          if (password !== confirmPassword)
            throw new Error("Mật khẩu xác nhận không khớp");

          const data = await registerUser( full_name, username, email, password );
          if (data?.success) {
            toastMessage("Đăng ký thành công! Vui lòng đăng nhập", "success");
            navigate("/managers/login", { replace: true });
          } else throw new Error(data.message || "Đăng ký thất bại");
        }
      } catch (err) {
        toastMessage(err.message || "Error", "error");
      } finally {
        setLoading(false);
      }
    },
    [form, isLogin, login, navigate, location.state, isManagerRoute]
  );
  // Nếu đã login → redirect luôn
  if (user) {
    const redirectTo = location.state?.from?.pathname || "/managers/admin";
    return <Navigate to={redirectTo} replace />;
  }
  return (
    <>
      <DashboardAssets paths={loginAssets} />
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              data-aos="zoom-in"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">{isLogin ? "Sign in" : "Register"}</h2>
                <p className="text-white-50 mb-3">
                  {isLogin ? "Please enter your login and password!" : "Create a new account!"}
                </p>

                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <>
                      <MDBInput
                        wrapperClass="mb-4 w-100"
                        label="Full Name"
                        id="name"
                        type="text"
                        size="lg"
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        floating="true"
                        autoComplete="full_name"
                      />

                      <MDBInput
                        wrapperClass="mb-4 w-100"
                        label="Username"
                        id="username"
                        type="text"
                        size="lg"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        floating="true"
                         autoComplete="username"
                      />
                    </>
                  )}

                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    label="Email address"
                    id="email"
                    type="email"
                    size="lg"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    floating="true"
                    autoComplete="email"
                  />

                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    label="Password"
                    id="password"
                    type="password"
                    size="lg"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    floating="true"
                    autoComplete="password"
                  />

                  {!isLogin && (
                    <MDBInput
                      wrapperClass="mb-4 w-100"
                      label="Confirm Password"
                      id="confirmPassword"
                      type="password"
                      size="lg"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      floating="true"
                      autoComplete="Confirm_password"
                    />
                  )}

                  {isLogin && (
                    <MDBCheckbox
                      name="flexCheck"
                      id="flexCheckDefault"
                      className="mb-4"
                      label="Remember password"
                    />
                  )}

                  <MDBBtn
                    type="submit"
                    size="lg"
                    className="w-100 mb-4 py-2"
                    style={{ fontWeight: "600" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <MDBIcon fas icon="spinner" spin className="me-2" />
                        {isLogin ? "Đang đăng nhập..." : "Đang đăng ký..."}
                      </>
                    ) : isLogin ? (
                      "Login"
                    ) : (
                      "Register"
                    )}
                  </MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default AuthPage;

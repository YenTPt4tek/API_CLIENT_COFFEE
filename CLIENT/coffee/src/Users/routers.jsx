import { Route, Routes} from "react-router-dom"
import { Component } from "react"


import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AuthPage from "../Components/Auth/AuthPage";



class Routers extends Component {
    render() {
        return (
            <Routes>
                {/* Trang đăng nhập - chỉ hiển thị khi chưa đăng nhập */}
                <Route path="/" element={
                   <AuthPage/>
                } />

            </Routes>
        )
    }
}

export default Routers

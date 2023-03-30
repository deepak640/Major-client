import React from "react";
import { Link, Outlet } from "react-router-dom";
import Card from '../components/shared/cards/Cards'
const Login = () => {
    return (
        <>
            
            <div className="admin-cards-container">
                <Link to="/login/admin">
                    <Card   
                        imageSrc="https://via.placeholder.com/300x300.png"
                        title="Admin"
                    />
                </Link>
                <Link to="/login/student">
                    <Card
                        imageSrc="https://via.placeholder.com/300x300.png"
                        title="student"
                    />
                </Link>
                <Link to="/login/teacher">
                    <Card
                        imageSrc="https://via.placeholder.com/300x300.png"
                        title="teacher"
                    />
                </Link>
            </div>
            <Outlet/>
        </>
    );
};

export default Login;
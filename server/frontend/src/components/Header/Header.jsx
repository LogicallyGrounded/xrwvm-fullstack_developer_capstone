import React from 'react';
import "../assets/style.css";
import "../assets/bootstrap.min.css";

const Header = () => {
    const logout = async (e) => {
        e.preventDefault();
        let logout_url = window.location.origin+"/djangoapp/logout";
        const res = await fetch(logout_url, { method: "GET" });
        const json = await res.json();
        if (json) {
            sessionStorage.removeItem('username');
            window.location.href = window.location.origin;
            window.location.reload();
        }
    };
    
    let curr_user = sessionStorage.getItem('username');
    let home_page_items = <div></div>;

    if (curr_user !== null && curr_user !== "") {
        home_page_items = (
            <div className="d-flex align-items-center">
                {/* Changed <text> to <span> for visibility */}
                <span style={{color: "black", fontWeight: "bold", marginRight: "15px", fontSize: "20px"}}>
                    {curr_user}
                </span>
                <a className="btn btn-outline-danger" href="/djangoapp/logout" onClick={logout}>Logout</a>
            </div>
        );
    } else {
        home_page_items = (
            <div>
                <a className="btn btn-primary me-2" href="/login">Login</a>
                <a className="btn btn-secondary" href="/register">Register</a>
            </div>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"darkturquoise", height:"80px"}}>
            <div className="container-fluid">
                <h2 style={{paddingRight: "5%"}}>Dealerships</h2>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="/about">About Us</a></li>
                        <li className="nav-item"><a className="nav-link" href="/contact">Contact Us</a></li>
                    </ul>
                    <span className="navbar-text">
                        {home_page_items}
                    </span>
                </div>
            </div>
        </nav>
    );
}

export default Header;
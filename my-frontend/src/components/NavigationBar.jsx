import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // 스타일을 위한 CSS 파일

const NavigationBar = () => {
    return (
        <nav className="navigation-bar">
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar;

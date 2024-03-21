import React from 'react';
const Header = () => {
    return (
        <header className='firstHeader'>
            <h1 className='text-red-500 font-bold'>Achraf Blog</h1>
            <nav>
                <ul className='nav-links'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
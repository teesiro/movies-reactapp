import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import userIcon from '../assets/user.png';
import { IoSearch } from "react-icons/io5";
import { navigation } from '../constants/navigation';

const Header = () => {
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search).get('q');
    const [searchInput, setSearchInput] = useState(queryParam || '');
    const navigate = useNavigate();

    useEffect(() => {
        if (searchInput) {
            navigate(`/search?q=${searchInput}`);
        }
    }, [searchInput, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/search?q=${searchInput.trim()}`);
        }
    }

    return (
        <header className='fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40'>
            <div className='container mx-auto px-3 flex items-center h-full'>
                <Link to={'/'}>
                    <img src={logo} alt="logo" width={120} />
                </Link>

                <nav className='hidden lg:flex items-center gap-1 ml-5'>
                    {navigation.map((nav) => (
                        <div key={nav.label}>
                            <NavLink 
                                to={nav.href} 
                                className={({ isActive }) => `pl-2 hover:text-neutral-100 ${isActive && "text-neutral-100"}`}
                            >
                                {nav.label}
                            </NavLink>
                        </div>
                    ))}
                </nav>

                <div className='ml-auto flex items-center gap-5'>
                    
                    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder='Search here...'
                            className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                        />
                        <button className='text-2xl text-white hidden lg:block'>
                            <IoSearch />
                        </button>
                    </form>

                    <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
                        <img src={userIcon} alt="user icon" className='w-full h-full' />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

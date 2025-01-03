// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef, useContext  } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
    Menu,
    Search,
    ShoppingCart,
    X,
    Truck,
    User,
    Heart,
    Wallet,
    HelpCircle,
    LogOut,
    LogIn,
    Phone,
    Home
} from 'lucide-react';
import {CartContext} from '../hooks/CartContext';  // Import the CartContext


function TopNav() {
    const { signOut, isAuthenticated, user  } = useAuth()
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserCardOpen, setIsUserCardOpen] = useState(false);
    const cardRef = useRef(null);
    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();

    // Handle navigation on search input change
    useEffect(() => {
        if (searchTerm.trim()) {
            navigate(`/search?q=${searchTerm}`);
        }
    }, [searchTerm, navigate]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${searchTerm}`);
            setSearchTerm(''); // Clear the search bar if needed
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleUserCard = () => {
        setIsUserCardOpen(!isUserCardOpen);
    };

    // Close user card when clicking outside
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (cardRef.current && !cardRef.current.contains(e.target)) {
                setIsUserCardOpen(false);
            }
        };

        if (isUserCardOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isUserCardOpen]);

     // Get the cart count (total items)
    const getCartCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <div className='max-w-[1520px] mx-auto flex justify-between items-center  p-4 sticky top-0 left-0 right-0 z-50 bg-white shadow-md'>
            <div className='flex items-center w-full justify-between'>
                <div className='flex items-center'>
                    <div onClick={toggleMenu} className='cursor-pointer '>
                        <Menu size={25} />
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
                        <Link
                            to="/"
                            className="hover:no-underline text-black"
                            onClick={() => setSearchTerm('')} // Clear the search term or reset state
                        >
                            Yum<span className="font-bold text-orange-700">Slice</span>
                        </Link>
                    </h1>

                    <div className='hidden lg:flex items-center bg-gray-200 rounded-full text-[14px] p-2 ml-2'>
                        <p className='bg-orange-700 text-white rounded-full p-2 text-bold'>Free</p>
                        <p className='text-bold p-2'>Delivery</p>
                    </div>
                </div>

                <div className='bg-gray-200 rounded-full flex items-center mr-2 p-2 w-full sm:w-[400px] lg:w-[500px]'>
                    <form className='flex justify-between w-full' onSubmit={handleSearch}>
                        <Search size={25} className='mt-1' />
                        <input
                            className='bg-transparent p-2 w-full focus:outline-none'
                            type='text'
                            placeholder='Search Food'
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                    </form>
                </div>

                <div className='flex items-center gap-2 relative'>
                
                {/* <ul className="gap-2 hidden md:flex">
                            <li
                            onClick={() => navigate('/contact')}
                            className="cursor-pointer border-transparent  text-gray-500 hover:border-orange-700 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium"
                            >
                            Contact
                            </li>
                            
                        </ul> */}
                    
                    {/* <Link to="/wishlist">
                    <button className='justify-between gap-2 bg-orange-700 text-white hidden md:flex border-none items-center py-2 rounded-full'>
                        <Heart size={20} />
                        <span>0</span>
                    </button>
                    </Link> */}
                    <Link to="/cart">
                    <button className='justify-between gap-2 relative bg-orange-700 text-white md:flex border-none items-center  rounded-full'>
                        <ShoppingCart size={20} />
                        <span className='absolute top-0 right-0 border bg-white  text-black w-4 h-4 flex items-center justify-center rounded-full'>{getCartCount()}</span>
                    </button>
                    </Link>

                    {
                        isAuthenticated && (
                        <button
                            className='justify-between gap-2 text-black hidden md:flex border-none items-center py-2 rounded-full'
                            onClick={toggleUserCard}
                        >
                            <User size={20} />
                        </button>
                        )
                    }

                    
                    {isUserCardOpen && isAuthenticated && (
                        <div
                            ref={cardRef}
                            className='absolute right-0 top-[100%] mt-2 w-[200px] bg-orange-700 transition-all duration-300 shadow-lg rounded-lg p-4 z-50'
                        >
                            <p className='text-sm font-medium text-white'>Email: {user.email}</p>
                            <button
                                className='w-full flex cursor-pointer justify-center border-none mt-3 bg-white text-black py-2 px-4 rounded-md'
                                onClick={() => {
                                    signOut();
                                }}
                            >
                            <LogOut size={20} className='mr-2' />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* Overlay when the menu is open */}
            {isMenuOpen && (
                <div className='bg-black/60 fixed w-full h-screen z-10 top-0 left-0'
                    onClick={toggleMenu}
                ></div>
            )}

            {/* Sidebar Menu */}
            <div
                className={isMenuOpen
                    ? 'fixed top-0 h-screen w-[300px] left-0 bg-white z-10 duration-300 ease-in-out'
                    : 'fixed top-[-100%] h-screen w-full left-0 bg-white z-10 duration-300 ease-in-out'}
            >
                <X size={25} className='absolute top-4 right-4 cursor-pointer' onClick={toggleMenu} />
                <h2 className='text-2xl p-4'>Yum<span className='font-bold text-orange-700'>Eats</span></h2>
                <nav>
                    <ul className='flex flex-col p-4 text-gray-900'>
                    <li className='text-xl py-4 flex cursor-pointer hover:text-orange-700' onClick={() => navigate('/')}>
                            <Home size={20} className='mr-4 text-white bg-black rounded-full' />
                            Home
                    </li>
                    {
                            isAuthenticated && (
                                <ul>
                        <li className='text-xl py-4 flex cursor-pointer hover:text-orange-700' onClick={() => navigate('/profile')}>
                            <User size={20} className='mr-4 text-white bg-black rounded-full' />
                            My Account
                        </li>
                        <li className='text-xl py-4 flex cursor-pointer hover:text-orange-700' onClick={() => navigate('/delivery')}>
                            <Truck size={20} className='mr-4 text-white bg-black rounded-full' />
                            Delivery
                        </li>
                        <li className='text-xl py-4 flex cursor-pointer hover:text-orange-700' onClick={() => navigate('/wishlist')}>
                            <Heart size={20} className='mr-4 text-white bg-black rounded-full' />
                            My Favorite
                        </li>
                        <li className='text-xl py-4 flex cursor-pointer hover:text-orange-700' onClick={() => navigate('/wallet')}>
                                    <Wallet size={20} className='mr-4 text-white bg-black rounded-full' />
                                    My Wallet
                                </li>
                        </ul>
                            )
                        }
                        {
                            !isAuthenticated && (
                                <ul>
                                
                                
                                <li className='text-xl py-4 flex cursor-pointer hover:text-orange-700' onClick={() => navigate('/login')}>
                                    <LogIn  size={20} className='mr-4 text-white bg-black rounded-full' />
                                    Login
                                </li>
                                <li className='text-xl py-4 flex cursor-pointer hover:text-orange-700' onClick={() => navigate('/signup')}>
                                    <LogOut size={20} className='mr-4 text-white bg-black rounded-full' />
                                    Signup
                                </li>
                                </ul>
                            )
                        }

                        {
                            isAuthenticated && (
                        <li className='text-xl py-4 flex cursor-pointer hover:text-orange-700' onClick={signOut}>
                            <LogOut size={20} className='mr-4 text-white bg-black rounded-full' />
                            LogOut
                        </li>)
                        }
                        <li className='text-xl py-4 flex cursor-pointer hover:text-orange-700' onClick={() => navigate('/contact')}>
                            <Phone size={20} className='mr-4 text-white bg-black rounded-full' />
                            Contact
                        </li>
                        <li className='text-xl py-4 flex cursor-pointer hover:text-orange-700' onClick={() => navigate('/help')}>
                            <HelpCircle size={20} className='mr-4 text-white bg-black rounded-full' />
                            Help
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default TopNav;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserAction } from '../../../Redux/Reducers/UserRedicer';
import { UserListSelector } from '../../../Redux/Reducers/UserListReducer';
import { initializeData } from '../../scripts/initializeData';

function LandingPage(props) {
    const dispatch = useDispatch();
    const userList = useSelector(UserListSelector);
    const [initializing, setInitializing] = useState(false);

    const handleRoleClick = (userData) => {
        const userPayload = {
            id: userData.id,
            type: userData.role,
            name: userData.name,
            email: userData.email,
            totalPosts: userData.totalPosts,
            totalParticipations: userData.totalParticipations
        };
        
        dispatch(UserAction.set(userPayload));
    };

    const handleInitializeData = async () => {
        setInitializing(true);
        try {
            await initializeData();
            alert('Data initialized successfully!');
        } catch (error) {
            alert('Failed to initialize data: ' + error.message);
        } finally {
            setInitializing(false);
        }
    };

    return (
        <div className='h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50'>
            {/* Initialize Data Button - Remove in production */}
            <button
                onClick={handleInitializeData}
                disabled={initializing}
                className="fixed top-4 right-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg disabled:bg-gray-400 z-50"
            >
                {initializing ? 'Initializing...' : 'Initialize Data'}
            </button>

            {/* Main Container */}
            <div className="bg-white rounded-2xl shadow-xl p-16 max-w-4xl w-full mx-8 border border-gray-100 relative overflow-hidden">
                
                {/* Subtle decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-30 -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-gray-100 to-slate-100 rounded-full opacity-40 translate-y-12 -translate-x-12"></div>
                
                {/* Content */}
                <div className="relative z-10">
                    {/* Logo/Icon placeholder */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl mx-auto mb-8 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                        </svg>
                    </div>
                    
                    {/* Heading */}
                    <h1 className="text-4xl md:text-5xl font-light text-center mb-4 text-gray-800 tracking-wide">
                        Community Notice Board
                    </h1>

                    {/* Description */}
                    <p className="text-gray-700 text-lg leading-relaxed text-center mb-14 max-w-2xl mx-auto font-light">
                        Access your personalized dashboard to stay informed about community announcements, 
                        notices, and important updates. Please select your designated role to continue.
                    </p>
                    
                    {/* Show message if no users */}
                    {userList.length === 0 && (
                        <div className="text-center mb-8 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
                            <p className="text-yellow-800">No users found. Please click "Initialize Data" to add sample users.</p>
                        </div>
                    )}
                    
                    {/* Buttons Container */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
                        {userList.map((userData) => {
                            // Generate variable route path based on role
                            const routePath = userData.role === 'Admin' ? '/admin' : `/user`;
                            
                            return (
                                <Link
                                    key={userData.id}
                                    to={routePath}
                                    onClick={() => handleRoleClick(userData)}
                                    className={`
                                        group relative h-28 rounded-xl font-medium text-base transition-all duration-300 
                                        transform hover:scale-105 active:scale-95 overflow-hidden block
                                        ${userData.role === 'Admin' 
                                            ? 'bg-gradient-to-br from-slate-800 to-gray-900 text-white shadow-lg hover:shadow-xl' 
                                            : 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg hover:shadow-xl'
                                        }
                                    `}
                                >
                                    {/* Button background overlay */}
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    
                                    {/* Button content */}
                                    <div className="relative z-10 h-full flex flex-col items-center justify-center">
                                        <div className="w-8 h-8 mb-2 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium">{userData.name}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    
                    {/* Footer information */}
                    <div className="text-center border-t border-gray-100 pt-8">
                        <p className="text-gray-500 text-sm font-light mb-2">
                            This application is in prototype phase for demonstration purposes.
                        </p>
                        <p className="text-gray-400 text-xs">
                            Click on your assigned role above to access role-specific features.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;

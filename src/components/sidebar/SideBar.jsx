import React, { useEffect, useState } from 'react'
import './side-bar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import sidebar from '../configs/sidebar'
import { ClearRounded, LogoutRounded } from '@mui/icons-material'
import { authActions } from '../stores/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogTitle, Button, DialogActions } from '@mui/material'
import { Transition } from '../configs/functions'

const SideBar = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const location = useLocation();
    const dispatch = useDispatch();
    const { account } = useSelector((state) => state.auth);

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebar.findIndex(item => item.section === curPath);

        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    const closeSideBar = () => {
        document.querySelector('.main__content').style.transform = 'scale(1) translateX(0)';
        setTimeout(() => {
            document.body.classList.remove('sidebar-open');
            document.querySelector('.main__content').style = ''
        }, 500);
    }

    const [openLogoutPopup, setOpenLogoutPopup] = useState(false);
    const handleCloseLogoutPopup = () => setOpenLogoutPopup(false);
    const handleOpenLogoutPopup = () => setOpenLogoutPopup(true);

    //logout
    const handleLogout = () => {
        dispatch(authActions.logout(account));
        handleCloseLogoutPopup();
        navigate('/');
    };

    return (
        <div className='sidebar'>
            <div className='sidebar__logo'>
                <img src='https://res.cloudinary.com/dpwehcnso/image/upload/v1696926058/uitbikes/admin_logo_byc47w.png' alt='UIT Bikes' />
                <div className="sidebar-close" onClick={closeSideBar}>
                    <ClearRounded className='icon' />
                </div>
                {/* Sidebar on the right */}
                {/* <img src='https://res.cloudinary.com/dpwehcnso/image/upload/v1696926058/uitbikes/admin_logo_byc47w.png' alt='UIT Bikes' /> */}
            </div>
            <div className="sidebar__menu">
                {
                    sidebar.map((nav, index) => (
                        <Link to={nav.link} key={`nav-${index}`} 
                            className={`sidebar__menu__item ${activeIndex === index && 'active'}`} 
                            onClick={closeSideBar}
                        >
                            <div className="sidebar__menu__item__icon">
                                {nav.icon}
                            </div>
                            <div className="sidebar__menu__item__txt">
                                {nav.text}
                            </div>
                            {/* sidebar on the right */}
                            {/* <div className="sidebar__menu__item__icon">
                                {nav.icon}
                            </div> */}
                        </Link>
                    ))
                }
                <div className="sidebar__menu__item" onClick={() => {handleOpenLogoutPopup(); closeSideBar()}}>
                    <div className="sidebar__menu__item__icon">
                        <LogoutRounded />
                    </div>
                    <div className="sidebar__menu__item__txt">
                        Đăng xuất
                    </div>
                    {/* sidebar on the right */}
                    {/* <div className="sidebar__menu__item__icon">
                        <LogoutRounded />
                    </div> */}
                </div>

                <Dialog open={openLogoutPopup} TransitionComponent={Transition}
                    keepMounted onClose={handleCloseLogoutPopup}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Bạn có chắc chắn muốn đăng xuất?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleCloseLogoutPopup}>Không</Button>
                        <Button onClick={handleLogout}>Có</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default SideBar

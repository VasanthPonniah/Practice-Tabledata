import React, { useContext, useState } from 'react'
import { Drawer, Menu, Modal } from 'antd';
import { DashboardOutlined, HomeFilled, HomeOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import classes from './RootNavigation.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { BarsOutlined } from '@ant-design/icons';
import { AuthContext } from './AuthContext';

const RootNavigation = () => {
    const authCtx = useContext(AuthContext)
    // console.log(authCtx)
    const items = [
        {
            label: (<NavLink to="" className={({ isActive }) => isActive ? classes.active : undefined} >Home</NavLink>),
            key: 'home',
            icon: <HomeFilled className={classes.home} />,
        },
        {
            label: (<NavLink to={`${authCtx.isLoggedIn ? '/users' : "/login"}`} className={({ isActive }) => isActive ? classes.active : undefined} end>{authCtx.isLoggedIn ? 'Users' : 'Login'}</NavLink>),
            key: `${authCtx.isLoggedIn ? 'users' : 'login'}`,
        },
    ]
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate()

    return (
        <div className={classes.header}>
            <BarsOutlined className={classes.dash} onClick={() => setDrawerOpen(true)} />
            <Drawer open={drawerOpen} placement='left' maskClosable="true"
                title="DASHBOARD" style={{ display: "flex", flexDirection: "row" }} >
                <Menu mode='vertical' onClick={({ key }) => {
                    if (key === "signout") {
                        Modal.confirm({
                            title: "Do you want to logout?",
                            okType: "danger",
                            onOk: () => {
                                authCtx.onLogout()
                                navigate('')
                                setDrawerOpen(false)
                            }
                        })
                    }
                    // if (key === "users" && authCtx.isLoggedIn) {
                    //     navigate('users')
                    // } 
                    else {
                        navigate(key)
                        setDrawerOpen(false)
                    }

                }}
                    items={[
                        { label: "Home", key: "/", icon: <HomeOutlined /> },
                        { label: "Dashboard", key: "/dashboard", icon: <DashboardOutlined /> },
                        { label: "Profile", key: "/users", icon: <UserOutlined /> },
                        { label: "SignOut", key: "signout", icon: <PoweroffOutlined />, danger: true }
                    ]} className={classes.sideNav} />
            </Drawer>
            <h2>SWISS</h2>
            <Menu mode="horizontal" items={items} className={classes.menu} />
        </div>
    );


}

export default RootNavigation
import React, { useState } from 'react'
import { Button, Drawer, Input, Select } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import classes from './UserListActions.module.css';
import NewUserModal from './NewUserModal';
import { CaretLeftOutlined } from '@ant-design/icons';

const UsersListActions = (props) => {
    const [newUser, setNewUser] = useState(false)
    const [filterDrawer, setFilterDrawer] = useState(false);
    const [filterObj, setFilterObj] = useState({})

    const onSearchHandler = value => props.onSearch(value)
    const newUserHandler = () => setNewUser(true);
    const modalHandler = () => setNewUser(false)
    const addUserHandler = user => props.onAdded(user)

    const filterSubmitHandler = () => {
        props.onFilter({
            age: filterObj.age ? filterObj.age : '',
            experience: filterObj.experience ? filterObj.experience : '',
            residence: filterObj.residence ? filterObj.residence : ''
        })
        setFilterDrawer(false)
    }

    const clearFilterHandler = () => {
        props.onClear()
        setFilterObj({ age: '', experience: '', residence: '' })
    }

    return (
        <div className={classes.actionControl}>
            <Input.Search placeholder="input search text" id="search"
                allowClear onSearch={onSearchHandler} style={{ width: '300px' }} />
            <UserAddOutlined className={classes.userIcon} onClick={newUserHandler} />
            {newUser && <NewUserModal onClose={modalHandler} onAdd={addUserHandler} />}
            <CaretLeftOutlined style={{ marginLeft: '2rem', fontSize: '18px' }} onClick={() => setFilterDrawer(true)} />
            <Drawer open={filterDrawer} placement='right' maskClosable="true" onClose={() => setFilterDrawer(false)} className={classes.filterForm}>
                <form>
                    <label htmlFor='age'>Filter by age (atleast)</label>
                    <Input type='number' value={filterObj.age} id='age' min="18" step="1" max="70" onChange={(e) => setFilterObj(prev => { return { ...prev, age: e.target.value } })} />
                    <label htmlFor='experience'>Filter by experience (atleast)</label>
                    <Select style={{ width: '100%' }} onChange={(value) => setFilterObj(prev => { return { ...prev, experience: value } })} options={[{ label: 'Experience', value: '' }, { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }]} />
                    <label htmlFor='residence'>Filter by residence</label>
                    <Input type="text" id="residence" value={filterObj.residence} onChange={(e) => setFilterObj(prev => { return { ...prev, residence: e.target.value } })} />
                    <Button type='button' onClick={clearFilterHandler} >Clear Filters</Button>
                    <Button type='primary' style={{ display: 'flex', margin: '1rem' }} onClick={filterSubmitHandler}>Filter</Button>
                </form>
            </Drawer>
        </div>

    )
}

export default UsersListActions

import React, { useContext, useEffect, useState } from 'react';
import 'antd/dist/antd';
import { Modal, Table, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import UsersListActions from './UsersListActions';
import classes from './UsersList.module.css';
import { AuthContext } from './AuthContext';

const firebaseUrl = 'https://react-project-b545a-default-rtdb.firebaseio.com/tableData.json';

const UsersList = () => {
    const [dataSource, setDataSource] = useState([])
    const [searchText, setSearchText] = useState('')
    const [editUserModal, setEditUserModal] = useState(false)
    const [editUser, setEditUser] = useState(null)

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(3)

    const authCtx = useContext(AuthContext)

    const columns = [
        {
            title: 'Name',
            key: '1',
            dataIndex: 'name',
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return record.name.toLowerCase().includes(value);
            },
            render: (name) => <a href="/">{name}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: '2',
            sorter: (a, b) => a.age - b.age
        },
        {
            title: 'Experience',
            dataIndex: 'experience',
            key: '3',
            sorter: (a, b) => a.experience - b.experience
        },
        {
            title: 'Qualification',
            dataIndex: 'qualification',
            key: '4',
        },
        {
            title: 'Residence',
            dataIndex: 'residence',
            key: '5',
        },
        {
            title: 'Actions',
            key: '6',
            render: (record) => {
                return (
                    <>
                        <EditOutlined style={{ cursor: "pointer" }} onClick={() => { onEditUser(record) }} />
                        <DeleteOutlined style={{ color: 'red', marginLeft: '10px', cursor: "pointer" }} onClick={() => { onDeleteUser(record) }} />
                    </>
                )
            }
        },
    ]


    const fetchUsers = async () => {
        const response = await fetch(firebaseUrl)
        const data = await response.json()
        const fetchedUsers = [];
        for (let key in data) {
            fetchedUsers.push({
                key: data[key].id,
                name: data[key].name,
                experience: data[key].experience,
                residence: data[key].residence,
                age: data[key].age,
                qualification: data[key].qualification,
                phone: data[key].phone,
            })
        };
        setDataSource(fetchedUsers)
    }
    useEffect(() => {
        fetchUsers()
    }, [])


    const searchHandler = value => setSearchText(value);

    const addedUserHandler = async (user) => {
        await fetch(firebaseUrl, { method: "POST", body: JSON.stringify(user) });
        fetchUsers()
    }

    const onDeleteUser = (record) => {
        Modal.confirm({
            title: "Are you sure?",
            okType: "danger",
            okText: "Yes",
            onOk: async () => {
                const path = 'https://react-project-b545a-default-rtdb.firebaseio.com/tableData/' + record.key + ".json"
                await fetch(path, { method: "DELETE" });
                fetchUsers()
            },
        })
    }

    const onEditUser = (record) => {
        setEditUserModal(true);
        setEditUser({ ...record })
    }
    const cancelHandler = () => setEditUserModal(false);

    const editHandler = async () => {
        console.log(editUser)
        const path = 'https://react-project-b545a-default-rtdb.firebaseio.com/tableData/' + editUser.key + ".json"
        fetch(path, {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(editUser)
        }).then(() => fetchUsers())
        setEditUserModal(false)
    }


    const filteredHandler = async (userFilterOptions) => {
        await fetchUsers()
        setDataSource(prev =>
            prev.filter(user =>
                user.age >= Number(userFilterOptions.age) &&
                user.experience >= Number(userFilterOptions.experience) &&
                user.residence.toLowerCase().includes(userFilterOptions?.residence.toLowerCase()
                )))
    }


    if (!authCtx.isLoggedIn) {
        return (
            <div >
                <h2>Go to Login Page</h2>
            </div>
        )
    }
    return (
        <div style={{ padding: '2rem' }}>
            <UsersListActions
                onSearch={searchHandler} dataIndex
                onAdded={addedUserHandler}
                onFilter={filteredHandler}
                onClear={() => fetchUsers()}
            />
            <Table
                columns={columns}
                dataSource={dataSource}
                className={classes.table}
                pagination={{
                    current: page, pageSize: pageSize,
                    onChange: (page, pageSize) => {
                        setPage(page)
                        setPageSize(pageSize)
                    }
                }} >
            </Table>
            <Modal
                title="Edit User"
                open={editUserModal}
                style={{ display: 'flex' }}
                maskClosable
                onCancel={() => { cancelHandler() }}
                okText="Submit"
                onOk={() => {
                    editHandler()
                }}>
                <Input value={editUser?.name} id='name' autoComplete='off'
                    addonBefore="Name"
                    style={{ margin: "1rem 0" }}
                    onChange={(e) =>
                        setEditUser(pre => {
                            return { ...pre, name: e.target.value }
                        })
                    } />
                <Input
                    id='age'
                    style={{ margin: "1rem 0" }}
                    addonBefore="Age"
                    value={editUser?.age}
                    onChange={(e) =>
                        setEditUser(pre => {
                            return { ...pre, age: e.target.value }
                        })
                    } />
                <Input addonBefore="Experience"
                    style={{ margin: "1rem 0" }}
                    value={editUser?.experience} id="experience" onChange={(e) =>
                        setEditUser(pre => {
                            return { ...pre, experience: e.target.value }
                        })
                    } />
                <Input addonBefore="Phone"
                    style={{ margin: "1rem 0" }}
                    value={editUser?.phone} id="phone" autoComplete='off' onChange={(e) =>
                        setEditUser(pre => {
                            return { ...pre, phone: e.target.value }
                        })
                    } />
                <Input addonBefore="Qualifiaction"
                    style={{ margin: "1rem 0" }}
                    value={editUser?.qualification} id="qualification" onChange={(e) =>
                        setEditUser(pre => {
                            return { ...pre, qualification: e.target.value }
                        })
                    } />
                <Input addonBefore="Residence" style={{ margin: "1rem 0" }} value={editUser?.residence} id="residence" onChange={(e) =>
                    setEditUser(pre => {
                        return { ...pre, residence: e.target.value }
                    })
                } />
            </Modal>
        </div>
    )
}

export default UsersList
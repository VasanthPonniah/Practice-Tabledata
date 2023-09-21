import React, { useEffect, useState } from 'react'
import Modal from 'antd/es/modal/Modal';
import Input from 'antd/es/input/Input';

const EditForm = (props) => {
    const [editUser, setEditUser] = useState(null)
    const [editUserModal, setEditUserModal] = useState(props.openEditUser)

    const cancelHandler = () => {
        // props.openEditUser(false)
        setEditUserModal(false)
        props.openEditUser(false)
    }
    const editHandler = () => {
        const path = 'https://react-project-b545a-default-rtdb.firebaseio.com/tableData/' + editUser.key + ".json"
        fetch(path, {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(editUser)
        });
        props.onEdit()
    }
    useEffect(() => {
        setEditUser(props.edit)
    }, [props.edit])
    console.log(editUser)
    return (
        <Modal
            title="Edit User"
            open={editUserModal}
            style={{ display: 'flex' }}
            // afterClose={() => fetchUsers()}
            onCancel={() => { cancelHandler() }}
            okText="Submit"
            onOk={() => { editHandler() }}>
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
    )
}

export default EditForm
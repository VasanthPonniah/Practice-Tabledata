import React, { useContext, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { AuthContext } from './AuthContext';
import classes from './Auth.module.css';
import { useNavigate } from 'react-router-dom';

const users = [
    { email: 'test1@gmail.com', password: "test1Sample" },
    { email: 'test2@gmail.com', password: "test2Sample" },
    { email: 'test3@gmail.com', password: "test3Sample" },
    { email: 'test4@gmail.com', password: "test4Sample" },
    { email: 'test5@gmail.com', password: "test5Sample" },
]
const validation = (arr, obj) => {
    let result = false;
    arr.forEach(user => {
        if (user.email === obj.email) {
            if (user.password === obj.password) {
                result = true;
                return result
            }
        }
    })
    return result;
}
const Auth = () => {
    const [error, setError] = useState(null)

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log(validation(users, values))
        if (validation(users, values)) {
            localStorage.setItem('loggedIn', '1')
            authCtx.onLogin()
            navigate('/users')
        } else {
            setError("Invalid credentials. Try login again")
            setTimeout(() => {
                setError(null)
            }, 5000)

        }
    }

    return (
        <Form
            className={classes.loginForm}
            name="basic"
            size='default'
            labelCol={{
                span: 8,
            }}
            wrapperCol={{

                span: 18,
                offset: 1,
            }}
            style={{

                maxWidth: 600,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label={"Email"}
                name="email"
                rules={[
                    {
                        type: "email",
                        required: true,
                        message: 'Please enter valid email address',
                    },
                    { whitespace: false },
                ]}
                hasFeedback
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    { min: 8 },
                    { whitespace: false }
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            {error && <p className={classes.errorText}>{error}</p>}
            <Form.Item
                wrapperCol={{
                    offset: 4,
                    span: 24
                }}
            >
                <Button block type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )

}
export default Auth;
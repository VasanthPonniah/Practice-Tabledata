import React from 'react';
import { Button, Modal } from 'antd';

const ValidationModal = () => {
    const [modal, contextHolder] = Modal.useModal();

    const countDown = () => {
        let secondsToGo = 5;

        const instance = modal.danger({
            title: 'Invalid Credentials',
            content: "Please Try again",
        });

        const timer = setInterval(() => {
            secondsToGo -= 1;

        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            instance.destroy();
        }, secondsToGo * 1000);
    };

    return (
        <>
            <Button onClick={countDown}>Open modal to close in 5s</Button>
            {contextHolder}
        </>
    );
};

export default ValidationModal;
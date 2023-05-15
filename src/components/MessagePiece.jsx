import { Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const MessagePiece = ({
    piece, key
}) => {
    const reciveStyle = {
        backgroundColor: "#e4e6eb",
        borderRadius: 20,
        width: " -moz-fit-content",
        color: "black",
        maxWidth: "50%",
        padding: "5px 10px",

    }
    const sendStyle = {
        backgroundColor: "#1976d2",
        borderRadius: 20,
        color: "white",
        maxWidth: "50%",
        width: " -moz-fit-content",
        padding: "5px 10px",


    }
    const user = useSelector(state => state.User.userInfor)
    const alignStyle = piece.email === "admin" && user.role !== "customer" ? { justifyContent: "flex-end" } : piece.email === user.email ? { justifyContent: "flex-end" } : { justifyContent: "flex-start" }
    return (
        <div
            key={key}
            style={{
                ...alignStyle,
                width: "100%",
                display: 'flex',
                margin: "5x 0px",

            }}>
            <Typography.Paragraph style={piece.email === "admin" && user.role !== "customer" ? sendStyle : piece.email === user.email ? sendStyle : reciveStyle}>
                {piece.message}
            </Typography.Paragraph>
        </div>
    );
}

export default MessagePiece;

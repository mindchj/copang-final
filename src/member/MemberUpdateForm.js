import React, { useState, useEffect } from 'react';

const MemberUpdateForm = (props) => {
    let userName = props.location.state.userId.username;
    let description = props.location.state.userId.description;
    let phone = props.location.state.userId.phone;
    let profileImage = props.location.state.userId.profileImage;
    let realName = props.location.state.userId.realName;
    let role = props.location.state.userId.role;
    let signInDate = props.location.state.userId.signInDate;

    return (
        <div>
            <div>{userName}</div>
            <div>{description}</div>
            <div>{phone}</div>
            <div>{profileImage}</div>
            <div>{realName}</div>
            <div>{role}</div>
            <div>{signInDate}</div>
            <button onClick={() => console.log(props.location.state.userId)}>11111</button>
        </div>
    )
}

export default MemberUpdateForm;
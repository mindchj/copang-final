import React, { useEffect } from 'react';
import { auth } from '../../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";


/*
option : true - 로그인 되어야하는 컴포넌트
option : false - 로그아웃 되었을때 볼 수 있는 컴포넌트
option : null 로그인/아웃 상관없는 컴포넌트
*/
function Auth(Component, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        console.log(user);
        const dispatch = useDispatch();

        useEffect(() => {
            console.log("effect called!")
            dispatch(auth())
                .then(async response => {
                    if (await (!(response.payload.message === "success") && option))  //인증 실패하면 login 으로
                    {
                        props.history.push('/login');
                    }
                    else if ((adminRoute && response.payload.message !== "success") === 0) {
                        console.log(option === false);
                        props.history.push('/');
                    }

                    else if ((props.history.location.pathname === "/login" || props.history.location.pathname === "/register") && response.payload.message === "success") {
                        console.log(option === false)
                        props.history.push('/');
                    }
                    // if (!(option && (user.userData.message !== undefined))) {
                    //     console.log('option: false, message : success');
                    //     return (
                    //         <Component {...props} user={user} />
                    //     )
                    // }
                    // if((option && (user.userData.message ==="success"))) {
                    //     console.log('option: true, message : success');
                    //     return (
                    //         <Component {...props} user={user} />
                    //     )
                    // }
                }
                )
        }, [props.history])
        // 로그인, 회원가입페이지는 option : false
        return (
            <Component {...props} user={user} />
        )
    }
    return AuthenticationCheck
}

export default Auth;

/// imports

/// actions

const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const SET_USER_LIST = "SET_USER_LIST";
const SET_ALARM_LIST = "SET_ALARM_LIST";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_IMAGE_LIST = "SET_IMAGE_LIST";
const SET_USER_PROFILE = "SET_USER_PROFILE";

/// action creator

function saveToken(token, username) {
    return {
        type: SAVE_TOKEN,
        token,
        username,
    };
}

function logout() {
    return {
        type: LOGOUT,
    };
}

function setUserList(userList) {
    return {
        type: SET_USER_LIST,
        userList,
    };
}

function setUserProfile(userProfile) {
    return {
        type: SET_USER_PROFILE,
        userProfile,
    };
}

function setAlarmList(alarmList) {
    return {
        type: SET_ALARM_LIST,
        alarmList,
    };
}

function setFollowUser(userId, isAlarm) {
    return {
        type: FOLLOW_USER,
        userId,
        isAlarm,
    };
}

function setUnfollowUser(userId, isAlarm) {
    return {
        type: UNFOLLOW_USER,
        userId,
        isAlarm,
    };
}

function setImageList(imageList) {
    return {
        type: SET_IMAGE_LIST,
        imageList,
    };
}

/// API actions

function facebookLogin(access_token) {
    return function(dispatch) {
        fetch("/users/login/facebook/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                access_token,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.token) {
                    dispatch(saveToken(json.token, json.user.username));
                }
            })
            .catch((err) => console.log(err));
    };
}

function usernameLogin(username, password) {
    return function(dispatch) {
        fetch("/rest-auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.token) {
                    dispatch(saveToken(json.token, json.user.username));
                }
            })
            .catch((err) => console.log(err));
    };
}

function createAccount(username, password, email, name) {
    return function(dispatch) {
        fetch("/rest-auth/registration/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password1: password,
                password2: password,
                email,
                name,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.token) {
                    dispatch(saveToken(json.token, json.user.username));
                }
            })
            .catch((err) => console.log(err));
    };
}

function getPhotoLikes(photoId) {
    return function(dispatch, getState) {
        const { user: { token } } = getState();

        fetch(`/images/${photoId}/likes/`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${token}`,
            },
        })
            .then((response) => {
                if (response.status === 401) {
                    dispatch(logout());
                }

                return response.json();
            })
            .then((json) => {
                dispatch(setUserList(json));
            })
            .catch((err) => console.log(err));
    };
}

function getUserAlarms() {
    return function(dispatch, getState) {
        const { user: { token } } = getState();

        fetch(`/notifications/`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${token}`,
            },
        })
            .then((response) => {
                if (response.status === 401) {
                    dispatch(logout());
                }

                return response.json();
            })
            .then((json) => {
                dispatch(setAlarmList(json));
            })
            .catch((err) => console.log(err));
    };
}

function followUser(userId, isAlarm) {
    return (dispatch, getState) => {
        dispatch(setFollowUser(userId, isAlarm));

        const { user: { token } } = getState();

        fetch(`/users/${userId}/follow/`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${token}`,
            },
        }).then((response) => {
            if (response.status === 401) {
                dispatch(logout());
            } else if (!response.ok) {
                dispatch(setUnfollowUser(userId, isAlarm));
            }
        });
    };
}

function unfollowUser(userId, isAlarm) {
    return (dispatch, getState) => {
        dispatch(setUnfollowUser(userId, isAlarm));

        const { user: { token } } = getState();

        fetch(`/users/${userId}/unfollow/`, {
            method: "DELETE",
            headers: {
                Authorization: `JWT ${token}`,
            },
        }).then((response) => {
            if (response.status === 401) {
                dispatch(logout());
            } else if (!response.ok) {
                dispatch(setFollowUser(userId, isAlarm));
            }
        });
    };
}

function getExplore() {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch("/users/explore/", {
            method: "GET",
            headers: {
                Authorization: `JWT ${token}`,
            },
        })
            .then((response) => {
                if (response.status === 401) {
                    dispatch(logout());
                }
                return response.json();
            })
            .then((json) => {
                dispatch(setUserList(json));
            });
    };
}

function searchByTerm(searchTerm) {
    /// use async for wait two request is done
    return async (dispatch, getState) => {
        const { user: { token } } = getState();
        const userList = await searchUsers(token, searchTerm);
        const imageList = await searchImages(token, searchTerm);
        if (userList === 401 || imageList === 401) {
            dispatch(logout());
        }
        dispatch(setUserList(userList));
        dispatch(setImageList(imageList));
    };
}

function searchUsers(token, searchTerm) {
    return fetch(`/users/search/?username=${searchTerm}`, {
        headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.status === 401) {
                return 401;
            }
            return response.json();
        })
        .then((json) => json);
}

function searchImages(token, searchTerm) {
    return fetch(`/images/search/?hashtags=${searchTerm}`, {
        headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.status === 401) {
                return 401;
            }
            return response.json();
        })
        .then((json) => json);
}

function getUserProfile(userName) {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch(`/users/${userName}/`, {
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status === 401) {
                    dispatch(logout());
                } else if (response.status === 404) {
                } else {
                    return response.json();
                }
            })
            .then((json) => {
                dispatch(setUserProfile(json));
            });
    };
}

/// initial state

const initialState = {
    isLoggedIn: localStorage.getItem("jwt") ? true : false,
    token: localStorage.getItem("jwt"),
    username: localStorage.getItem("username"),
};

/// reducer

function reducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_TOKEN:
            return applySetToken(state, action);
        case LOGOUT:
            return applyLogout(state, action);
        case SET_USER_LIST:
            return applySetUserList(state, action);
        case SET_ALARM_LIST:
            return applySetAlarmList(state, action);
        case FOLLOW_USER:
            return applyFollowUser(state, action);
        case UNFOLLOW_USER:
            return applyUnfollowUser(state, action);
        case SET_IMAGE_LIST:
            return applySetImageList(state, action);
        case SET_USER_PROFILE:
            return applySetUserProfile(state, action);
        default:
            return state;
    }
}

/// reducer functions

function applySetToken(state, action) {
    const { token } = action;
    const { username } = action;

    localStorage.setItem("jwt", token);
    localStorage.setItem("username", username);

    return {
        ...state,
        isLoggedIn: true,
        token,
        username,
    };
}

function applyLogout(state, action) {
    localStorage.removeItem("jwt");
    return {
        isLoggedIn: false,
        token: null,
    };
}

function applySetUserList(state, action) {
    const { userList } = action;
    return {
        ...state,
        userList,
    };
}

function applySetAlarmList(state, action) {
    const { alarmList } = action;

    return {
        ...state,
        alarmList,
    };
}

function applyFollowUser(state, action) {
    const { userId } = action;
    const { isAlarm } = action;

    if (isAlarm === true) {
        const { alarmList } = state;
        const updatedAlarmList = alarmList.map((alarm) => {
            if (alarm.creator.id === userId) {
                return {
                    ...alarm,
                    creator: { ...alarm.creator, following: true },
                };
            }
            return alarm;
        });
        return {
            ...state,
            alarmList: updatedAlarmList,
        };
    } else {
        const { userList } = state;
        const updatedUserList = userList.map((user) => {
            if (user.id === userId) {
                return { ...user, following: true };
            }
            return user;
        });
        return {
            ...state,
            userList: updatedUserList,
        };
    }
}

function applyUnfollowUser(state, action) {
    const { userId } = action;
    const { isAlarm } = action;

    if (isAlarm === true) {
        const { alarmList } = state;
        const updatedAlarmList = alarmList.map((alarm) => {
            if (alarm.creator.id === userId) {
                return {
                    ...alarm,
                    creator: { ...alarm.creator, following: false },
                };
            }
            return alarm;
        });
        return {
            ...state,
            alarmList: updatedAlarmList,
        };
    } else {
        const { userList } = state;
        const updatedUserList = userList.map((user) => {
            if (user.id === userId) {
                return { ...user, following: false };
            }
            return user;
        });
        return {
            ...state,
            userList: updatedUserList,
        };
    }
}

function applySetImageList(state, action) {
    const { imageList } = action;
    return {
        ...state,
        imageList,
    };
}

function applySetUserProfile(state, action) {
    const { userProfile } = action;
    return {
        ...state,
        userProfile,
    };
}

/// exports

const actionCreators = {
    facebookLogin,
    usernameLogin,
    createAccount,
    logout,
    getPhotoLikes,
    getUserAlarms,
    followUser,
    unfollowUser,
    getExplore,
    searchByTerm,
    getUserProfile,
};

export { actionCreators };
/// reducer export

export default reducer;

// userDTO 클래스
class UserDTO {
    userId;
    userName;
    signupDatetime;
    userPassword;

    constructor(data) {
        this.userId = data.user_id;
        this.userName = data.user_name;
        this.signupDatetime = data.signup_datetime;
        this.userPassword = data.user_password;
    }
}

module.exports = UserDTO;
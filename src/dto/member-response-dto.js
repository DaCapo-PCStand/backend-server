// memberDTO 클래스
class MemberDTO {
    memberId;
    memberName;
    signupDatetime;
    memberPassword;

    constructor(data) {
        this.memberId = data.member_id;
        this.memberName = data.member_name;
        this.registDatetime = data.signup_datetime;
        this.memberPassord = data.member_password;
    }
}

module.exports = MemberDTO;
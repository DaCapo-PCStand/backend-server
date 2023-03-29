// memberDTO 클래스
class MemberDTO {
    memberId;
    memberName;
    signupDatetime;

    constructor(data) {
        this.memberId = data.member_id;
        this.memberName = data.member_name;
        this.registDatetime = data.signup_datetime;
    }
}

module.exports = MemberDTO;
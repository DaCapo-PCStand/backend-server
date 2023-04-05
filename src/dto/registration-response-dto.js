class RegistrationDTO {
    registrationId;
    memberId;
    standId;
    serialNumber;

    constructor(data) {
        this.registrationId = data.registration_id;
        this.memberId = data.member_id;
        this.standId = data.stand_id;
        this.serialNumber = data.serial_number;
    }
}

module.exports = RegistrationDTO;
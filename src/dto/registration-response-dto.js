class RegistrationDTO {
    registrationId;
    userId;
    standId;
    serialNumber;

    constructor(data) {
        this.registrationId = data.registration_id;
        this.userId = data.user_id;
        this.standId = data.stand_id;
        this.serialNumber = data.serial_number;
    }
}

module.exports = RegistrationDTO;
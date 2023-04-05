class StandDTO {
    standId;
    serialNumber;
    ipAddress;

    constructor(data) {
        this.standId = data.stand_id;
        this.serialNumber = data.serial_number;
        this.ipAddress = data.ip_address;
    }
}

module.exports = StandDTO;
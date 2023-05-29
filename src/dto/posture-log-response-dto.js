class PostureLogDTO{
    logId;
    logDate;
    sittingTime;
    straightTime;
    badTime;

    constructor(data) {
        console.log(data);
        this.logId = data.log_id;
        this.logDate = data.log_date;
        this.sittingTime = data.sitting_time;
        this.straightTime = data.straight_time;
        this.badTime = data.bad_time;
    }

}

module.exports = PostureLogDTO;
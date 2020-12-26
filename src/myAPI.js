//API to calculate different between two date object
function time_diff(date1, date2) {
    // get total seconds between the times
    var delta = Math.abs(date1 - date2) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours. 
    var hours = Math.floor(delta / 3600);
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60);
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = Math.ceil(delta);

    return [days, hours, minutes, seconds];
}

export { time_diff }
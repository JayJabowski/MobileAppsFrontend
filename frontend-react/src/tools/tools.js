export const parseTimeString = (timeString) =>{
    //2023-05-05_14-38-40
    //0123456789012345678
    const timeObj = {
        year : timeString.substring(0,4),
        month : timeString.substring(5,7),
        day: timeString.substring(8,10),
        hour: timeString.substring(11,13),
        minute: timeString.substring(14,16),
        second: timeString.substring(17,19)
    }

    return timeObj;

}
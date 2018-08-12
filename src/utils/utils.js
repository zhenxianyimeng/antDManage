export default {
    formateDate(time){
        if(!time)
            return '';
        let date = new Date(time);
        console.log(date)
        // console.log(date.)
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        +" "+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
}
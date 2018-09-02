export default {
    formateDate(time){
        if(!time)
            return '';
        let date = new Date(time);
        // console.log(date)
        // console.log(date.)
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        +" "+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    },

    pagination(data, callback){
        return {
            onChange:(current) => {
                callback(current)
            },
            current: data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total,
            showTotal: () => {
                return `共${data.result.total}条`
            },
            // showQuickJumper:true,
        }
    }
}
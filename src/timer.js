// const interval = "value"

const timer = () => {
    
    // let timer = setInterval((timerCheck)=>{
        // if(timerCheck) {
        //     clearInterval()
        // }

        var hour = 0 
        var min = 0
        var sec = 0
        var useTime = 0
        var useTimeText = ""

        useTime++
        min = Math.floor(useTime/60);
        hour = Math.floor(min/60);
        sec = useTime%60;
        min = min%60;

        var th = hour;
        var tm = min;
        var ts = sec;
        if(th < 10) {th = "0" + hour}
        if(tm < 10) {tm = "0" + min}
        if(ts < 10) ts = "0" + sec;

        if(th="00"){
            useTimeText = tm + ":" + ts;
        } else {
            useTimeText = th + ":" + tm + ":" + ts;
        }
        // useTimeText = th + ":" + tm;
        console.log("timercheck:" + useTimeText)
        // console.log(useTimeText);
        // return useTimeText
    // },1000);

}

const test = {timer}

export default test

/**
 * 
 * promise.then()：获取异步任务的正常结果。
    promise.catch()：获取异步任务的异常结果。
    promise.finaly()：异步任务无论成功与否，都会执行} params 
 */
const kl_request = (params) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var data = { retCode: 200, msg: 'success', params: params}; // 接口返回的数据
            if (data.retCode == 200) {
                resolve(data);
            }else {
                reject({ retCode: -1, msg: 'network error', params: params});
            } 
        }, 1000);
    })
}

const printData = (tag, data) => {
    var str="";
    for (var item in data){
        str +=item+":"+data[item]+"\n";
    }

    console.log(tag + "：" + str)
}
 
//---------------------- promise请求示例 ----------------------------
//
const res = kl_request({url: "xxx"}).then(data => {
    printData("请求成功", data)
}).catch(data => { 
    printData("请求失败", data) 
})

//
printData("res", res)  


//---------------------- 链式请求promise请求示例 ----------------------------
kl_request({url: "xxx"})
.then(
    data1 => {
        printData("第一次success", data1) 
        // 请求完接口1后，继续请求接口2
        return kl_request({url: "xxx2"})
    },
    error1 => {
        printData("第一次失败", error1)
    }
).then(
    data2 => {
        printData("第二次success", data2) 
    },
    error2 => {
        printData("第二次失败", error2)
    }
)
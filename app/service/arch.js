"use strict";
const os = require("os");

const Service = require("egg").Service;

var dealTime = seconds => {
  var seconds = seconds | 0;
  var day = (seconds / (3600 * 24)) | 0;
  var hours = ((seconds - day * 3600) / 3600) | 0;
  var minutes = ((seconds - day * 3600 * 24 - hours * 3600) / 60) | 0;
  var second = seconds % 60;
  day < 10 && (day = "0" + day);
  hours < 10 && (hours = "0" + hours);
  minutes < 10 && (minutes = "0" + minutes);
  second < 10 && (second = "0" + second);
  return [day, hours, minutes, second].join(":");
};

var dealMem = mem => {
  var G = 0,
    M = 0,
    KB = 0;
  mem > 1 << 30 && (G = (mem / (1 << 30)).toFixed(2));
  mem > 1 << 20 && mem < 1 << 30 && (M = (mem / (1 << 20)).toFixed(2));
  mem > 1 << 10 && mem > 1 << 20 && (KB = (mem / (1 << 10)).toFixed(2));
  return G > 0 ? G + "G" : M > 0 ? M + "M" : KB > 0 ? KB + "KB" : mem + "B";
};



// //主目录
// const hdir = os.homedir();
// console.log("主目录：" + hdir);

// //内存
// const totalMem = os.totalmem();
// const freeMem = os.freemem();
// console.log(
//   "内存大小：" + dealMem(totalMem) + " 空闲内存：" + dealMem(freeMem)
// );



// //网卡
// console.log("*****网卡信息*******");
// const networksObj = os.networkInterfaces();
// for (let nw in networksObj) {
//   let objArr = networksObj[nw];
//   console.log(`\r\n${nw}：`);
//   objArr.forEach((obj, idx, arr) => {
//     console.log(`地址：${obj.address}`);
//     console.log(`掩码：${obj.netmask}`);
//     console.log(`物理地址：${obj.mac}`);
//     console.log(`协议族：${obj.family}`);
//   });
// }

class ArchService extends Service {
  async find(name) {
    let result = "";
    switch (name) {
      case "arch":
        //cpu架构
        result = os.arch();
        break;
      case "type":
        //操作系统内核
        result = os.type();
        break;
      case "platform":
        //操作系统平台
        result = os.platform();
        break;
      case "uptime":
        //系统开机时间
        result = os.uptime();
        break;
      case "hostname":
        //主机名
        result = os.hostname();
        break;
      default:
        //cpu架构
        //cpu
        const cpus = os.cpus();
        console.log("*****cpu信息*******");
        cpus.forEach((cpu, idx, arr) => {
          var times = cpu.times;
          console.log(`cpu${idx}：`);
          console.log(`型号：${cpu.model}`);
          console.log(`频率：${cpu.speed}MHz`);
          console.log(
            `使用率：${(
              (1 -
                times.idle /
                  (times.idle +
                    times.user +
                    times.nice +
                    times.sys +
                    times.irq)) *
              100
            ).toFixed(2)}%`
          );
        });
        result = os.arch();
    }

    return result;
  }
}

module.exports = ArchService;

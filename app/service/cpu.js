"use strict";

const os = require("os");
const Service = require("egg").Service;
const osUtils = require("os-utils");

let interval = -1;
let currCPU = 0;

Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
}

function start() {
  updateCPU();
  if (interval < 0) {
    // interval = setInterval(function () {
    var freeMem = os.freemem() / 1024 / 1024 / 1024;
    var totalMem = os.totalmem() / 1024 / 1024 / 1024;
    var data = {
      cpuUsage: (currCPU * 100.0).toFixed(2) + "%",
      freeMem: freeMem.toFixed(2) + "G",
      totalMem: totalMem.toFixed(2) + "G",
      usedMem: (totalMem - freeMem).toFixed(2) + "G",
      MemUsage: (((totalMem - freeMem) / totalMem) * 100.0).toFixed(2) + "%",
      time: new Date().Format("hh:mm")
    };
    // io.sockets.emit("systemUpdate",data)s
    console.log(data);
    return data;
    // }, 1000);//每隔1s取系统数据
  }
}

function updateCPU() {
  setTimeout(function() {
    osUtils.cpuUsage(function(value) {
      currCPU = value;
      updateCPU();
    });
  }, 0);
}

class CpuService extends Service {
  async find() {
    return start();
  }
}

module.exports = CpuService;

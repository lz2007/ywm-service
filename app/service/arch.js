"use strict";

const os = require("os");
const Service = require("egg").Service;
const osUtils = require("os-utils");

let interval = -1;
let currCPU = 0;

function start(){
  updateCPU();
  if (interval < 0) {
    // interval = setInterval(function () {
      var freeMem = os.freemem()/1024/1024/1024;
      var totalMem = os.totalmem()/1024/1024/1024;
      var data = {
        cpuUsage: ( currCPU * 100.0 ).toFixed(2) + "%",
        freeMem: freeMem.toFixed(2) + "G",
        totalMem: totalMem.toFixed(2) + "G",
        usedMem: (totalMem - freeMem).toFixed(2) + "G",
        MemUsage: ( (totalMem - freeMem)/totalMem * 100.0 ).toFixed(2) + "%",
      };
      // io.sockets.emit("systemUpdate",data)s
      console.log(data)
      return data;
    // }, 1000);//每隔1s取系统数据
  }
}

function updateCPU() {
  setTimeout(function () {
    osUtils.cpuUsage(function (value) {
      currCPU = value;
      updateCPU();
    });
  }, 0);
}


class ArchService extends Service {
  async find() { 
    return start();
  }
}

module.exports = ArchService;

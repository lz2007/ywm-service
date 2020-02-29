"use strict";

const Controller = require("egg").Controller;

class CpuController extends Controller {
  async index() {
    const { ctx } = this;
    const userInfo = await ctx.service.cpu.find();

    ctx.body = userInfo;
  }
}

module.exports = CpuController;

"use strict";

const Controller = require("egg").Controller;

class ArchController extends Controller {
  async index() {
    const { ctx } = this;
    const userInfo = await ctx.service.arch.find();
    
    ctx.body = userInfo;
  }
}

module.exports = ArchController;

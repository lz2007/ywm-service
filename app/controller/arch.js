"use strict";

const Controller = require("egg").Controller;

class ArchController extends Controller {
  async index() {
    const { ctx } = this;
    const name = ctx.params.name;
    console.log(ctx.params);
    
    const userInfo = await ctx.service.arch.find(name);
    ctx.body = userInfo;
  }
}

module.exports = ArchController;

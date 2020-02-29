'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get("/api/arch", controller.arch.index);
  router.get("/api/cpu", controller.cpu.index);
};

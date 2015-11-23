'use strict';

const app = require('../server');

const mgrDataSource = app.dataSources.repoMgr;

mgrDataSource.automigrate('detail', (err) => {
  if (err) throw err;
  console.log('customer model migrated');
  mgrDataSource.disconnect();
});
'use strict';

const request = require('superagent'),
  ServerActionCreators = require('../actions/ServerActionCreators');

let GitHub = {
  getDetail(repoName){
    return request
      .get(`/api/details/${repoName}`)
      .set('Accept', 'application/json')
      .end((err, res)=> {
        err ? ServerActionCreators.handleRepoDetailError(err) : ServerActionCreators.handleRepoDetailSuccess(repoName, res);
      });
  },
  putDetail(detail){
    console.info('detail', detail);
    return request
      .put(`/api/details/${detail.id}`)
      .send(detail)
      .set('Accept', 'application/json')
      .end((err, res)=> {
        err ? ServerActionCreators.putRepoDetailError(err) : ServerActionCreators.putRepoDetailSuccess(detail.id, res);
      });
  }
};
module.exports = GitHub;
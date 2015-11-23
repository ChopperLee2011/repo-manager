module.exports = function(Detail) {
  Detail.disableRemoteMethod('prototype.updateAttributes', true);
  Detail.disableRemoteMethod('findById', true);

  Detail.updateDetailByRepoName = (repoName, repoDetail) => {
    console.info('repoName',repoName);
    console.info('repoDetail',repoDetail);

    return Detail.updateOrCreate(repoDetail);
  };

  Detail.getDetailByRepoName = (repoName) => {
    return Detail.find({id: repoName})
      .then(res=> {
        console.info('res.value', res[0].value);
        return res[0]
      })
      .catch(err=> {
        return {
          value: {
            id: repoName,
            label: '',
            comment: ''
          }
        };
      });
  };

  Detail.remoteMethod(
    'updateDetailByRepoName', {
      description: 'Update detail objects by repo name.',
      accessType: 'WRITE',
      accepts: [
        {arg: 'repoName', type: 'string', description: 'repo name', required: true, http: {source: 'path'}},
        {arg: 'repoDetail', type: 'object', description: 'repo detail', required: true, http: {source: 'body'}}

      ],
      returns: {arg: 'detail', type: 'object'},
      http: {verb: 'put', path: '/:repoName'}
    }
  );

  Detail.remoteMethod(
    'getDetailByRepoName', {
      description: 'get detail objects by repo name.',
      accessType: 'READ',
      accepts: [
        {arg: 'repoName', type: 'string', description: 'repo name', required: true, http: {source: 'path'}}
      ],
      returns: {arg: 'detail', type: 'object'},
      http: {verb: 'get', path: '/:repoName'}
    }
  );
};

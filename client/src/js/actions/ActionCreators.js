'use strict';

const AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionType = require('../constants/ActionTypes'),
    RepoMgrAPI = require('../api/RepoMgrAPI'),
    GithubAPI = require('../api/GithubAPI');

export default {
    getUser() {
        AppDispatcher.handleViewAction({
            actionType: ActionType.GET_USER
        });
        GithubAPI.getUserOrg();
    },
    getRepo(userType, userName) {
        AppDispatcher.handleViewAction({
            actionType: ActionType.GET_REPO,
            userName: userName
        });
        if (userType === 'user') {
            GithubAPI.getUserRepo(userName);
        } else if (userType === 'org') {
            GithubAPI.getOrgRepo(userName);
        }
    },
    getIssue(repoUrl) {
        AppDispatcher.handleViewAction({
            actionType: ActionType.GET_ISSUE
        });
        GithubAPI.getIssue(repoUrl);
    },

    getDetail(repoUrl) {
      AppDispatcher.handleViewAction({
        actionType: ActionType.GET_REPO_DETAIL
      });
      let repoName = repoUrl.split('/').pop();
      RepoMgrAPI.getDetail(repoName);
    },

    putDetail(detail) {
      AppDispatcher.handleViewAction({
        actionType: ActionType.PUT_REPO_DETAIL
      });
      RepoMgrAPI.putDetail(detail);
    }

}

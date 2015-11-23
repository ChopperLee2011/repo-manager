const {createStore} = require('../utils/StoreUtils'),
  ActionTypes = require('../constants/ActionTypes'),
  AppDispatcher = require('../dispatcher/AppDispatcher');
let _detail = {};
let DetailStore = createStore({
  get() {
    return _detail;
  }
});
DetailStore.dispatcherToken = AppDispatcher.register((payload) => {
  let action = payload.action;
  switch (action.type) {
    case ActionTypes.GET_REPO_DETAIL_SUCCESS:
      _detail = action.response.body.detail.value;
      DetailStore.emitChange();
      break;
    default:
    // do nothing

  }
});
module.exports = DetailStore;
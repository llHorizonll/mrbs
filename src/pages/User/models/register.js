import { registerUser } from '@/services/auth';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'register',
  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(registerUser, payload);
      if (response.ok === true) {
        yield put({
          type: 'registerHandle',
          payload: {
            status: true,
            currentAuthority: 'user',
          },
        });
      }
      
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};

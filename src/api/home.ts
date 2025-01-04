import request from '@/utils/axios';

export function memberRegisterApi(data: any) {
	return request({
	  url: '/rest/auth/login',
	  method: 'post',
	  data: data
	});
  }
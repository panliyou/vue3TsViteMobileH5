import request from '@/utils/axios';

export function memberRegisterApi(data: any) {
	return request({
	  url: '/wx/register',
	  method: 'post',
	  data: data
	});
  }
dic.register('UserService', function (dic) {
  return new UserService();
}, {shared: true});
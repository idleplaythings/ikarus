(function(){dic.register('ServerRepository', function (dic) {
  return new ServerRepository(
    collections.ServerCollection
  );
}, {shared: true});

})();

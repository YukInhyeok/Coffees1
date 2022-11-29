module.exports = (app) => {
  const coffees = require('./coffee.controller.js');  //contact.controller.js를 로딩
  const coffees1 = require('./coffee1.controller.js');  //contact.controller.js를 로딩

  app.get('/coffees', coffees.findAll);             //모든 장치 검색
  app.get('/coffees/:coffeeId', coffees.findOne);  //특정 장치 검색
  app.post('/coffees',coffees.create);             //새로운 장치 추가
  app.put('/coffees/:coffeeId', coffees.update);   //특정 장치 업데이트
  app.delete('/coffees/:coffeeId', coffees.delete); //특정 장치 삭제
  app.get('/coffees1', coffees1.findAll);             //모든 장치 검색
  app.get('/coffees1/:coffeeId', coffees1.findOne);  //특정 장치 검색
  app.post('/coffees1', coffees1.create);  //장치 데이터 업로드
  app.put('/coffees1/:coffeeId', coffees1.update);   //특정 장치 업데이트
  app.delete('/coffees1/:coffeeId', coffees1.delete); //특정 장치 삭제
  
}

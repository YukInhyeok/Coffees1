const Coffee1 = require('./coffee1.model.js');

// 새로운 커피 추가하기
exports.create = (req, res) => {
  const sample = new Coffee1({ 
    coffeeId: req.body.coffeeId,
    name: req.body.name,
    price: req.body.price,
    feature: req.body.feature,
    period: req.body.period
  });
  
  //데이터베이스에 새로운 커피 저장하기 
  sample.save()
  .then(data => { res.send(data); })
  .catch(err => { 
    res.status(500).send({ message: err.message}); 
  });
};


//모든 커피 검색
exports.findAll = (req, res) => {
  Coffee1.find()
  .then( samples => { 
	res.send(samples);
	console.log(samples)	//test log
	  })
  .catch(err => { 
    res.status(500).send({ message: err.message }); 
  });
};

//특정한 커피 검색
exports.findOne = (req, res) => {
    Coffee1.find({coffeeId : req.params.coffeeId})
  .then( samples => {
    if(!samples){
      return res.status(404).send({
        message: req.params.coffeeId + "에 해당하는 커피가 없습니다." }); 
    }
    res.send(samples);
  }).catch(err => { 
    return res.status(500).send({ message: req.params.coffeeId +" 로 검색 중 에러 발생" });
  });  
};

//업데이트
exports.update = (req, res) => { 
  $socket.emit('smart',{data:req.params.coffeeId});
Coffee1.findOneAndUpdate( {coffeeId:req.params.coffeeId}, 
  { coffeeId: req.body.coffeeId, name:req.body.name, price:req.body.price, feature:req.body.feature, period: req.body.period}, 
  {new:true}
)
.then(samples => { 
  if(!samples) {
    return res.status(404).send({ message: req.params.coffeeId +
      "에 해당하는 커피가 발견되지 않았습니다." })
  }
  res.send(samples);
}).catch(err => { 
  return res.status(500).send({ message: err.message });
});
};

//삭제
exports.delete = (req, res) => {
Coffee1.findOneAndDelete({coffeeId:req.params.coffeeId})
.then(samples => {
  if(!samples) {
    return res.status(404).send({ message: req.params.coffeeId +"에 해당하는 커피가 없습니다." })
  }
  res.send({ message: "정상적으로 " + req.params.coffeeId + " 커피가 삭제되었습니다." })
})
.catch(err => {
  return res.status(500).send({ message: err.message }); 
});
};


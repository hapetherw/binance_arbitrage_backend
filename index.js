const T = require('./Mods/getArbPairs.js');

T.startServer()
  .then(() => {
    return T.getPairs();
  }).then(() => {
    T.calculate();
  }).catch(err => {
    console.log(err);
  });

// T.startServer()
//   .then(() => {
//     T.test();
//   }).catch(err => {
//     console.log(err);
//   });

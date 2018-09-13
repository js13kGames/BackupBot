import pointLamp from './pointLamp';

//a row in z-axis
  function generateRowInZAxis(x) {
    return new Promise(function (resolve) {

      var zPromise = [];

    for (var z = 0; z <=5; z+5) {
      zPromise.push(pointLamp(x,z));
    }
    for (var z = -5; z >=-5; z-5) {
      zPromise.push(pointLamp(x,z));
    }

    Promise.all(zPromise).then(function (val) {
      resolve(val);
    })

    });
  }

export default function pointLamps() {

return new Promise(function (resolve) {
  var xPromise = [];

  //create a 40*40 array of pointLamps
  for (var x = 0; x <= 20; x+5) {
    //on +ve side
    xPromise.push(generateRowInZAxis(x));
  }
  for (var x = -5; x >= -20; x-5) {
    //on -ve side
    xPromise.push(generateRowInZAxis(x));
  }

  Promise.all(xPromise).then(function (xPromise) {
    resolve(xPromise);
  });
});

}

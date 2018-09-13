/* Generates a point lamb like below:
  <a-light
    type="point"
    color="blue"
    rotation="180 0 180"
    position="0 0.04 -5"
    decay="15"
    distance="10">
  </a-light>
*/
var i = 0;
export default function pointLamp(x, z) {
  return new Promise(function (resolve) {
    var pointLamp = document.createElement('a-light'),
        prop = {
                type: 'point',
                color: 'blue',
                rotation: '180 0 180',
                position: `${x} 0.04 ${z}`,
                decay: '15',
                distance: '10'
              };

      Object.keys(prop).forEach(function (key) {
        pointLamp.setAttribute(key, prop[key]);
      });
      console.log(i++);
      resolve(pointLamp);
  });
}

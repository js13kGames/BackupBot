window.addEventListener('load', function () {
  var scene = document.querySelector('a-scene'),
      dynamicCamera = scene.querySelector('#dynamicCamera'),
      staticCamera = scene.querySelector('#staticCamera'),
      light = scene.querySelector('a-light'),
      enemy = scene.querySelector('#enemy'),
      eP = scene.querySelectorAll('.enemyP'),
      eHead= scene.querySelectorAll('#head'),
      hideKillAnime = scene.querySelector('#hideKillAnime'),
      gameTimer = scene.querySelector('#gameTimer'),
      enemyTimer = scene.querySelector('#enemyTimer'),
      offlineTxt = scene.querySelector('#offlineTxt'),
      killTxt = scene.querySelector('#killTxt'),
      gun = scene.querySelector('#gun'),
      Dgun = scene.querySelector('#Dgun'),
      enemyStats = scene.querySelector('#enemyStats'),
      laser = scene.querySelector('#laser'),
      gameStats = scene.querySelector('#gameStats'),
      gun = scene.querySelector('#gun'),
      gameOverTxt = scene.querySelector('#gameOverTxt'),
      gamewinTxt = scene.querySelector('#gamewinTxt'),
      showGunAnime = gun.querySelector('#showGunAnime'),
      turnGunAnime = gun.querySelector('#turnGunAnime'),
      fireTxt = scene.querySelector('#fireTxt'),
      hideBackupAnime = offlineTxt.querySelector('#hideBackupAnime'),
      enemyLandingAnime = enemy.querySelector('#enemyLandingAnime'),
      cursor = scene.querySelector('[cursor]'),
      startMenu = scene.querySelector('#startMenu'),
      startMenuAnime = startMenu.querySelector('a-animation'),
      isFirstTimePlaying = true,
      gameTime=120,
      gameTimeInterval,
      enemyTimeInterval,
      enemyTime = 60;
      positve = false;

  startMenu.addEventListener('click', function () {
    isFirstTimePlaying = false;
  })

  startMenuAnime.addEventListener('animationstart', function () {
    dynamicCamera.setAttribute('camera', {active:false});
    dynamicCamera.emit('hideDynamicCamera', {}, false);
    staticCamera.emit('showStaticCamera', {}, false);
    staticCamera.setAttribute('camera', {active:true});
    setTimeout(function () {
      staticCamera.emit('viewUp', {}, false);

      setTimeout(function () {
        enemy.emit('moveDown', {}, false);
        staticCamera.emit('viewDown', {}, false);
      }, 1400)

    }, 1000);
    cursor.object3D.visible = false;
  })

enemyLandingAnime.addEventListener('animationend', function () {
  light.emit('backupMode', {}, false)
  setTimeout(function () {
    offlineTxt.emit('showBackup', {}, false);
    setTimeout(function () {
      offlineTxt.emit('hideBackup', {}, false)
      light.emit('offlineMode', {}, false)
    }, 2000)
  }, 2000)
})

hideBackupAnime.addEventListener('animationend', function () {
  setTimeout(function () {
    fireTxt.emit('showFireTxt', {}, false)
    setTimeout(function () {
      gun.emit('showGun', {}, false)
    }, 500)
  }, 500)
})

showGunAnime.addEventListener('animationend', function () {
  gun.emit('turnGun', {}, false)
  fireTxt.emit('hideFireTxt', {}, false)
})

turnGunAnime.addEventListener('animationend', function () {

  setTimeout(function () {
    killTxt.emit("showKillTxt",{}, false)

    setTimeout(function () {
    killTxt.emit("hideKillTxt",{}, false)
    }, 2000)
  }, 500)
})

hideKillAnime.addEventListener('animationend', function () {
    gun.setAttribute('visible', 'false');
    staticCamera.setAttribute('camera', {active: false})
    staticCamera.emit('hideStaticCamera', {}, false);
    dynamicCamera.emit('showDynamicCamera', {}, false);
    Dgun.emit('showDGun', {}, false);
    enemyStats.emit('showEnemyStats', {}, false)
    gameStats.emit('showGameStats', {}, false)
    dynamicCamera.setAttribute('camera', {active: true})

    cursor.object3D.visible = true;
    laser.emit('shootLaser', {}, false)
    gameTimeInterval = setInterval(function () {
      if(enemyTime === 0 && gameTime >1) {
          clearInterval(gameTimeInterval)
          clearInterval(enemyTimeInterval)
          light.emit('off', {}, false);
          dynamicCamera.setAttribute('camera', {active:false});
          dynamicCamera.emit('hideDynamicCamera', {}, false);
          staticCamera.emit('showStaticCamera', {}, false);
          staticCamera.setAttribute('camera', {active:true});
          gamewinTxt.emit('showWinTxt', {}, false)
          setTimeout(function () {
            window.location.reload(true);
          },3000)
      }
      if (gameTime === 1) {
        clearInterval(gameTimeInterval)
        light.emit('off', {}, false);
        dynamicCamera.setAttribute('camera', {active:false});
        dynamicCamera.emit('hideDynamicCamera', {}, false);
        staticCamera.emit('showStaticCamera', {}, false);
        staticCamera.setAttribute('camera', {active:true});
        gameOverTxt.emit('showgameOverTxt', {}, false)
        setTimeout(function () {
          window.location.reload(true);
        },3000)
      }
      gameTimer.setAttribute('value', `${--gameTime} sec`)
      if (gameTime !== 120 && enemyTime !== 60) {
        if(gameTime % 5 === 0) {
          if(positive = true) {
            positive = false;
            enemy.object3D.position.x= `-${Math.floor(Math.random() * 20) + 8}`;
            enemy.object3D.position.z= `-${Math.floor(Math.random() * 20) + 8}`;
          }else {
            positive = true
            enemy.object3D.position.x= Math.floor(Math.random() * 20) + 8
            enemy.object3D.position.z= Math.floor(Math.random() * 20) + 8
          }
        }
      }
    }, 1000)
})

cursor.addEventListener('mouseenter', function (event) {
  if (event.detail.intersectedEl.id == 'head') {
    enemyTimeInterval = setInterval(function () {
      enemyTime--;
      enemyTimer.setAttribute("value", enemyTime)
    }, 1000);
    eP.forEach(function (e) {
      e.setAttribute('color', 'red');
    })
  }
})

cursor.addEventListener('mouseleave', function (event) {
  if (event.detail.intersectedEl.id == 'head') {
  clearInterval(enemyTimeInterval);
  eP.forEach(function (e) {
    e.setAttribute('color', 'grey');
  })
}
})

cursor.addEventListener('mouseenter', function (e) {
  console.log(e.detail.intersectedEl);
})


})

var casper = require('casper').create()

casper.start();

casper.open('http://login.dialog.lk/CommonLogin/controller/authentication/loginCtrl.jsp', {
  method: 'post',
  data:   {
    'username': 'DIALOG USERNAME',
    'password':  'DIALOG PASSWORD',
    'isSilentLogin': '1',
    'action':'loginMain',
    'qfmt':'xml',
    'appID':'null',
    'returnURL':'https://mydialog.dialog.lk/my/ctrl/mylogin/login.jsp?action=login',
    'timestamp':'null',
    'setLang':'e',
    'optional':'null',
    'exceedVal':'0',
    'sendAlert':'1',
    'lastLogin':'1'
  }
});

function casperOpenPortal(fwdPath){
  var logiUrl = 'https://mydialog.dialog.lk/my/ctrl/mylogin/login.jsp?action=doLogin'
  var dataUrl = 'https://mydialog.dialog.lk/my/ctrl/mydata/mydataCtrl.jsp?action=data'
  casper.thenOpen(fwdPath)
  casper.thenOpen(logiUrl)
  casper.thenOpen(dataUrl)
  casper.then(function(){
    var data = this.evaluate(function(){
      text = document.querySelectorAll('td.body-text')
      return Array.prototype.map.call(text, function(e) {
        return e.innerHTML
      });
    })
    var bb = {
      // 'name':/>(.*)!</g.exec(data[1])[1],
      'usage':Math.floor(data[4]),
      // 'usage':data[4]
      // 'fup':data[6],
      // 'updated':data[8]
    }
    // console.log(bb.name)
    console.log(bb.usage)
    // console.log(bb.fup)
    // console.log(bb.updated)
  })
}

casper.then(function() {
  var jSt = /{.*}/g.exec(this.page.content)
  var res = JSON.parse(jSt)
  fwdPath = res.forwardPath
  // console.log(fwdPath)
  casperOpenPortal(fwdPath)
})

casper.run();

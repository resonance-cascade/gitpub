var req = {};
req.files = [ {stuff: 'derp', ho:'hi',bloop: 'blop'}, {stuff: 'derp', ho:'hi', bloop: 'blop'  }]

function setFm(cb) {
    var fm = {
      amessage: 'Hi dude!',
      anothermsg: 'hey',
      anothermsga: 'hey',
      anotherms: 'hey',
      anotherm: 'hey',
      anothesg: 'hey',
      anothermsg: 'hey',
      anotrmsg: 'hey',
      anothermsg: 'hey',
      anhermsg: 'hey',
      anothermsg: 'hey',
      aohermsg: 'hey',
      anfdfdothermsg: 'hey',
      anothefdsrmsg: 'hey',
      anothermsfdsfg: 'hey',

      files: []
    };

    req.files.map(function (file) {
      var fileInfo = {
        stuff: file.stuff,
        ho: file.ho
      };
      fm.files.push(fileInfo);
    });
    cb(fm);
  }

  setFm(function(fm) {
    console.log(fm);
  });
var express = require('express');
var router = express.Router();

const request = require('request-promise');

/* GET fabebook videos listing. */
router.get('/', function(req, res, next) {
  if (!req.user)
    res.redirect('../')
  else {
    const postFieldSet = 'id, created_time, type, link, name, full_picture';

    res.render('facebook', {user: req.user});
  }
});

router.post('/posts', function (req, res, next) {
  const postFieldSet = 'id, created_time, type, link, name, full_picture';

  var url = req.body.url ? req.body.url : 'https://graph.facebook.com/'+req.user.id+'/feed'
  console.log('url: '+url)

  const options = {
    method: 'GET',
    uri: url,
    qs: {
      access_token: req.user.token,
      fields: postFieldSet
    }
  };
  request(options)
    .then(fbRes => {
      const parsedRes = JSON.parse(fbRes)
      const data = parsedRes.data.filter(function (p) { return p.type == 'video' && p.link.includes('www.youtube.com')});
      const paging = parsedRes.paging
      if (data.length == 0)
        paging.next = null
      console.log('feed: '+JSON.stringify(data))
      console.log('paging: '+JSON.stringify(paging))
      res.render('videos', {posts: data, paging: paging})
    });
});

module.exports = router;

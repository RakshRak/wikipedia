const express = require('express');
const Article = require('../public/model/articles.js');
const router = express.Router();
var uid = "";
router.get('/:id/articles', function(req, res) {

    Article.find({ id: { $eq: req.params.id } }, function(err, plogs) {
        if (err) {
            console.log('error');
        } else {
            uid = req.params.id;
            res.render('article/index', { articles: plogs, id: uid });
        }
    });
});



router.post('/articles', function(req, res) {
    Article.create(req.body.blog, function(err, newReq) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/' + req.body.blog.id + '/articles');
        }
    });
});

router.get('/:id/articles/:id', function(req, res) {
    Article.findById(req.params.id, function(err, foundReq) {
        if (err) {
            res.redirect('/:id/articles');
        } else {
            res.render('article/show', { requ: foundReq, id: uid });
        }
    });
});

router.get('/search', function(req, res) {
    res.render('article/search');
});

router.post('/search', function(req, res) {
    var rr = {};
    Article.findOne({ title: { $eq: req.body.search } }, function(err, found) {
        if (err) {
            console.log(err)
        } else {
            console.log(found)
            var i = 0;

            console.log(rr)
            if (found == null) {
                res.render('article/nofound')
            } else {
                if (found.status == 'approved') {
                    res.render('article/searchres', { requ: found });
                } else {
                    res.render('article/nofound')
                }

            }
        }

    });
});
router.get('/:id/articles/:id/edit', function(req, res) {
    Article.findById(req.params.id, function(err, foundReq) {
        if (err) {
            res.redirect('/' + req.body.id + '/articles');
        } else {
            res.render('article/edit', { requ: foundReq, id: uid });
        }
    });
});

router.put('/:id/articles/:id', function(req, res) {
    Article.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedReq) {
        if (err) {
            res.redirect('/' + req.body.id + '/articles');
        } else {
            res.redirect('/' + uid + '/articles/');
        }
    });
});

router.delete('/:id/articles/:id', function(req, res) {
    Article.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.send('SOMETHING WENT WRONG');
        } else {
            res.redirect('/' + uid + '/articles');
        }
    });
});

module.exports = router;
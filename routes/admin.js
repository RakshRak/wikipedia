const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
const User = require('../public/model/user');
const Articles = require('../public/model/articles');
router.use(methodOverride('_method'));

router.get('', function(req, res) {
    User.find({}, function(err, plogs) {
        if (err) {
            console.log('error');
        } else {
            uid = req.params.id;
            res.render('admin/indexadmin', { users: plogs, id: uid });
        }
    });
});
router.get('/xyz', function(req, res) {
    Articles.find({}, function(err, plogs) {
        if (err) {
            console.log('error');
        } else {
            uid = req.params.id;
            res.render('admin/articleapp', { articles: plogs, id: uid });
        }
    });
});
router.get('/abc/:id', function(req, res) {
    Articles.findById(req.params.id, function(err, foundReq) {
        if (err) {
            res.redirect('/admin/xyz');
        } else {
            res.render('admin/approve', { requ: foundReq, id: uid });
        }
    });
});


router.get('/approve/:id', function(req, res) {
    var newvalues = { $set: { status: 'approved' } };
    Articles.findByIdAndUpdate(req.params.id, newvalues, function(err, updatedReq) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/admin/xyz');
        }
    });
});

router.delete('/:id', function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.send('SOMETHING WENT WRONG');
        } else {
            res.redirect('/admin');
        }
    });
});

module.exports = router;
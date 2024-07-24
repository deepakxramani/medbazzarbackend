var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

/* GET home page. */
router.post('/submit_category', upload.single('picture'), function(req, res, next) {
  try {
    pool.query("INSERT INTO category (categoryname, picture) VALUES (?, ?)", [req.body.categoryname, req.file.filename], function(error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Server Error: Please contact the database administrator.' });
      } else {
        res.status(200).json({ status: true, message: 'Category submitted successfully.' });
      }
    });
  } catch (e) {
    console.log('Error:', e);
    res.status(500).json({ status: false, message: 'Server Error: Please contact the server administrator.' });
  }
});

router.post('/edit_category_data', function(req, res, next) {
  try {
    pool.query("UPDATE category SET categoryname = ? WHERE categoryid = ?", [req.body.categoryname, req.body.categoryid], function(error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Server Error: Please contact the database administrator.' });
      } else {
        res.status(200).json({ status: true, message: 'Category updated successfully.' });
      }
    });
  } catch (e) {
    console.log('Error:', e);
    res.status(500).json({ status: false, message: 'Server Error: Please contact the server administrator.' });
  }
});

router.post('/edit_category_picture', upload.single('picture'), function(req, res, next) {
  try {
    pool.query("UPDATE category SET picture = ? WHERE categoryid = ?", [req.file.filename, req.body.categoryid], function(error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Server Error: Please contact the database administrator.' });
      } else {
        res.status(200).json({ status: true, message: 'Picture updated successfully.' });
      }
    });
  } catch (e) {
    console.log('Error:', e);
    res.status(500).json({ status: false, message: 'Server Error: Please contact the server administrator.' });
  }
});

router.post('/delete_category_data', function(req, res, next) {
  try {
    pool.query("DELETE FROM category WHERE categoryid = ?", [req.body.categoryid], function(error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Server Error: Please contact the database administrator.' });
      } else {
        res.status(200).json({ status: true, message: 'Category deleted successfully.', data: result });
      }
    });
  } catch (e) {
    console.log('Error:', e);
    res.status(500).json({ status: false, message: 'Server Error: Please contact the server administrator.' });
  }
});

router.get('/display_all_category', function(req, res) {
  try {
    pool.query("SELECT * FROM category", function(error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Server Error: Please contact the database administrator.' });
      } else {
        res.status(200).json({ status: true, message: 'Success', data: result });
        console.log(result);
      }
    });
  } catch (e) {
    console.log('Error:', e);
    res.status(500).json({ status: false, message: 'Server Error: Please contact the server administrator.' });
  }
});

module.exports = router;

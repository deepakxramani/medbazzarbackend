var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/submit_user', function (req, res) {
  if (!pool) {
    console.log('DB not available, skipping query');
    return;
  }

  try {
    pool.query(
      'INSERT INTO userdata (mobileno, emailid, username, address) SELECT ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM userdata WHERE emailid = ?)',
      [
        req.body.mobileno,
        req.body.emailid,
        req.body.username,
        req.body.address,
        req.body.emailid,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({
            status: false,
            message: 'Server Error:Pls Contact Database Administrator...',
          });
        } else {
          res
            .status(200)
            .json({ status: true, message: 'Success', data: result });
        }
      },
    );
  } catch (e) {
    console.log('Error:', e);
    res.status(200).json({
      status: false,
      message: 'Server Error:Pls Contact Server Administrator...',
    });
  }
});

router.post('/edit_user_data', function (req, res) {
  if (!pool) {
    console.log('DB not available, skipping query');
    return;
  }

  try {
    pool.query(
      'UPDATE userdata SET username = ?, emailid = ?, address = ?, mobileno = ?, WHERE emailid = ?',
      [
        req.body.username,
        req.body.emailid,
        req.body.address,
        req.body.mobileno,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({
            status: false,
            message: 'Server Error:Pls Contact Database Administrator...',
          });
        } else {
          res
            .status(200)
            .json({ status: true, message: 'Details Updated!', data: result });
        }
      },
    );
  } catch (e) {
    console.log('Error:', e);
    res.status(200).json({
      status: false,
      message: 'Server Error:Pls Contact Server Administrator...',
    });
  }
});

router.post(
  '/edit_user_picture',
  upload.single('picture'),
  function (req, res, next) {
    if (!pool) {
      console.log('DB not available, skipping query');
      return;
    }

    try {
      pool.query(
        'UPDATE userdata SET picture = ? WHERE emailid = ?',
        [req.file.filename, req.body.email],
        function (error, result) {
          if (error) {
            console.log(error);
            res.status(500).json({
              status: false,
              message:
                'Server Error: Please contact the database administrator.',
            });
          } else {
            res
              .status(200)
              .json({ status: true, message: 'Picture updated successfully.' });
          }
        },
      );
    } catch (e) {
      console.log('Error:', e);
      res.status(500).json({
        status: false,
        message: 'Server Error: Please contact the server administrator.',
      });
    }
  },
);

router.post('/check_userdata', function (req, res) {
  if (!pool) {
    console.log('DB not available, skipping query');
    return;
  }

  try {
    pool.query(
      'select * from userdata where emailid=?',
      [req.body.email],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({
            status: false,
            message: 'Server Error:Pls Contact Database Administrator...',
          });
        } else {
          if (result.length >= 1) {
            res.status(200).json({
              status: true,
              message: 'User found...',
              data: result[0],
            });
          } else {
            res
              .status(200)
              .json({ status: false, message: 'User not found...', data: [] });
          }
        }
      },
    );
  } catch (e) {
    console.log('Error:', e);
    res.status(200).json({
      status: false,
      message: 'Server Error:Pls Contact Server Administrator...',
    });
  }
});

router.post('/check_user_address', function (req, res) {
  if (!pool) {
    console.log('DB not available, skipping query');
    return;
  }

  try {
    console.log('user', req.body);
    pool.query(
      'select * from address where emailid=?',
      [req.body.email],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({
            status: false,
            message: 'Server Error:Pls Contact Database Administrator...',
          });
        } else {
          if (result.length == 1) {
            res
              .status(200)
              .json({ status: true, message: 'User found...', data: result });
          } else {
            res
              .status(200)
              .json({ status: false, message: 'User not found...', data: [] });
          }
        }
      },
    );
  } catch (e) {
    console.log('Error:', e);
    res.status(200).json({
      status: false,
      message: 'Server Error:Pls Contact Server Administrator...',
    });
  }
});

router.post('/submit_user_address', function (req, res) {
  if (!pool) {
    console.log('DB not available, skipping query');
    return;
  }

  try {
    pool.query(
      'insert into address (mobileno,address,landmark,pincode,city,state) values(?,?,?,?,?,?)',
      [
        req.body.mobileno,
        req.body.address,
        req.body.landmark,
        req.body.pincode,
        req.body.city,
        req.body.state,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({
            status: false,
            message: 'Server Error:Pls Contact Database Administrator...',
          });
        } else {
          res.status(200).json({
            status: true,
            message: 'Address Submitted Sucessfully...',
          });
        }
      },
    );
  } catch (e) {
    console.log('Error:', e);
    res.status(200).json({
      status: false,
      message: 'Server Error:Pls Contact Server Administrator...',
    });
  }
});

router.post('/save_order', function (req, res, next) {
  if (!pool) {
    console.log('DB not available, skipping query');
    return;
  }

  try {
    pool.query(
      'insert into orders (userid,mobileno,emailid,orderdate,paymentstatus,paymentid) values(?,?,?,?,?,?)',
      [
        req.body.userid,
        req.body.mobileno,
        req.body.emailid,
        new Date().toString(),
        req.body.paymentstatus,
        req.body.paymentid,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({
            status: false,
            message: 'Server Error:Pls Contact Database Administrator...',
          });
        } else {
          pool.query(
            'insert into orderdetails (orderid, productdetailid, price, offerprice, qty) values ?',
            [
              req.body.orderlist?.map((item) => {
                return [
                  result.insertId,
                  item.productdetailid,
                  item.price,
                  item.offerprice,
                  item.qty,
                ];
              }),
            ],
            function (error, result) {
              if (error) {
                console.log(error);
                res.status(500).json({
                  status: false,
                  message: 'Server Error:Pls Contact Database Administrator...',
                });
              } else {
                res.status(200).json({
                  status: true,
                  message: 'Order Submitted Succesfully...',
                });
              }
            },
          );
        }
      },
    );
  } catch (e) {
    console.log('Error:', e);
    res.status(200).json({
      status: false,
      message: 'Server Error:Pls Contact Server Administrator...',
    });
  }
});

module.exports = router;

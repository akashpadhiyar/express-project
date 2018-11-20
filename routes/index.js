var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});



router.get('/category/php', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.get('/form', function(req, res, next) {
  res.render('form');
});

router.post('/formprocess', function(req, res, next) {
  console.log(req.body);
  var a = req.body.txt1;
  var b = req.body.txt2;
  console.log("A Value is " + a + "B Value is "+ b);

  var mymsg = "Hi " + a + "Contact you Age is " + b   ;

  console.log("Mymsg is " + mymsg);
  const nodemailer = require('nodemailer');
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'bh-in-29.webhostbox.net',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "xyz@akashsir.com", // generated ethereal user
            pass: "XF+Nq.9m5Hp{" // generated ethereal password
        }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"AkashSir.com" <test@akashsir.com>', // sender address
        to: 'akash.padhiyar@gmail.com', // list of receivers
        subject: 'Contact Form Request ', // Subject line
        text: "Test", // plain text body
        html:  mymsg // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });



  //res.render("abc", { title: a });



});



router.get('/fileupload', function(req, res, next) {
  res.render('fileupload');
});

router.post('/fileupload-process', function(req, res, next) {
  
  console.log(req.body);
  
  console.log(req.files.file123);

  let myfile = req.files.file123;
  let myfilename = req.files.file123.name;

  myfile.mv("public/upload/"+ myfilename, function(err) {
    if (err)
      return res.status(500).send(err);
    res.send('File uploaded!');
  });

});



router.get('/sescounter', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})


router.get('/loginform', function(req, res, next) {
  res.render('login');
});


router.post('/login-process', function(req, res, next) {
  console.log(req.body);
  var myvar1 = req.body.txt1;
  //Session Variable Name with Value
  req.session.loginname = myvar1;
  res.cookie("loginname" , myvar1);
  res.cookie("islogin" , '1');
  
  console.log(req.session);
  res.redirect("dashboard");
});

router.get('/dashboard', function(req, res, next) {

  console.log("Hi I am Dashboard");
  console.log(req.session);

  var mysessionvalue = req.session.loginname;
  if(!mysessionvalue)
  {
    res.redirect("/loginform");
  }
  res.render('dashboard', { myvalue:  mysessionvalue });
});



router.get('/logout', function(req, res) {
 
//  req.session.destroy;
  
  res.clearCookie("loginname");
  res.clearCookie("islogin");
  //res.clearCookie("islogin",{ expires: Date.now(), path: '/' });
  //res.clearCookie('loginname', { expires: new Date.now(), path: '/' });
  //res.clearCookie("islogin" ,{ expires: new Date(0), path: '/' });
  res.redirect('/loginform');
 
});

router.get('/cookie', function (req, res,next) {
  // Cookies that have not been signed
  res.cookie("CookieDemo" , 'Akash').send('Cookie is set');
  console.log('Cookies: ', req.cookies)
 })
module.exports = router;

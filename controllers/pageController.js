import Person from '../models/personModel.js';
import Room from '../models/roomModel.js';
import MenuItem from '../models/menuItemModel.js';
import nodemailer from 'nodemailer';

const getIndexPage = (req, res) => {
    res.render('home', {
      link: 'home',
    });
  };

const getAboutPage = async (req, res) => {
    try {
      const persons = await Person.find({});

      res.status(200).render('about', {
        persons,

        link: 'about',
      });
    } catch (error) {
      res.status(500).json({
        succeded: false,
        error,
      });
    }
  };

const getServicesPage = (req, res) => {
    res.render('services', {
      link: 'services',
    });
  };

const getContactPage = (req, res) => {
    res.render('contact', {
      link: 'contact',
    });
  };

  const sendMail = async (req, res) => {
    const htmlTemplate = `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Simple Transactional Email</title>
        <style>
          /* -------------------------------------
              GLOBAL RESETS
          ------------------------------------- */
          
          /*All the styling goes here*/
          
          img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%; 
          }
    
          body {
            background-color: #f6f6f6;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; 
          }
    
          table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%; }
            table td {
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top; 
          }
    
          /* -------------------------------------
              BODY & CONTAINER
          ------------------------------------- */
    
          .body {
            background-color: #f6f6f6;
            width: 100%; 
          }
    
          /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
          .container {
            display: block;
            margin: 0 auto !important;
            /* makes it centered */
            max-width: 580px;
            padding: 10px;
            width: 580px; 
          }
    
          /* This should also be a block element, so that it will fill 100% of the .container */
          .content {
            box-sizing: border-box;
            display: block;
            margin: 0 auto;
            max-width: 580px;
            padding: 10px; 
          }
    
          /* -------------------------------------
              HEADER, FOOTER, MAIN
          ------------------------------------- */
          .main {
            background: #ffffff;
            border-radius: 3px;
            width: 100%; 
          }
    
          .wrapper {
            box-sizing: border-box;
            padding: 20px; 
          }
    
          .content-block {
            padding-bottom: 10px;
            padding-top: 10px;
          }
    
    
        </style>
      </head>
      <body>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
          <tr>
            <td>&nbsp;</td>
            <td class="container">
              <div class="content">
    
                <!-- START CENTERED WHITE CONTAINER -->
                <table role="presentation" class="main">
    
                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <p>Email: ${req.body.email}</p>
                            <p>Name: ${req.body.name}</p>
                            <p>Message: ${req.body.message}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                <!-- END MAIN CONTENT AREA -->
                </table>
                <!-- END CENTERED WHITE CONTAINER -->
    
    
              </div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>
    `;
  
    try {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.NODE_MAIL, // generated ethereal user
          pass: process.env.NODE_PASS, // generated ethereal password
        },
      });
  
      // send mail with defined transport object
      await transporter.sendMail({
        to: 'otelprojesi123@outlook.com', // list of receivers
        subject: `MAIL FROM ${req.body.email}`, // Subject line
        html: htmlTemplate, // html body
      });
  
      res.status(200).json({ succeeded: true });
    } catch (error) {
      console.error('E-posta gönderilirken hata oluştu:', error); // Hatanın ayrıntısını loglayın
      res.status(500).json({
        succeeded: false,
        error: error.message, // Hata mesajını yanıt olarak gönderin
      });
    }    
  };

const getRoomsPage = async (req, res) => {
    try {
      const rooms = await Room.find({});

      res.status(200).render('rooms', {
        rooms,

        link: 'rooms',
      });
    } catch (error) {
      res.status(500).json({
        succeded: false,
        error,
      });
    }
  };

const getOurTeamPage = async (req, res) => {
    try {
      const persons = await Person.find({});

      res.status(200).render('ourTeam', {
        persons,

        link: 'ourTeam',
      });
    } catch (error) {
      res.status(500).json({
        succeded: false,
        error,
      });
    }
  };

const getMenusPage = async (req, res) => {
    try {
      const menus = await MenuItem.find({});

      res.status(200).render('menus', {
        menus,

        link: 'menus',
      });
    } catch (error) {
      res.status(500).json({
        succeded: false,
        error,
      });
    }
  };

  export {
    getIndexPage,
    getAboutPage,
    getServicesPage,
    getContactPage,
    sendMail,
    getRoomsPage,
    getOurTeamPage,
    getMenusPage
  };
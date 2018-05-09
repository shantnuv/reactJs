import express from 'express';
import connection from '../connection';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', (req,res) => {
  const { credentials } = req.body;
  const sql = `SELECT password from user_master where email_id = '${credentials.email}'`;

  connection.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    if (rows[0].password === credentials.password) {
      res.json({user: toAuthJson(credentials.email)})
    } else {
      res.status(400).json({errors: {global: 'Invalid credentails'}});
    }
  });
});

const generateJWT = (email) => {
  return jwt.sign({
      email: email,
    },
    process.env.JWT_SECTET
  );
};

const toAuthJson = (email)=> {
  return {
    email: email,
    token: generateJWT(email),
  }
};

export default router;

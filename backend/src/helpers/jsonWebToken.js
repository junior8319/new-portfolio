const jwt = require('jsonwebtoken');
const fs = require('fs');

const secretKey = fs.readFileSync('jwt.evaluation.key', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
  return data;
});

const generateToken = async (user) => {
  const token = await jwt.sign(user, secretKey, { expiresIn: '24h' });

  return token;
};

const verifyToken = async (token) => {
  const decoded = await jwt.verify(token, secretKey);
  console.log(decoded);

  return decoded;
};

module.exports = {
  generateToken,
  verifyToken,
};
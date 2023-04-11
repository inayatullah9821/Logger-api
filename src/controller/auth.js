const joi = require('joi');
const bcrypt = require('bcrypt');
const dbUser = require('../repository/dbUsers');
const { generateToken } = require('../helpers/helpers');

exports.login = async (req, res) => {
  try {
    const { error, value } = joi.object({
      email: joi.string()
        .email()
        .required()
        .error(new Error('Please enter valid email.')),
        password: joi.string()
        .required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .error(new Error('Password must contain atleast one lowercase, uppercase, one number and a special character')),
    }).validate(req.body);

    if (error) {
      return res.status(400).send({
        error: error.message,
      })
    }

    const { email, password } = value;
    const userExist = await dbUser.findOne({ email });

    if (!userExist) {
      return res.status(404).send({
        error: 'Email not found.',
      });
    }
    const checkPassword = await bcrypt.compare(password, userExist.password);
    if (!checkPassword) {
      return res.status(401).send({ error: 'Please Enter valid Password' });
    }
    const { _id, role } = userExist;
    const token = await generateToken({ _id, email, role });
    return res.status(200).send({
      message: `Welcome ${userExist.name} You are logged In.`,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

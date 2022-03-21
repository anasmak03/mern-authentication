const  User  = require('../model/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async (req,res) => {
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ error: "email was already exist " })
      }
  
      const hashedPassword = await bcrypt.hash(password, 10)
      user = new User({  email, password: hashedPassword })
      await user.save()
      res.status(201).send({ message: "User created successfully" })
    } catch (err) {
      console.log(err)
    }
}

exports.login = async (req,res) => {
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ error: "Invalid Credentials" })
      }
      const isMatched = await bcrypt.compareSync(password, user.password)
      if (!isMatched) {
        return res.status(400).json({ error: "Invalid Credentials" })
      }
      const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      })
      res.json({ token })
    } catch (err) {
      console.log(err)
    }


}



const User = require('../../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = {
    register: async (req, res) => {
        const { email, user_name, password } = req.body;
        try {
            let userEmail = await User.findOne( { email });
            let userName = await User.findOne({ user_name });
            if(userEmail) {
                return res.status(400).json({ errors: 'Email already exists' })
            }
            if(userName) {
                return res.status(400).json({ errors: 'Username already exists' })
            }
            const newUser = new User({
                email, user_name, password
            })
            await newUser.save();
            res.json({ msg: 'Successfully registered' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },
    login: async (req, res) => {
        const {email, password} = req.body;
        try {
            let user = await User.findOne({ email });
            if(!user) {
                return res.status(400).json({ errors: 'Incorrect Email' });
            }
            if(user.password !== password) {
                return res.status(400).json({ errors: 'Incorrect Password' });
            }
            //jwt token
          const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 }, (err, token) => {
                if(err) throw err;
                res.json({ token });
            });
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}



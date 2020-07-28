const User = require('../../models/User');
const passport = require('passport');
// const express = require('express');
// const router = express.Router();

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
    }
}



// module.exports = {
//     register: async (req, res) => {
//         const { email, user_name, password } = req.body;
//         try {
//             const user = new User({
//                 email, user_name, password
//             });
//             await user.save();
//             res.json({ msg: 'Successfully registered' });
//         } catch (err) {
//             console.error(err.message);
//             res.status(500).send('Server error');
//         }
//     }
// }


import { checks } from "../constant/pswdAuthData.js";
import { User } from "../schema/UserDetails.js";
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcrypt';

export const ForgotUsername = async (req, res) => {
    try {
        const { UserName, Password } = req.body;
        console.log(UserName, Password)
        // Validate the current password format
        const errors = checks
            .filter(check => !check.regex.test(Password))
            .map(check => check.message);
    
        if (errors.length > 0) {
            throw new ApiError(400, `Password must contain ${errors.join(', ')}.`);
        }
      
        const user = await User.findOne({ UserName });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(Password, 10);
            console.log(hashedNewPassword);
        // Update the user's password
        const updatedUser = await User.findOneAndUpdate(
            { UserName },
            { Password: hashedNewPassword },
            { new: true } // Option to return the updated document
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found or password not updated' });
        }
        console.log(updatedUser);
        // Return a success message
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error', error });
    }
};

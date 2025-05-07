const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    // Fetch all users but exclude password field for security
    const users = await User.find({}, { password: 0 });
    
    // Add last login information (this would normally come from a user session or activity log)
    // For now, we'll add mock last login dates
    const usersWithLastLogin = users.map(user => {
      // Convert Mongoose document to plain object
      const userObj = user.toObject();
      
      // Add a random last login date within the last month
      const now = new Date();
      const randomDaysAgo = Math.floor(Math.random() * 30); // Random number between 0 and 30
      const lastLogin = new Date(now);
      lastLogin.setDate(now.getDate() - randomDaysAgo);
      
      // Add status (active/inactive) based on last login
      // If login was within last 7 days, user is active
      const status = randomDaysAgo <= 7 ? 'active' : 'inactive';
      
      return {
        ...userObj,
        lastLogin: lastLogin.toISOString().split('T')[0], // Format as YYYY-MM-DD
        status
      };
    });
    
    res.json(usersWithLastLogin);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

// GET a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Add mock last login and status
    const now = new Date();
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const lastLogin = new Date(now);
    lastLogin.setDate(now.getDate() - randomDaysAgo);
    const status = randomDaysAgo <= 7 ? 'active' : 'inactive';
    
    const userWithExtras = {
      ...user.toObject(),
      lastLogin: lastLogin.toISOString().split('T')[0],
      status
    };
    
    res.json(userWithExtras);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: error.message
    });
  }
});

// POST create a new user
router.post('/', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists'
      });
    }
    
    // Create new user
    const newUser = new User({
      username,
      password, // Will be hashed by the pre-save hook in the User model
      role: role || 'admin' // Default role
    });
    
    const savedUser = await newUser.save();
    
    // Return user without password
    const userResponse = {
      _id: savedUser._id,
      username: savedUser.username,
      role: savedUser.role
    };
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create user',
      error: error.message
    });
  }
});

// PUT update a user
router.put('/:id', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const updateData = {};
    
    if (username) updateData.username = username;
    if (password) updateData.password = password;
    if (role) updateData.role = role;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true, select: '-password' }
    );
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update user',
      error: error.message
    });
  }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message
    });
  }
});

module.exports = router;

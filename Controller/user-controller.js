const User = require('./models/User');
// Implement your controller functions for users here
const userController = {
    // Controller functions for API routes
    getAllUsers: async (req, res) => {
        try {
          const users = await User.find();
          res.status(200).json(users);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error getting users' });
        }
      },
    
  
      getUserById: async (req, res) => {
        try {
          const userId = req.params.id;
          const user = await User.findById(userId).populate('thoughts friends');
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.status(200).json(user);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error getting user' });
        }
      },
  
      createUser: async (req, res) => {
        try {
          const { username, email } = req.body;
          
          // Implement the creation of a new user using the User model
          const newUser = await User.create({ username, email });
          
          res.status(201).json(newUser);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error creating user' });
        }
      },
  
      updateUser: async (req, res) => {
        try {
          const userId = req.params.id;
          const updatedUserData = req.body;
          
          // Implement updating a user by ID using the User model
          const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
          
          if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
    
          res.status(200).json(updatedUser);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error updating user' });
        }
      },
    
  
      deleteUser: async (req, res) => {
        try {
          const userId = req.params.id;
    
          // Implement deleting a user by ID using the User model
          const deletedUser = await User.findByIdAndDelete(userId);
    
          if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
    
          // Bonus: Remove the user's associated thoughts
          await Thought.deleteMany({ username: deletedUser.username });
    
          res.status(200).json({ message: 'User deleted' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error deleting user' });
        }
      },
  
      addFriend: async (req, res) => {
        try {
          const userId = req.params.userId;
          const friendId = req.params.friendId;
    
          // Implement adding a friend to a user's friend list using the User model
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { new: true }
          );
    
          if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
    
          res.status(200).json(updatedUser);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error adding friend' });
        }
      },
  
      removeFriend: async (req, res) => {
        try {
          const userId = req.params.userId;
          const friendId = req.params.friendId;
    
          // Implement removing a friend from a user's friend list using the User model
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { new: true }
          );
    
          if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
    
          res.status(200).json(updatedUser);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error removing friend' });
        }
      },

  deleteReaction: async (req, res) => {
    try {
      const userId = req.params.userId;
      const reactionIdToDelete = req.params.reactionId;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { reactions: { reactionId: reactionIdToDelete } } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting reaction' });
    }
  }
};

module.exports = userController;
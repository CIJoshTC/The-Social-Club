const Thought = require('../Models/Thought');
// Implement your controller functions for thoughts here
const thoughtController = {
    getAllThoughts: async (req, res) => {
      try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting thoughts' });
      }
    },
  
    getThoughtById: async (req, res) => {
        try {
          const thoughtId = req.params.id;
          const thought = await Thought.findById(thoughtId).populate('reactions');
          if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
          res.status(200).json(thought);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error getting thought' });
        }
      },
    
  
      createThought: async (req, res) => {
        try {
          const { thoughtText, username } = req.body;
    
          // Implement the creation of a new thought using the Thought model
          const newThought = await Thought.create({ thoughtText, username });
    
          res.status(201).json(newThought);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error creating thought' });
        }
      },
  
      updateThought: async (req, res) => {
        try {
          const thoughtId = req.params.id;
          const updatedThoughtData = req.body;
    
          // Implement updating a thought by ID using the Thought model
          const updatedThought = await Thought.findByIdAndUpdate(thoughtId, updatedThoughtData, { new: true });
    
          if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
    
          res.status(200).json(updatedThought);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error updating thought' });
        }
      },
  
      deleteThought: async (req, res) => {
        try {
          const thoughtId = req.params.id;
    
          // Implement deleting a thought by ID using the Thought model
          const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    
          if (!deletedThought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
    
          res.status(200).json({ message: 'Thought deleted' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error deleting thought' });
        }
      },

     createReaction: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const { reactionBody, username } = req.body;

      // Create a new reaction object
      const newReaction = {
        reactionBody,
        username
      };

      // Find the thought by ID and push the new reaction to its reactions array
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: newReaction } },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.status(201).json(updatedThought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating reaction' });
    }
  },


    deleteReaction: async (req, res) => {
        try {
          const thoughtId = req.params.thoughtId;
          const reactionIdToDelete = req.params.reactionId;
    
          const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { reactionId: reactionIdToDelete } } },
            { new: true }
          );
    
          if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
    
          res.status(200).json(updatedThought);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error deleting reaction' });
        }
      }
    }
    ;
    
    module.exports = thoughtController;
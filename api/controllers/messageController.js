import Message from "../models/Message.js"

export const sendMessage = async (req, res) => {
    try {
      const {content,receiverId}  =  req.body
       
      const newMessage = await Message.create({
        sender:  req.user.id,
        reveicer: reveicerId,
        content  
      })

      res.status(201).json({
        success: true,
        message: newMessage,
      });
    } catch (error) {
        console.log("Error in sendMessage: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        
    }
}

export const getConversation = async (req, res) => {
   const {UserId} = req.params;
    try {
      const messages = await Message.find({
        $or: [
        {sender: req.user._id, receiver: userId},
        {sender: userId, receiver: req.user_id}
        ]
      }).sort("createdAt") 
      
      res.status(200).json({
        success: true,
        messages,
      })
        
    } catch (error) {
        console.log("Error in getConversation: ", error);
        res.status(500).json({
            success: false,
            message: "internal server error",
        })
        
    }
}


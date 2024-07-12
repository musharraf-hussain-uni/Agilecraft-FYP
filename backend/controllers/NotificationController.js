import Notice from "../schema/Notify.js";

export const GetAllNotification = async (req, res) => {
  try {
    const userId = req.user;
    // console.log("Notification", userId);
    const notice = await Notice.find({
      team: userId,
      isRead: { $ne: userId } , // Get unread notifications only && []
    }).populate("projects", "title"); // Populate additional project fields

    // const notice = await Notice.find();
    // if (!notice) res.status(404).json("No Code Reviews available!");

    // console.log(notice);
    res.status(201).json(notice);
  } catch (error) {
    return res.status(501).json("Internal Server Error.");
  }
};

// Mark a notification as read by adding the

export const markNotificationRead = async (req, res) => {
  try {
    const userId = req.user;
    const { isReadType, id } = req.body;

    if (isReadType === "all") {
      await Notice.updateMany(
        { team: userId, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } },
        { new: true }
      );
    } else {
      await Notice.findOneAndUpdate(
        { _id: id, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } },
        { new: true }
      );
    }

    res.status(201).json({ status: true, message: "Done" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

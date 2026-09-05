export const getApplications = (req, res) => { 
    const userID = req.user.userId;
    console.log(userID);
    return res.status(200).json("hi");
}
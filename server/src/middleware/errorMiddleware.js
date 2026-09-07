//only for learning i don't want to use it in app altest not now 

export const errorMiddleware = (err, req, res, next) => { 
    console.log(err);
    res.status(500).json({ message: "Something went wrong" })
    
}

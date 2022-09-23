module.exports = (app) => {
    app.get("/", (req, res)=>{
        res.send("Connectogram ACOC Backend Server is Opened. by K.S 20220923");
    })
}
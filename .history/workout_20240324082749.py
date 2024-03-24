app.post("/api/create-workout", async(req, res)=>{
    console.log(req.body); // Log the raw request body
    const {name, user, workouts} = req.body;
    console.log(req.body);
    try{
        await Workout.create({
            name,
            user,
            workouts
        });
        res.status(201).send("Workout created successfully.");
    } catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

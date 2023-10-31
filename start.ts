import express, {Application} from "express"
import mainApp from "./mainApp"

const port:number=5000 
const app: Application= express()

app.use(express.json())

mainApp(app)
const server =app.listen(port, ()=>{
    console.log();
    console.log(`server is now connection`)
});

// console.timeEnd("start server")

process.on ("uncaughtException", (error: Error)=>{
    console.log("uncaughtException:", error);

    process.exit(1);
});

process.on("rejectionHandled", (reason: any)=>{
    console.log("rejectionHandled:", reason); 

    server.close(()=>{
        process.exit(1)
    })
})
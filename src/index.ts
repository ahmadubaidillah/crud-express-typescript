import express,{Request,Response} from 'express';
import router from './routes/Routes'; 
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
    return res.status(200).send({
      response: "coba typescript",
    });
  });
app.use(router)
app.listen(process.env.APP_PORT,()=>{
    console.log((`${process.env.APP_NAME} listening on port : ${process.env.APP_PORT}`))
})
/* Import packages */
import express from 'express';
import userRoute from './routes/user.route';
import diaryRoutes from './routes/diary.route';

const app = express();

const port = process.env.PORT || 2000;

app.use(express.json());

app.use( '/api/v1', userRoute, diaryRoutes );
app.get( '/', (req,res) =>
{
  res.status( 200 ).json( { message:'welcome to my diary '} );
})

app.listen(port, () => process.stdout.write(`Server is running on http://localhost:${port}`));

export default app;

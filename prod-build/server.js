import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.resolve(process.cwd(), '../client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), '../client/build/index.html'));
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening to PORT::${process.env.PORT}`)
})

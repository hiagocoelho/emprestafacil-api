import express from 'express';
import status from 'http-status';
import sequelize from './database/database';
import loanRouter from './routers/loanRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', loanRouter);

app.use((req,res) => {
    res.status(status.NOT_FOUND).send("Page not found.");
});

sequelize.sync({force: false}).then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`The server is up and running on port (${PORT})`);
    });
});

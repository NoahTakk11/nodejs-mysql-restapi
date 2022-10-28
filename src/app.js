import express from 'express';
import morgan from 'morgan';

import employeesRoutes from './routes/employees.routes.js';
import indexRoutes from './routes/index.routes.js';



const app = express();

//settings
app.use(express.json());

//middleware
app.use(morgan('combined'));

//routes
app.use(indexRoutes);
app.use('/api', employeesRoutes);

app.use((req, res, next) => {

    res.status(404).json({ message: 'endpoint not found' });

});

export default app;
import { PORT } from './config.js';
import app from './app.js';




//starting server
app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
})
import app from './app.js';
import connectDB from './database.js';

app.listen(app.get('port'), ()=> { 
    console.log(`El servidor esta en funcionamiento => http://localhost:${app.get('port')}/`)
});

connectDB();

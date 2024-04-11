const express = require('express');
const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');

const app = express();
const port = 8080;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);

app.listen(port, () => {
	console.log(`Server is Running on port ${port}`);
});

require('dotenv').config({ path: '.env' });
const path = require('path');

const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const postsRoutes = require('./src/routes/postsRoutes');
const commentsRoutes = require('./src/routes/commentsRoutes');
const PORT = process.env.PORT || 8090;

const app = express();

app.use(cors());
// let corsOptions = {
// 	origin: 'https://www.domain.com',
// 	credentials: true
// }
// app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);

// React Server
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server is Running on port ${PORT}`);
});

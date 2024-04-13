require('dotenv').config({ path: '.env.dev' });

const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const postsRoutes = require('./src/routes/postsRoutes');
const commentsRoutes = require('./src/routes/commentsRoutes');
const PORT = 8080;

const app = express();

// let corsOptions = {
// 	origin: 'https://www.domain.com',
// 	credentials: true
// }
// app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);

app.listen(PORT, () => {
	console.log(`Server is Running on port ${PORT}`);
});

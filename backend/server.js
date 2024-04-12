const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
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
app.use('/api/content', contentRoutes);

app.listen(PORT, () => {
	console.log(`Server is Running on port ${PORT}`);
});

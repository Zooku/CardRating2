module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'https://card-rating2-o9k1ycggc-zacquiri.vercel.app'); // Replace with your frontend's domain
    // ...
  try {
    const data = await fs.readFile('number.json', 'utf-8');
    const number = JSON.parse(data).number;
    res.json({ number });
  } catch (error) {
    console.error('Error reading number:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

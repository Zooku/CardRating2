module.exports = async (req, res) => {
    const newNumber = req.body.number;
    if (newNumber >= 0 && newNumber <= 9) {
      try {
        await fs.writeFile('number.json', JSON.stringify({ number: newNumber }));
        res.sendStatus(200);
      } catch (error) {
        console.error('Error updating number:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.status(400).json({ error: 'Invalid number' });
    }
  };
  
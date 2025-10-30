const intializeDb = require('./db');

(async () => {
  try {
    const db = await intializeDb();
    await db.run('DROP TABLE IF EXISTS cart;');
    console.log('✅ Cart table dropped successfully');
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
})();

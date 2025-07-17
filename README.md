
const token = Buffer.from(`${process.env.TUNIMATEC_NAV_USERNAME}:${process.env.TUNIMATEC_NAV_PASSWORD}`).toString('base64');

{
        headers: {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json'
        }
      }
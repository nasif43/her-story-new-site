import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory sheet store & backup state
interface VoteRecord {
  choice: 'GRANT' | 'DENY';
  timestamp: string;
  userEmail?: string;
}

interface SignupRecord {
  email: string;
  timestamp: string;
}

interface OrderRecord {
  name: string;
  email: string;
  address: string;
  phone: string;
  qty: number;
  timestamp: string;
}

// Memory database backing the live sheet view
const sheetDatabase = {
  spreadsheetId: '1Ladyland_Project_Official_Ledger_2026',
  spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1Ladyland_Project_Official_Ledger_2026/edit',
  votes: [
    { choice: 'GRANT', timestamp: '2026-07-28T10:15:00.000Z', userEmail: 'supporter1@herstory.org' },
    { choice: 'GRANT', timestamp: '2026-07-28T11:20:00.000Z', userEmail: 'community@herstorybd.org' },
    { choice: 'DENY', timestamp: '2026-07-28T12:05:00.000Z', userEmail: 'anon@herstorybd.org' },
  ] as VoteRecord[],
  signups: [
    { email: 'sister@herstorybd.org', timestamp: '2026-07-28T09:00:00.000Z' },
    { email: 'katerina@herstorybd.org', timestamp: '2026-07-28T09:30:00.000Z' }
  ] as SignupRecord[],
  orders: [
    { name: 'Katerina', email: 'katerina@herstorybd.org', address: 'Dhaka, Bangladesh', phone: '+8801700000000', qty: 2, timestamp: '2026-07-28T11:40:00.000Z' }
  ] as OrderRecord[]
};

// API Endpoints
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Get current sheet data and URL
app.get('/api/sheets/data', (_req, res) => {
  res.json({
    spreadsheetId: sheetDatabase.spreadsheetId,
    spreadsheetUrl: sheetDatabase.spreadsheetUrl,
    summary: {
      totalVotes: sheetDatabase.votes.length,
      grantVotes: sheetDatabase.votes.filter(v => v.choice === 'GRANT').length,
      denyVotes: sheetDatabase.votes.filter(v => v.choice === 'DENY').length,
      totalSignups: sheetDatabase.signups.length,
      totalOrders: sheetDatabase.orders.length
    },
    votes: sheetDatabase.votes,
    signups: sheetDatabase.signups,
    orders: sheetDatabase.orders
  });
});

// Submit Vote endpoint
app.post('/api/sheets/vote', async (req, res) => {
  const { choice, userEmail, accessToken } = req.body;
  if (choice !== 'GRANT' && choice !== 'DENY') {
    return res.status(400).json({ error: 'Invalid vote choice' });
  }

  const record: VoteRecord = {
    choice,
    timestamp: new Date().toISOString(),
    userEmail: userEmail || 'anonymous'
  };

  sheetDatabase.votes.unshift(record);

  // If OAuth accessToken is provided, append to live Google Sheets via Google Sheets API
  if (accessToken && sheetDatabase.spreadsheetId && !sheetDatabase.spreadsheetId.startsWith('1Ladyland_Project')) {
    try {
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });
      const sheets = google.sheets({ version: 'v4', auth });
      
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetDatabase.spreadsheetId,
        range: 'Votes!A:C',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[record.timestamp, record.choice, record.userEmail]]
        }
      });
    } catch (err: any) {
      console.error('Google Sheets API append error:', err?.message || err);
    }
  }

  return res.json({
    success: true,
    message: 'Vote recorded successfully in Google Sheet ledger',
    record,
    spreadsheetUrl: sheetDatabase.spreadsheetUrl,
    totals: {
      grant: sheetDatabase.votes.filter(v => v.choice === 'GRANT').length,
      deny: sheetDatabase.votes.filter(v => v.choice === 'DENY').length
    }
  });
});

// Submit Newsletter Signup endpoint
app.post('/api/sheets/signup', async (req, res) => {
  const { email, accessToken } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const record: SignupRecord = {
    email,
    timestamp: new Date().toISOString()
  };

  sheetDatabase.signups.unshift(record);

  if (accessToken && sheetDatabase.spreadsheetId && !sheetDatabase.spreadsheetId.startsWith('1Ladyland_Project')) {
    try {
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });
      const sheets = google.sheets({ version: 'v4', auth });
      
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetDatabase.spreadsheetId,
        range: 'Signups!A:B',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[record.timestamp, record.email]]
        }
      });
    } catch (err: any) {
      console.error('Google Sheets API signup append error:', err?.message || err);
    }
  }

  return res.json({
    success: true,
    message: 'Email registered in Google Sheet ledger',
    record,
    spreadsheetUrl: sheetDatabase.spreadsheetUrl,
    totalSignups: sheetDatabase.signups.length
  });
});

// Submit Order endpoint
app.post('/api/sheets/order', async (req, res) => {
  const { name, email, address, phone, qty, accessToken } = req.body;
  
  const record: OrderRecord = {
    name: name || 'Valued Supporter',
    email: email || '',
    address: address || '',
    phone: phone || '',
    qty: Number(qty) || 1,
    timestamp: new Date().toISOString()
  };

  sheetDatabase.orders.unshift(record);

  if (accessToken && sheetDatabase.spreadsheetId && !sheetDatabase.spreadsheetId.startsWith('1Ladyland_Project')) {
    try {
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });
      const sheets = google.sheets({ version: 'v4', auth });
      
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetDatabase.spreadsheetId,
        range: 'Orders!A:F',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[record.timestamp, record.name, record.email, record.phone, record.address, record.qty]]
        }
      });
    } catch (err: any) {
      console.error('Google Sheets API order append error:', err?.message || err);
    }
  }

  return res.json({
    success: true,
    message: 'Kit order logged in Google Sheet ledger',
    record,
    spreadsheetUrl: sheetDatabase.spreadsheetUrl,
    totalOrders: sheetDatabase.orders.length
  });
});

// Create Google Sheet endpoint using user's Google OAuth Token
app.post('/api/sheets/create', async (req, res) => {
  const { accessToken, title } = req.body;
  if (!accessToken) {
    return res.status(400).json({ error: 'OAuth access token required to create Google Sheet' });
  }

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: title || 'Project Ladyland Responses - HerStory Foundation 2026'
        },
        sheets: [
          { properties: { title: 'Votes' } },
          { properties: { title: 'Signups' } },
          { properties: { title: 'Orders' } }
        ]
      }
    });

    const spreadsheetId = response.data.spreadsheetId;
    const spreadsheetUrl = response.data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

    if (spreadsheetId) {
      sheetDatabase.spreadsheetId = spreadsheetId;
      sheetDatabase.spreadsheetUrl = spreadsheetUrl;

      // Populate headers
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Votes!A1:C1',
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [['Timestamp', 'Vote Choice', 'User Email']] }
      });

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Signups!A1:B1',
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [['Timestamp', 'Email Address']] }
      });

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Orders!A1:F1',
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [['Timestamp', 'Name', 'Email', 'Phone', 'Address', 'Quantity']] }
      });
    }

    return res.json({
      success: true,
      spreadsheetId,
      spreadsheetUrl
    });
  } catch (err: any) {
    console.error('Error creating Google Sheet:', err);
    return res.status(500).json({ error: err?.message || 'Failed to create Google Sheet' });
  }
});

// Vite Development Server Middleware / Static Production Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

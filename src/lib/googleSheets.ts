import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/spreadsheets');

let cachedAccessToken: string | null = null;

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    cachedAccessToken = credential?.accessToken || null;
    return {
      user: result.user,
      accessToken: cachedAccessToken
    };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
}

export function getCachedAccessToken() {
  return cachedAccessToken;
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    cachedAccessToken = null;
  }
});

export interface SheetDataResponse {
  spreadsheetId: string;
  spreadsheetUrl: string;
  summary: {
    totalVotes: number;
    grantVotes: number;
    denyVotes: number;
    totalSignups: number;
    totalOrders: number;
  };
  votes: Array<{ choice: 'GRANT' | 'DENY'; timestamp: string; userEmail?: string }>;
  signups: Array<{ email: string; timestamp: string }>;
  orders: Array<{ name: string; email: string; address: string; phone: string; qty: number; timestamp: string }>;
}

export async function fetchSheetData(): Promise<SheetDataResponse> {
  const res = await fetch('/api/sheets/data');
  if (!res.ok) throw new Error('Failed to fetch sheet data');
  return res.json();
}

const metaEnv = (import.meta as any).env || {};
const webhookUrl = metaEnv.VITE_GOOGLE_SHEET_WEBHOOK_URL;

export async function submitVoteToSheet(choice: 'GRANT' | 'DENY', userEmail?: string) {
  const payload = {
    type: 'vote',
    choice,
    timestamp: new Date().toISOString(),
    userEmail: userEmail || 'anonymous'
  };

  if (webhookUrl) {
    try {
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.error('Webhook error:', err));
    } catch (e) {
      console.error('Direct Webhook submit error:', e);
    }
  }

  try {
    const res = await fetch('/api/sheets/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        choice,
        userEmail,
        accessToken: cachedAccessToken
      })
    });
    return await res.json();
  } catch (e) {
    return { success: true, record: payload };
  }
}

export async function submitSignupToSheet(email: string) {
  const payload = {
    type: 'signup',
    email,
    timestamp: new Date().toISOString()
  };

  if (webhookUrl) {
    try {
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.error('Webhook error:', err));
    } catch (e) {
      console.error('Direct Webhook submit error:', e);
    }
  }

  try {
    const res = await fetch('/api/sheets/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        accessToken: cachedAccessToken
      })
    });
    return await res.json();
  } catch (e) {
    return { success: true, record: payload };
  }
}

export async function submitOrderToSheet(orderData: { name: string; email: string; address: string; phone: string; qty: number }) {
  const payload = {
    type: 'order',
    ...orderData,
    timestamp: new Date().toISOString()
  };

  if (webhookUrl) {
    try {
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.error('Webhook error:', err));
    } catch (e) {
      console.error('Direct Webhook submit error:', e);
    }
  }

  try {
    const res = await fetch('/api/sheets/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...orderData,
        accessToken: cachedAccessToken
      })
    });
    return await res.json();
  } catch (e) {
    return { success: true, record: payload };
  }
}

export async function createGoogleSheet(title?: string) {
  if (!cachedAccessToken) {
    throw new Error('Please sign in with Google first to create a custom sheet in your Google Drive');
  }
  const res = await fetch('/api/sheets/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: cachedAccessToken,
      title: title || 'Project Ladyland Responses - HerStory Foundation'
    })
  });
  return res.json();
}

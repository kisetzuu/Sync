import * as admin from 'firebase-admin';
import serviceAccount from '../lib/hostingtest-aadc2-firebase-adminsdk-s9rmc-a75b9b5849.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: "hostingtest-aadc2.appspot.com"
  });
}

export default admin;
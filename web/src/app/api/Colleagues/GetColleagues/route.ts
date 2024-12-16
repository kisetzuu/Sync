import { db, auth } from "@/lib/Firebase/_index";
import { DocumentReference } from "firebase-admin/firestore";
import { collection } from "firebase/firestore";

interface Colleague {
    uid: string;
    displayName: string;
    displayPicture: string;
}

export async function GET(req: Request) {
    try {
        const userId = req.headers.get('x-user-id');
        if (!userId) {
            return new Response(JSON.stringify({ error: 'User ID is missing' }), { status: 400 });
        }

        const userRef = db.collection('users').doc(userId);

        const colleagueUIDs = await fetchColleaguesUIDs(userRef);
        if (!colleagueUIDs || colleagueUIDs.length === 0) {
            return new Response(JSON.stringify({ error: 'No colleagues found' }), { status: 404 });
        }

        const colleagues = await Promise.all(
            colleagueUIDs.map((uid) => fetchColleagueBaseDetails(uid))
        );

        return new Response(JSON.stringify({ colleagues: colleagues.filter(Boolean) }), { status: 200 });
    } catch (error) {
        console.error("Error fetching colleagues:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch colleagues' }), { status: 500 });
    }
}

async function fetchColleaguesUIDs(userRef: DocumentReference): Promise<string[] | null> {
    try {
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            console.error("User document does not exist.");
            return null;
        }

        const colleagueRefs: DocumentReference[] = userDoc.get('colleagueUIDs');
        return colleagueRefs.map((ref) => ref.id);
    } catch (error) {
        console.error("Error fetching colleagues UIDs:", error);
        return null;
    }
}

async function fetchColleagueBaseDetails(uid: string): Promise<Colleague | null> {
    try {
        const user = await auth.getUser(uid);
        const userCredDocRef = db.collection('userCredentials').doc(uid);
        const userCredSnapshot = await userCredDocRef.get();

        let displayName = ''
        let displayPicture = ''

        if (userCredSnapshot.exists) {
            const userCredData = userCredSnapshot.data();
            displayName = userCredData?.name;
            displayPicture = userCredData?.displayPicture
        }

        displayName = displayName || user.displayName || `User (${user.email})`
        displayPicture = displayPicture || user.photoURL || 'https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301'

        return {
            uid: user.uid,
            displayName,
            displayPicture
        };
    } catch (error) {
        console.error('Error fetching colleague details:', error);
        return null;
    }
}

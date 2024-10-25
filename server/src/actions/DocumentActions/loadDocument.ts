import { bucket } from "../../lib/Firebase/_index"

export const loadDocument = async (fileName: string): Promise<string | null> => {
    const file = bucket.file(`documents/${fileName}.html`);

    try {
        const [contents] = await file.download();
        console.log(contents.toString('utf-8'))
        return contents.toString('utf8');
    } catch (error) {
        console.error('Error loading document:', error);
        return null;
    }
}

import {supabaseClient} from "../clientProvider.ts";


export class imageServerApi {

    static async uploadImage(file: File): Promise<string | null> {

        const date = Date.now().toString();
        const { data, error } = await supabaseClient.storage.from('images').upload(`public/${date}${file.name}`, file);

        if (error) {
            console.error("Error uploading image:", error.message);
            return null;
        }

        return data.path;
    }

    static async getImageUrl(path: string): Promise<string | null> {
        const { data } = supabaseClient.storage.from('images').getPublicUrl(path);

        if (!data.publicUrl) {
            console.error("Error getting image URL:");
            return null;
        }

        return data.publicUrl;
    }
}
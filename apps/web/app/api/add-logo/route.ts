import { NextResponse } from "next/server";
import sharp from 'sharp';
import fs from 'fs';



/**
 * @name POST
 * @description POST handler for the webhook route that handles the webhook event
 */
export async function POST(req: Request) {
    try {


        const request = await req.formData();
        const openAiImageUrl = request.get('openAiImageUrl');
        const logoSrc = request.get('logoSrc');

        const logoFile = logoSrc as File;
        const fileBuffer = await logoFile.arrayBuffer();
        const array = new Uint8Array(fileBuffer)
        if (!openAiImageUrl || !logoSrc) {
            return NextResponse.json({ type: "provide sources" });
        }

        try {

            const openAiImageResponse = await fetch(openAiImageUrl as string);
            const openAiImage = await openAiImageResponse.arrayBuffer();

            const logo = await sharp(array)
                .resize({ width: 250 })
                .toBuffer();
            const outputBuffer = await sharp(openAiImage)
                .composite([{ input: logo, top: 50, left: 50 }])
                .toBuffer();
            return new Response(outputBuffer, { status: 200 });

        } catch (error) {
            console.error('Error processing image:', error);
            return NextResponse.json({ type: "error1" });
        }

    } catch (error) {
        return NextResponse.json({ type: "something went wrong" }); // return the response from Replicate
    }
}

import { NextResponse } from "next/server";
import Replicate from "replicate";

const token = 'r8_Lf7cp0SEaLpLVbWlEZYXZXbFU1r1JVo1xrm8G';

const replicate = new Replicate({
    // auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
    auth: token,
});
/**
 * @name POST
 * @description POST handler for the webhook route that handles the webhook event
 */
export async function POST(req: Request) {
    try {
        // handle the webhook event
        const { prompt } = await req.json();

        // const prediction = await replicate.predictions.create(options);
        const input = {
            fps: 24,
            width: 1024,
            height: 576,
            prompt,
            guidance_scale: 17.5,
            negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
        };

        const output = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });
        return NextResponse.json(output, { status: 201 });

        // return NextResponse.json(response); // return the response from Replicate

    } catch (error) {
        console.log("this is an error", error);
        return NextResponse.json({ type: "error" }); // return the response from Replicate
    }
}

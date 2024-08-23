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
        const { prompt } = await req.json();

        const input = {
            num_frames: 240,
            fps: 24,
            width: 1024,
            height: 576,
            prompt,
            guidance_scale: 17.5,
        };

        const output = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });
        return NextResponse.json(output, { status: 201 });


    } catch (error) {
        return NextResponse.json({ type: "error" });
    }
}

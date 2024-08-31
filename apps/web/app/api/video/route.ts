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
        const { prompt, ratio } = await req.json();
        console.log(prompt);

        const geometry = ratio === 'horizontal' ? {
            width: 1024,
            height: 576
        } : ratio === 'vertical' ? {
            width: 576,
            height: 1024
        } : {
            width: 576,
            height: 576
        }
        const input = {
            fps: 4,
            ...geometry,
            // prompt,
            // prompt: `generate video representing this content : ${prompt}`,
            prompt: `A macro video of a bee pollinating a flower `,
            guidance_scale: 17.5,
        };

        const output = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });
        return NextResponse.json(output, { status: 201 });


    } catch (error) {
        console.log(error);

        return NextResponse.json({ type: "error" });
    }
}

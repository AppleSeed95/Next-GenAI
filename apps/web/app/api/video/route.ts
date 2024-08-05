import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});
/**
 * @name POST
 * @description POST handler for the webhook route that handles the webhook event
 */
export async function POST(req: Request) {
    try {
        // handle the webhook event
        const { prompt } = await req.json();
        let options = {
            version: '8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f',
            input: { prompt },
        }
        const prediction = await replicate.predictions.create(options);

        // const response: any = await replicate.run(
        //     "anotherjesse/zeroscope-v2-xl:71996d331e8ede8ef7bd76eba9fae076d31792e4ddf4ad057779b443d6aea62f",
        //     {
        //         input: {
        //             prompt, // description of the video
        //         },
        //     }
        // );
        // if (!response?.ok) throw new Error('Failed to fetch the image');
        return NextResponse.json(prediction, { status: 201 });

        // return NextResponse.json(response); // return the response from Replicate

    } catch (error) {
        console.log("this is an error", error);
        return NextResponse.json({ type: "error" }); // return the response from Replicate
    }
}



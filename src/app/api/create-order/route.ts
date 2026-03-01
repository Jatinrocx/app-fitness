import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
    try {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json({ error: 'Razorpay keys not configured' }, { status: 500 });
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const { amount, currency = 'INR', receipt } = await req.json();

        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency,
            receipt,
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json(order, { status: 200 });
    } catch (error: unknown) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Error creating order' },
            { status: 500 }
        );
    }
}

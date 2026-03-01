import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
        const key_secret = process.env.RAZORPAY_KEY_SECRET || '';

        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', key_secret)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature === expectedSign) {
            return NextResponse.json({ message: 'Payment verified successfully' }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }
    } catch (error: unknown) {
        console.error('Error verifying Razorpay payment:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Error verifying payment' },
            { status: 500 }
        );
    }
}

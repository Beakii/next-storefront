import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateOrder } from "~/db/queries";
import { stripe } from "~/stripe/stripe";

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.text();
		const signature = headers().get("stripe-signature");

		if (!signature) {
			return new NextResponse("Invalid signature", { status: 400 });
		}

		const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

		if(event.type === "checkout.session.completed"){
			if(!event.data.object.customer_details?.email){
				throw new Error("No customer email found");
			}

			const stripePaymentSession = event.data.object as Stripe.Checkout.Session;

			const {userEmail, orderId} = stripePaymentSession.metadata || {
				userEmail: null,
				orderId: null,
			};

			if(!userEmail || !orderId){
				throw new Error("No user email or order id found");
			}

			const billingAddress = stripePaymentSession.customer_details?.address;
			const shippingAddress = stripePaymentSession.shipping_details?.address;

			const updatedOrder = await updateOrder({
				isPaid: true,
				orderId: orderId,
				shippingName: stripePaymentSession.customer_details?.name!,
				shippingCity: shippingAddress?.city!,
				shippingCountry: shippingAddress?.country!,
				shippingPostalCode: shippingAddress?.postal_code!,
				shippingStreet: shippingAddress?.line1!,
				shippingState: shippingAddress?.state!,
				billingName: stripePaymentSession.customer_details?.name!,
				billingCity: billingAddress?.city!,
				billingCountry: billingAddress?.country!,
				billingPostalCode: billingAddress?.postal_code!,
				billingStreet: billingAddress?.line1!,
				billingState: billingAddress?.state!,
			});
		}

		return NextResponse.json({result:event, ok:true})
	} catch (error) {
		console.error(error);
		
		return NextResponse.json({error: "Something went wrong", ok:false}, {status: 500});
	}
}
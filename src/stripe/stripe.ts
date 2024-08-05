import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-06-20",
	typescript: true,
})


interface CreateStripeProduct {
	name:string;
	image:string;
	price:number;
}
export const createStripeProduct = async ({name, image, price}:CreateStripeProduct) => {
	const product = await stripe.products.create({
		name: name,
		images: [image],
		default_price_data:{
			currency: "NZD",
			unit_amount: price,
		}
	});
	return product;
}


interface CreateStripeCheckoutSession {
	price:string;
	orderId:string;
	configId:string;
	userEmail:string;
}
export const createStripeCheckoutSession = async ({price, orderId, configId, userEmail}:CreateStripeCheckoutSession) => {
	const stripeSession = await stripe.checkout.sessions.create({
		success_url: `${process.env.NEXTAUTH_URL}/thank-you?orderId=${orderId}`,
		cancel_url: `${process.env.NEXTAUTH_URL}/configure/review?id=${configId}`,
		payment_method_types: ["card"],
		mode: "payment",
		shipping_address_collection:{
			allowed_countries: ["NZ", "US", "CA"],
		},
		metadata: {
			userEmail: userEmail,
			orderId: orderId,
		},
		line_items: [{
			price: price,
			quantity: 1,			
		}]
	});

	return stripeSession;
}
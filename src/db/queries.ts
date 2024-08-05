import "server-only";
import { db } from ".";
import { UploadedFileData } from "uploadthing/types";
import { CaseColor, CaseFinish, CaseMaterial, PhoneModels } from "@prisma/client";

interface CreateConfigProps {
	file: UploadedFileData;
	width: number | undefined;
	height: number | undefined;
}
export const createConfig = async ({file, width, height}:CreateConfigProps) => {
	const config = await db.config.create({
		data: {
			url: file.url,
			width: width || 500,
			height: height || 500,
		},
	});
	return config.id;
}


interface UpdateConfigProps {
	file: UploadedFileData;
	configId: string;
}
export const updateConfig = async ({configId, file}: UpdateConfigProps) => {
	const updatedConfig = await db.config.update({
		where:{
			id: configId,
		},
		data: {
			croppedUrl: file.url,
		}
	});
	return updatedConfig.id;
}

interface UpdateSaleSelectionConfigProps {
	color: CaseColor;
	finish: CaseFinish;
	material: CaseMaterial;
	model: PhoneModels;
	configId: string;
}
export const updateSaleSectionConfig = async ({configId, color, finish, material, model}: UpdateSaleSelectionConfigProps) => {
	const updatedConfig = await db.config.update({
		where:{
			id: configId,
		},
		data: {
			caseColor: color,
			caseFinish: finish,
			caseMaterial: material,
			model: model,
		}
	});
	return updatedConfig.id;
}


interface GetOneConfigProps {
	configId: string;
}
export const getOneConfig = async ({configId}: GetOneConfigProps) => {
	const config = await db.config.findUnique({
		where: {
			id: configId,
		},
	});
	return config;
}


interface CreateUserProps {
	userEmail: string;
}
export const createUser = async ({ userEmail }: CreateUserProps) => {
	const user = await db.user.create({
		data: {
			email: userEmail,
		}
	});
	return user;
}


interface GetUserByIdProps{
	userEmail: string;
}
export const getUserById = async ({userEmail}: GetUserByIdProps) => {
	const user = await db.user.findFirst({
		where: {
			email: userEmail,
		}
	});
	return user;
}


export const dashboardGetOrders = async () => {
	const orders = await db.order.findMany({
		include:{
			shippingAddress: true,
			user: true,
		},
		orderBy:{
			createdAt: "desc",
		}
	});
	return orders;
}


export const getSumOfPaidOrders = async () => {
	const sum = await db.order.aggregate({
		_sum: {
			amount: true,
		},
		where:{
			isPaid: true,
		}
	});
	return sum;
}


interface FindFirstOrderProps {
	userEmail: string;
	configId?: string | undefined;
	orderId?: string | undefined;
	includeBilling?: boolean;
	includeShipping?: boolean;
	includeConfig?: boolean;
	includeUser?: boolean;
}
export const getOneOrder = async ({
	userEmail, 
	configId, 
	orderId, 
	includeBilling = false, 
	includeConfig = false, 
	includeShipping = false, 
	includeUser = false
}:FindFirstOrderProps) => {
	const order = await db.order.findFirst({
		where:{
			userEmail: userEmail,
			configId: configId,
			id: orderId,
		},
		include:{
			billingAddress: includeBilling,
			shippingAddress: includeShipping,
			config: includeConfig,
			user: includeUser,
		}
	});

	return order;
}


interface CreateOrderProps {
	dbPrice: number;
	userEmail: string;
	configId: string;
}
export const createOrder = async ({dbPrice, userEmail, configId}:CreateOrderProps) => {
	const order = await db.order.create({
		data: {
			amount: dbPrice,
			userEmail: userEmail,
			configId: configId,
		}
	});
	return order;
}


interface UpdateOrderProps {
	orderId: string;
	isPaid: boolean;
	shippingName: string;
	shippingCity: string;
	shippingCountry: string;
	shippingPostalCode: string;
	shippingStreet: string;
	shippingState: string;
	billingName: string;
	billingCity: string;
	billingCountry: string;
	billingPostalCode: string;
	billingStreet: string;
	billingState: string;
}
export const updateOrder = async ({
	orderId, 
	isPaid, 
	shippingCity, 
	shippingCountry, 
	shippingName, 
	shippingPostalCode, 
	shippingState,
	shippingStreet,
	billingName,
	billingCity,
	billingCountry,
	billingPostalCode,
	billingState,
	billingStreet
}: UpdateOrderProps) => {
	const updatedOrder = await db.order.update({
		where: {
			id: orderId,
		},
		data: {
			isPaid: isPaid,
			shippingAddress:{
				create:{
					name: shippingName,
					city: shippingCity,
					country: shippingCountry,
					zipCode: shippingPostalCode,
					state: shippingState,
					street: shippingStreet,
				}
			},
			billingAddress:{
				create:{
					name: billingName,
					city: billingCity,
					country: billingCountry,
					zipCode: billingPostalCode,
					state: billingState,
					street: billingStreet,
				}
			}
		}
	})

	return updatedOrder;
}
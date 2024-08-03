import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUserById } from '~/db/queries';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code"
				}
			}
		})
    ],
	callbacks:{
		signIn: async ({ user }) => {
			if (!user?.id || !user.email) {
				throw new Error('Invalid user data');
			}

			const existingUser = await getUserById({userEmail: user.email});

			if (!existingUser) {
				const newUser = await createUser({userEmail: user.email});
				if(!newUser) {
					throw new Error('Failed to create user');
				}
			}

			return true;
		}
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST }
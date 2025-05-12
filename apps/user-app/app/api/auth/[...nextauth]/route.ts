import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", placeholder: "johndoe@gmail.com", required: true },
                password: { label:"Password", placeholder: "********", type: "password", required: true }
            },
            async authorize(credentials) {
                
                return null;
            },
        }),
    ]
});


export { handler as GET, handler as POST };
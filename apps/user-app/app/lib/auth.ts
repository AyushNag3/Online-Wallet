import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e) {
                console.error(e);
            }

            return null
          }
        }),
        GitHubProvider({
            clientId: process.env.Github_Client_ID || "",
            clientSecret: process.env.Github_Client_Secret || ""
          })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: { // callbacks provides us to add extra config.
        // TODO: can u fix the type here? Using any is bad

        async session({ token, session }:any) { // By default, only a subset of the token is returned for increased security. 
                                // Since, earlier without the callback, id was not returned, hence this has been done
            session.user.id = token.sub
            return session
        }
        // async signIn({user} : {user :any}) {    This callback makes user that user with 12345@gmail.com is blocked
        //    if (user.email == "12345@gmail.com") {
        //     return false 
        //    }
        //    return true
        //   },
    }
  }
  
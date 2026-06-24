import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import {prisma} from './prisma';

export const {handlers,signIn,signOut,auth} = NextAuth({
    session:{
        strategy:'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers:[
        Credentials({
            credentials:{
                email:{type:'email'},
                password:{type:'password'}
            },
            authorize:async (credentials)=>{

                if(credentials?.email === undefined || credentials?.password === undefined) return null;

                const user = await prisma.user.findUnique({
                    where:{
                        email:credentials.email as string
                    }
                })

                if(!user) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password);

                if(!isPasswordValid) {
                    return null;
                }

                return {
                    id:user.id,
                    email:user.email,
                    username:user.username,
                    role:user.role,
                    profileImage:user.profileImage
                }

            }
        })
    ],
    callbacks:{
        async session({session,user,trigger,token}){
            session.user.id = token.id as string;
            session.user.email = token.email as string;
            session.user.username = token.username as string;
            session.user.role = token.role as string;
            session.user.profileImage = token.profileImage as string;
            return session;
        },
        async jwt({token,user,trigger,session}){
            if(user){
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.role = user.role;
                token.profileImage = user.profileImage;
            }
            return token;
        }
    }
})
import SignInForm from './form/SignInForm'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function SignInPage() {

    const session = await auth()
    if(session) {
        redirect('/')
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <SignInForm />
        </div>
    )

}
"use client";
// it ensures that component runs on client side

import { ClerkProvider,useAuth } from "@clerk/nextjs"
import {ConvexReactClient} from "convex/react"
import {ConvexProviderWithClerk} from "convex/react-clerk"

const convex=new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function ConvexClientProvider({children} : {children:React.ReactNode}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_PUBLISHABLE_KEY!}>
    
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
        </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

export default ConvexClientProvider


//here client is convex instance and useauth from clerk-nextjs.
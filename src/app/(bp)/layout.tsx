import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs"
import Header  from "@/components/Header"



export default function RSLayout ({
    children,
} : {
    children: React.ReactNode
}) {
    return (
     <div className="mx-auto w-full max-w-7xl">
       <KindeProvider>
        <Header />
        <div className="px-4 py-2">
         {children}
        </div>
        </KindeProvider>
     </div>
    )
}

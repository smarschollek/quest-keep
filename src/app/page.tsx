import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";

export default async function Home() {
    const session = await auth()
    if (!session) redirect('/login')

    return (
        <main>
            Hello

            <LogoutButton />
        </main >
    );
}

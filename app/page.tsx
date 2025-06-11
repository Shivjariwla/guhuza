import { auth } from "@/auth";
import LoginButton from "./components/buttons/loginBtn";
import LogoutButton from "./components/buttons/logoutBtn";
import "@/lib/i18n";

async function LoginPage() {
    const session = await auth();
    if (session) {
        const user = session.user;
        const name = user?.firstName == null ? "Anonymous" : user?.firstName;

        return (
            <div className="flex h-full">
                <div className="px-8 my-32 rounded py-8 border-2 mx-auto w-fit bg-white dark:bg-neutral-900 text-black dark:text-white transition-colors duration-300">
                    <div>
                        <h1 className="text-3xl font-bold mb-5 w-fit px-4 py-1 bg-blue-400 dark:bg-blue-600 rounded text-center">
                            Welcome
                        </h1>
                        <p>Hello, {name}</p>
                        <p>
                            You are already logged in. If you want to log into another account,
                            please logout.
                        </p>
                        <div className="mt-5 w-full">
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full">
            <div className="px-8 my-32 rounded py-8 border-2 mx-auto w-fit bg-white dark:bg-neutral-900 text-black dark:text-white transition-colors duration-300">
                <div>
                    <h1 className="text-3xl font-bold mb-5 w-fit px-4 py-1 bg-blue-400 dark:bg-blue-600 rounded text-center">
                        Log in
                    </h1>
                    <p>
                        Hello, welcome to Guhuza’s Brain Boost. The authentication is handled by
                        Guhuza.
                    </p>
                    <div className="mt-5 w-full">
                        <LoginButton />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

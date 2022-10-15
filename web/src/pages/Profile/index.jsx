import { useLocalStorage } from "react-use";
import { Icon, Card, DateSelect } from "~/components";
import { Navigate } from "react-router-dom";

export const Profile = () => {
    const [auth, setAuth] = useLocalStorage("auth", {});
    const logout = () => setAuth({});

    if (!auth?.user?.id) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <>
            <header className="bg-red-500 text-white">
                <div className="container max-w-3xl flex justify-between p-4">
                    <img src="/imgs/logo-red.svg" className="w-28 md:w-40" />
                    <div onClick={logout} className="p-2 cursor-pointer">
                        Sair
                    </div>
                </div>
            </header>

            <main className="space-y-6">
                <section id="header" className=" bg-red-500 text-white">
                    <div className="container max-w-3xl space-y-2 p-4">
                        <a href="/dashboard">
                            <Icon name="back" className="w-10" />
                        </a>

                        <h3 className="text-2xl font-bold">Bruna Kobayachi</h3>
                    </div>
                </section>

                <section
                    id="content"
                    className="p-4 container max-w-3xl space-y-4">
                    <h2 className="text-red-500 text-xl font-bold">
                        Seus palpites
                    </h2>

                    <DateSelect />

                    <div className="space-y-4">
                        <Card
                            timeA={{ slug: "sui" }}
                            timeB={{ slug: "cam" }}
                            match={{ time: "7:00" }}
                        />
                        <Card
                            timeA={{ slug: "uru" }}
                            timeB={{ slug: "cor" }}
                            match={{ time: "7:00" }}
                        />
                        <Card
                            timeA={{ slug: "por" }}
                            timeB={{ slug: "gan" }}
                            match={{ time: "7:00" }}
                        />
                    </div>
                </section>
            </main>
        </>
    );
};

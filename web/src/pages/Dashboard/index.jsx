import { Icon, Card, DateSelect } from "~/components";
import { useLocalStorage } from "react-use";
import { Navigate } from "react-router-dom";

export const Dashboard = () => {
    const [auth] = useLocalStorage("auth", {});
    if (!auth?.user?.id) {
        return <Navigate to="/" replace={true} />;
    }
    return (
        <>
            <header className="bg-red-500 text-white">
                <div className="container max-w-3xl flex justify-between p-4">
                    <img src="/imgs/logo-red.svg" className="w-28 md:w-40" />
                    <a href="/profile">
                        <Icon name="profile" className="w-10" />
                    </a>
                </div>
            </header>

            <main className="space-y-6">
                <section id="header" className=" bg-red-500 text-white">
                    <div className="container max-w-3xl space-y-2 p-4">
                        <span>Olá Bruna </span>
                        <h3 className="text-2xl font-bold">
                            Qual é o seu palpite?
                        </h3>
                    </div>
                </section>

                <section
                    id="content"
                    className="p-4 container max-w-3xl space-y-4">
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

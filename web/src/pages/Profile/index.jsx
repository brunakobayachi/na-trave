import { Icon, Card, DateSelect } from "~/components";
import { useAsyncFn, useLocalStorage, useAsync } from "react-use";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { format, formatISO } from "date-fns";
import { useEffect } from "react";
import { useState } from "react";

export const Profile = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)));
    const [auth, setAuth] = useLocalStorage("auth", {});

    const [{ value: user, loading, error }, fetchHunches] = useAsyncFn(
        async () => {
            const res = await axios({
                method: "get",
                baseURL: import.meta.env.VITE_API_URL,
                url: `/${params.username}`,
            });

            const hunches = res.data.hunches.reduce((acc, hunch) => {
                acc[hunch.gameId] = hunch;
                return acc;
            }, {});

            return {
                ...res.data,
                hunches,
            };
        }
    );

    const [games, fetchGames] = useAsyncFn(async params => {
        const res = await axios({
            method: "get",
            baseURL: import.meta.env.VITE_API_URL,
            url: "/games",
            params,
        });

        return res.data;
    });

    const logout = () => {
        setAuth({});
        navigate("/login");
    };

    const isLoading = games.loading || loading;
    const hasError = games.error || error;
    const isDone = !isLoading && !hasError;

    useEffect(() => {
        fetchHunches();
    }, []);

    useEffect(() => {
        fetchGames({ gameTime: currentDate });
    }, [currentDate]);

    return (
        <>
            <header className="bg-red-500 text-white">
                <div className="container max-w-3xl flex justify-between p-4">
                    <img src="/imgs/logo-red.svg" className="w-28 md:w-40" />
                    {auth?.user?.id && (
                        <div onClick={logout} className="p-2 cursor-pointer">
                            Sair
                        </div>
                    )}
                </div>
            </header>

            <main className="space-y-6">
                <section id="header" className=" bg-red-500 text-white">
                    <div className="container max-w-3xl space-y-2 p-4">
                        <a href="/dashboard">
                            <Icon name="back" className="w-10" />
                        </a>
                    </div>
                    <div className="container max-w-3xl space-y-2 p-4">
                        <h3 className="text-2xl font-bold">{user?.value}</h3>
                    </div>
                </section>

                <section
                    id="content"
                    className="p-4 container max-w-3xl space-y-4">
                    <h2 className="text-red-500 text-xl font-bold">
                        Seus palpites
                    </h2>

                    <DateSelect currentDate={currentDate} onChange={setDate} />

                    <div className="space-y-4">
                        {isLoading && "Carregando jogos...."}
                        {hasError && "Ops! Algo deu errado."}

                        {isDone &&
                            games.value?.map(game => (
                                <Card
                                    key={game.id}
                                    gameId={game.id}
                                    homeTeam={game.homeTeam}
                                    awayTeam={game.awayTeam}
                                    gameTime={format(
                                        new Date(game.gameTime),
                                        "H:mm"
                                    )}
                                    homeTeamScore={
                                        user?.hunches?.[game.id]?.homeTeamScore
                                    }
                                    awayTeamScore={
                                        user?.hunches?.[game.id]?.awayTeamScore
                                    }
                                    disabled={true}
                                />
                            ))}
                    </div>
                </section>
            </main>
        </>
    );
};

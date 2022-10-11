export const Card = ({timeA, timeB, match}) => (
    <div className="rounded-xl border-gray-300 border p-4 text-center space-y-4">
        <span className="text-sm md:text-base text-grey-700 font-bold">
            { match.time }
        </span>

        <div className="flex space-x-4 justify-center items-center">
            <span className="uppercase">{timeA.slug}</span>
            <img src={`/imgs/flags/${timeA.slug}.png`} />

            <input
                type="number"
                className=" h-[55px] bg-red-300/[0.15] w-[55px] text-red-700 text-xl"
            />

            <span className=" text-red-500 font-bold">X</span>

            <input
                type="number"
                className="h-[55px] bg-red-300/[0.15] w-[55px] text-red-700 text-xl"
            />

            <span className="uppercase">{timeB.slug}</span>
            <img src={`/imgs/flags/${timeB.slug}.png`} />
        </div>
    </div>
);

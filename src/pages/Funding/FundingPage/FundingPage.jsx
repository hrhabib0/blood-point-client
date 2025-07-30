import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FundingTable from "../FundingTable/FundingTable";
import GiveFundModal from "../GiveFundModal/GiveFundModal";
// import { Button } from "@/components/ui/button";
import { FaDonate } from "react-icons/fa";


const FundingPage = () => {
    const [showModal, setShowModal] = useState(false);

    const { data: fundingData = [], isLoading } = useQuery({
        queryKey: ["fundings"],
        queryFn: async () => {
            // const res = await fetch("https://your-server-url/fundings");
            // return res.json();
        },
    });

    return (
        <div className="px-4 md:px-8 py-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-400">Fundings Information</h2>
                {/* <Button
                    onClick={() => setShowModal(true)}
                    className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                >
                    <FaDonate /> Give Fund
                </Button> */}
                <button onClick={() => setShowModal(true)} className="btn btn-error text-white gap-2">
                    <FaDonate /> Give Fund
                </button>
            </div>

            <FundingTable data={fundingData} isLoading={isLoading} />

            {showModal && <GiveFundModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default FundingPage;

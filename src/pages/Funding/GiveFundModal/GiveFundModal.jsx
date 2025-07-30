import { useState } from "react";
// import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

const GiveFundModal = ({ onClose }) => {
    const [amount, setAmount] = useState("");

    const handleDonate = async () => {
        if (!amount || isNaN(amount) || Number(amount) < 10) {
            return Swal.fire("Error", "Enter a valid amount (minimum ৳10)", "error");
        }

        // Call backend to create Stripe checkout session
        const res = await fetch("https://your-server-url/create-fund-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: Number(amount) }),
        });
        if (!res.ok) throw new Error("Failed to create payment session");

        const data = await res.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            Swal.fire("Error", "Payment failed", "error");
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Donate Fund</h3>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount in BDT"
                    className="input input-bordered w-full mb-4"
                />
                <div className="flex justify-end gap-3">
                    {/* <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button> */}
                    <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg">
                        Cancel
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg" onClick={handleDonate}>Donate Now</button>
                    {/* <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={handleDonate}>
                        Donate
                    </Button> */}
                </div>
            </div>
        </div>
    );
};

export default GiveFundModal;

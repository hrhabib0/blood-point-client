import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { logIn } = use(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation()
    const from = location.state?.from || "/";
    const navigate = useNavigate()
    const [loginError, setLoginError] = useState()
    const [loading, setLoading] = useState()

    const onSubmit = async (data) => {
        setLoading(true)

        try {
            // login user
            logIn(data.email, data.password)
                .then(data => {
                    if (data.user) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `logged in successfully.`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(from)
                    }

                })
                .catch(error => {
                    setLoginError(error.message || "something went wrong")
                    setLoading(false)
                })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login failed!",
                text: error.message,
            });
            setLoading(false)
        }finally {
            // setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f7fa] py-8 px-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-[#CAEB66] mb-6">Login to Blood Point</h2>

                {loginError && <p className='text-red-500'>{loginError}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="label font-semibold text-black">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="label font-semibold text-black">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password", { required: "Password is required" })}
                                className="input input-bordered w-full pr-10"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="btn bg-[#CAEB66] hover:bg-[#b0d950] text-black font-bold w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                {/* Navigation Link */}
                <p className="mt-4 text-center text-sm text-blue-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-red-800 font-semibold hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

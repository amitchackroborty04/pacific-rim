import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setRegistrationValue } from "@/redux/features/authentication/AuthSlice";
import { ArrowRight, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

//! for recreational cannabis
export function RecreationalCannabis() {
  const [loading, setLoading] = useState<true | false>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const authinfo = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const validatePasswords = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setPasswordWarning("Passwords do not match");
      return false;
    }
    setPasswordWarning("");
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if (validatePasswords(formData.password, formData.confirmPassword)) {
      dispatch(
        setRegistrationValue({
          fullName: formData.fullName,
          password: formData.password,
        })
      );
      // Here you would typically send the data to your backend or perform the next step
      //   alert('Form submitted successfully!')

      setTimeout(() => {
        console.log({
          ...authinfo,
          fullName: formData.fullName,
          password: formData.password,
        });

        toast.success("Your account is now ready!");
        setLoading(false);
      }, 3000);

      // Here you would typically send the data to your backend or perform the next step
      //   alert('Form submitted successfully!')
    }
  };

  return (
    <div className="max-w-[570px] mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-[36px] font-semibold text-[#6EBA6B] !leading-[43px] mb-2">
          Sign Up
        </h1>
        <p className="text-[12px] text-[#6D6D6D] font-normal">
          Continue to register as a customer or vendor, Please provide the
          information.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-[25px] lg:text-[32px] font-medium text-[#000000] mb-4">
          Enter your Email, Name & Password
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 text-[20px] "
      >
        {/* <div className="space-y-2">
          <Label className='text-[20px] text-[#444444]' htmlFor="email">Email address</Label>
          <Input
            className='p-5 text-[20px] focus:outline-none focus:ring-2 focus:ring-[#9E9E9E]'
            id="email"
            name="email"
            type="email"
            placeholder="Write your email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
   */}
        <div className="space-y-2">
          <Label className="text-[20px] text-[#444444]" htmlFor="fullName">
            Full Name
          </Label>
          <Input
            className="p-5 text-[20px] focus:outline-none focus:ring-2 focus:ring-[#9E9E9E]"
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Write your full name"
            required
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[20px] text-[#444444]" htmlFor="password">
            Password
          </Label>
          <div className="relative">
            <Input
              className="p-5 text-[20px] focus:outline-none focus:ring-2 focus:ring-[#9E9E9E]"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <EyeIcon className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2 mb-10">
          <Label
            className="text-[20px] text-[#444444]"
            htmlFor="confirmPassword"
          >
            Confirm password
          </Label>
          <div className="relative">
            <Input
              className="p-5 text-[20px] focus:outline-none focus:ring-2 focus:ring-[#9E9E9E]"
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <EyeIcon className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {passwordWarning && (
          <p className="text-red-500 text-sm">{passwordWarning}</p>
        )}
        <div>
          <Button
            disabled={loading}
            className="font-medium text-base leading-[20px] bg-[#2A6C2D] hover:bg-[#266129] px-[24px] py-[12px] text-white"
          >
            {loading ? "Processing" : "Next"}
            {loading ? (
              <Loader2 className="ml-2 animate-spin " />
            ) : (
              <ArrowRight className="ml-2" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { useLocation, useNavigate } from "react-router";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useSentOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});


const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [sendOtp] = useSentOtpMutation()
  const [verifyOtp] = useVerifyOtpMutation();
  const [confirmed, setConfirmed] = useState(false);
  const [timer, setTimer] = useState(5);


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });



  //turned of for development
  // useEffect(()=>{
  //     if(!email){
  //         navigate('/')
  //     }
  // },[email, navigate])



  const handleSendOtp = async () => {
    const toastId = toast.loading("sending OTP")
    try {
      const res = await sendOtp({ email: email }).unwrap()
      if (res.success) {
        toast.success("OTP sent", { id: toastId })
        setConfirmed(true);
        setTimer(120)
      }


    } catch (error) {
      console.log(error)
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifying OTP");
    const userInfo = {
      email,
      otp: data.pin
    }
    try {
      const res = await verifyOtp(userInfo).unwrap();
      if (res.success) {
        toast.success("OTP Verified", { id: toastId });
        setConfirmed(true);
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      console.log("Tick");
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      {confirmed ? (
        <Card className="w-full max-w-md shadow-lg rounded-2xl border border-gray-200">
          {/* Header */}
          <CardHeader className="text-center space-y-3">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Verify Your OTP
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm">
              We’ve sent a 6-digit verification code to{" "}
              <span className="font-medium text-gray-900">{email || "your email"}</span>.
              Please enter it below to continue.
            </CardDescription>
          </CardHeader>

          {/* OTP Input */}
          <CardContent className="space-y-6">
            <Form {...form}>
              <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem className="w-full text-center">
                      <FormLabel className="block mb-2 text-sm font-medium text-gray-700">
                        One-Time Password
                      </FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          className="scale-110 gap-2"
                          {...field}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={0}
                              className="w-12 h-12 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={1}
                              className="w-12 h-12 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={2}
                              className="w-12 h-12 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                          </InputOTPGroup>

                          {/* Separator */}
                          <InputOTPSeparator>-</InputOTPSeparator>

                          <InputOTPGroup>
                            <InputOTPSlot
                              index={3}
                              className="w-12 h-12 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={4}
                              className="w-12 h-12 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={5}
                              className="w-12 h-12 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            <p className="text-sm text-gray-500 text-center">
              Didn’t receive the code?{" "}
              <span className="text-blue-600 hover:underline font-medium cursor-pointer">
                <Button onClick={handleSendOtp}
                  type="button"
                  variant="link"
                  disabled={timer !== 0}
                  className={cn("p-0 m-0", {
                    "cursor-pointer": timer === 0,
                    "text-gray-500": timer !== 0,
                  })}
                >Resend</Button>
                {timer}
              </span>
            </p>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex flex-col gap-3">
            <Button form="otp-form" type="submit" className="w-full">Verify</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full max-w-md shadow-lg rounded-2xl border border-gray-200">
          {/* Header */}
          <CardHeader className="text-center space-y-3">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Confirm Your Email
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm">
              We’ll send a one-time password to{" "}
              <span className="font-medium text-gray-900">{email || "your email"}</span>.
            </CardDescription>
          </CardHeader>

          {/* Footer */}
          <CardFooter className="flex flex-col gap-3 p-6">
            <Button onClick={handleSendOtp} className="w-full">
              Send OTP
            </Button>
            <Button
              variant="ghost"
              className="w-full text-gray-500"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Verify;

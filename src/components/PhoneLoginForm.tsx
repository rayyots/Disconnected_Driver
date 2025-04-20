
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Phone, KeyRound, Loader } from 'lucide-react';
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface PhoneFormValues {
  phone: string;
}

interface OtpFormValues {
  otp: string;
}

const PhoneLoginForm: React.FC = () => {
  const [otpSent, setOtpSent] = useState(false);
  const { login, verifyOTP, isLoading, error } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');

  // Phone form
  const phoneForm = useForm<PhoneFormValues>({
    defaultValues: {
      phone: '',
    },
  });

  // OTP form
  const otpForm = useForm<OtpFormValues>({
    defaultValues: {
      otp: '',
    },
  });

  const handlePhoneSubmit = async (values: PhoneFormValues) => {
    try {
      if (!values.phone || values.phone.length < 10) {
        toast.error('Please enter a valid phone number');
        return;
      }
      
      setPhoneNumber(values.phone);
      await login(values.phone);
      setOtpSent(true); // Important: This must happen after login completes successfully
    } catch (err) {
      // Error is already handled in AuthContext
      console.error('Login error:', err);
    }
  };

  const handleOtpSubmit = async (values: OtpFormValues) => {
    try {
      const otpValue = values.otp;
      
      if (!otpValue || otpValue.length !== 6) {
        toast.error('Please enter a valid 6-digit OTP');
        return;
      }
      
      await verifyOTP(otpValue);
    } catch (err) {
      // Error is already handled in AuthContext
      console.error('OTP verification error:', err);
    }
  };

  const handleResendOTP = async () => {
    try {
      await login(phoneNumber);
      toast.success('OTP resent to your phone');
    } catch (err) {
      // Error is already handled in AuthContext
      console.error('Resend OTP error:', err);
    }
  };

  // For testing - auto-fill OTP on button click
  const fillTestOTP = () => {
    otpForm.setValue('otp', '123456');
  };

  if (!otpSent) {
    return (
      <div className="space-y-6 w-full max-w-sm animate-fade-in">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
            <Phone className="h-8 w-8 text-[#00C4CC]" />
          </div>
          <h2 className="text-xl font-bold text-white">Driver Login</h2>
          <p className="text-gray-400 text-sm mt-1">Enter your phone number to continue</p>
        </div>
        
        <Form {...phoneForm}>
          <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-4">
            <FormField
              control={phoneForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="tel"
                        placeholder="(123) 456-7890"
                        className="bg-gray-800 border-gray-700 text-white pl-10"
                        required
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Phone className="h-4 w-4" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-[#00C4CC] hover:bg-[#00A8AF] text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin mr-2" /> 
                  Sending OTP...
                </>
              ) : 'Send OTP'}
            </Button>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </form>
        </Form>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-sm animate-fade-in">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
          <KeyRound className="h-8 w-8 text-[#00C4CC]" />
        </div>
        <h2 className="text-xl font-bold text-white">Verify OTP</h2>
        <p className="text-gray-400 text-sm mt-1">Enter the 6-digit code sent to {phoneNumber}</p>
      </div>
      
      <Form {...otpForm}>
        <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-6">
          <FormField
            control={otpForm.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="mx-auto max-w-[320px]">
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    render={({ slots }) => (
                      <InputOTPGroup className="gap-2 justify-center">
                        {slots.map((slot, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className={cn(
                              "w-10 h-12 text-xl bg-gray-800 border-gray-700 text-white"
                            )}
                            {...slot}
                          />
                        ))}
                      </InputOTPGroup>
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-[#00C4CC] hover:bg-[#00A8AF] text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="h-4 w-4 animate-spin mr-2" /> 
                Verifying...
              </>
            ) : 'Verify OTP'}
          </Button>
          
          {/* Hidden in production, just for testing */}
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            className="w-full text-gray-400 bg-gray-800 border-gray-700 hover:bg-gray-700"
            onClick={fillTestOTP}
          >
            Test with 123456
          </Button>
        </form>
      </Form>
      
      <div className="flex flex-col items-center gap-4">
        <Button 
          type="button" 
          variant="ghost" 
          className="text-gray-400 hover:text-white"
          onClick={handleResendOTP}
          disabled={isLoading}
        >
          Resend OTP
        </Button>
        
        <Button 
          type="button" 
          variant="ghost"
          className="text-gray-400 hover:text-white"
          onClick={() => {
            setOtpSent(false);
            otpForm.reset();
          }}
          disabled={isLoading}
        >
          Back to Phone Entry
        </Button>
      </div>
      
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
};

export default PhoneLoginForm;

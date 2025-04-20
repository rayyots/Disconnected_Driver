
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const PhoneLoginForm: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const { login, verifyOTP, isLoading, error } = useAuth();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    await login(phone);
    setOtpSent(true);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    
    await verifyOTP(otp);
  };

  // For demo purposes, auto-fill the mockDriver's phone number
  const handleDemoFill = () => {
    setPhone('+1234567890'); // This matches our mock driver in AuthContext
  };

  if (!otpSent) {
    return (
      <form onSubmit={handlePhoneSubmit} className="space-y-4 w-full max-w-sm animate-fade-in">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-white">
            Phone Number
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (234) 567-8900"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-[#00C4CC] hover:bg-[#00A8AF] text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Sending OTP...' : 'Send OTP'}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          className="w-full text-[#00C4CC] border-[#00C4CC]"
          onClick={handleDemoFill}
        >
          Fill Demo Number
        </Button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={handleOtpSubmit} className="space-y-4 w-full max-w-sm animate-fade-in">
      <div className="space-y-2">
        <label htmlFor="otp" className="text-sm font-medium text-white">
          Enter OTP sent to {phone}
        </label>
        <Input
          id="otp"
          type="text"
          placeholder="6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
          maxLength={6}
          required
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-[#00C4CC] hover:bg-[#00A8AF] text-white"
        disabled={isLoading}
      >
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </Button>
      
      <Button 
        type="button" 
        variant="ghost" 
        className="w-full text-gray-400"
        onClick={() => {
          setOtpSent(false);
          setOtp('');
        }}
        disabled={isLoading}
      >
        Back to Phone Entry
      </Button>
      
      {/* For demo purposes, auto-fill a valid OTP */}
      <Button 
        type="button" 
        variant="outline" 
        className="w-full text-[#00C4CC] border-[#00C4CC]"
        onClick={() => setOtp('123456')}
      >
        Fill Demo OTP
      </Button>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default PhoneLoginForm;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { allDrivers, login } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic phone format check
    const phoneTrimmed = phone.trim();
    const driver = allDrivers.find(
      (d) => d.phone.replace(/[\s()-]/g, '') === phoneTrimmed.replace(/[\s()-]/g, '')
    );

    if (!driver) {
      setError('No driver found with this phone number.');
      setLoading(false);
      return;
    }

    try {
      await login(driver.id);
      navigate('/');
    } catch (err) {
      setError('Failed to log in. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A252F] flex flex-col items-center justify-center p-4">
      <div className="mb-8 animate-fade-in">
        <Logo size="lg" />
      </div>
      <Card 
        className="w-full max-w-sm border-none overflow-hidden animate-scale-in shadow-lg"
        style={{background: "linear-gradient(102.3deg, #9379fa 5.9%, #6E59A5 100%)"}}>
        <CardHeader className="text-center text-white pb-2">
          <CardTitle className="text-2xl font-bold">Driver Login</CardTitle>
          <p className="text-gray-200">Enter your phone number</p>
        </CardHeader>
        <CardContent className="p-6 flex flex-col gap-4">
          <form onSubmit={handleLogin} className="flex flex-col gap-4 animate-fade-in">
            <div>
              <Input
                placeholder="+1 (555) 123-4567"
                autoFocus
                value={phone}
                disabled={loading}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white/20 text-white border-white/30 placeholder-gray-300 focus:bg-white/30 focus:ring-primary"
                type="text"
              />
            </div>
            {error && (
              <div className="text-red-300 text-sm font-semibold animate-fade-in">{error}</div>
            )}
            <Button
              type="submit"
              disabled={loading || !phone.trim()}
              className="w-full bg-white/20 border-white/30 hover:bg-white/30 text-white transition-all font-bold gap-2"
            >
              {loading ? (
                <span className="animate-pulse">Logging in...</span>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Login
                </>
              )}
            </Button>
          </form>
          <div className="mt-2 text-xs text-white/80 text-center">
            Demo numbers:<br />
            {allDrivers.map((d, i) => (
              <span key={d.id}>
                {d.name}: <span className="font-mono">{d.phone}</span>
                {i < allDrivers.length - 1 && <br />}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
      <p className="mt-8 text-sm text-gray-400 animate-fade-in">
        This is a demo app. Enter a valid driver's phone number.
      </p>
    </div>
  );
};

export default LoginPage;

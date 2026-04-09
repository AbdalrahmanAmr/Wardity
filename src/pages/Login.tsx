import { FC, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ErrorBlock } from "@/components/ui/ErrorBlock";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel — charcoal brand column, desktop only ── */}
      <div className="hidden md:flex md:w-1/2 bg-charcoal relative overflow-hidden flex-col items-center justify-center px-12">

        {/* Floral SVG background overlay — mirrors newsletter section */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-[0.05]"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line key={`stem-${angle}`} x1="200" y1="200" x2="200" y2="18" stroke="white" strokeWidth="0.75" transform={`rotate(${angle}, 200, 200)`} />
            ))}
            {[0, 90, 180, 270].map((angle) => (
              <ellipse key={`bud-${angle}`} cx="200" cy="13" rx="4" ry="7" fill="white" opacity="0.55" transform={`rotate(${angle}, 200, 200)`} />
            ))}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <path key={`outer-${angle}`} d="M200 200 C187 166 187 138 200 122 C213 138 213 166 200 200Z" fill="white" transform={`rotate(${angle}, 200, 200)`} />
            ))}
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
              <path key={`inner-${angle}`} d="M200 200 C193 176 193 156 200 144 C207 156 207 176 200 200Z" fill="white" opacity="0.55" transform={`rotate(${angle}, 200, 200)`} />
            ))}
            <circle cx="200" cy="200" r="17" fill="white" />
            <circle cx="200" cy="200" r="7" fill="white" opacity="0.35" />
          </svg>
        </div>

        {/* Brand content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Rose SVG — same mark as header, displayed at w-16 h-16 */}
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 12C10 9 10 6 12 4.5C14 6 14 9 12 12Z" fill="#D02046" />
            <path d="M12 12C10 9 10 6 12 4.5C14 6 14 9 12 12Z" fill="#D02046" opacity="0.85" transform="rotate(72,12,12)" />
            <path d="M12 12C10 9 10 6 12 4.5C14 6 14 9 12 12Z" fill="#D02046" opacity="0.75" transform="rotate(144,12,12)" />
            <path d="M12 12C10 9 10 6 12 4.5C14 6 14 9 12 12Z" fill="#D02046" opacity="0.8" transform="rotate(216,12,12)" />
            <path d="M12 12C10 9 10 6 12 4.5C14 6 14 9 12 12Z" fill="#D02046" opacity="0.9" transform="rotate(288,12,12)" />
            <path d="M12 12C11.2 10.5 11.2 8.5 12 7.5C12.8 8.5 12.8 10.5 12 12Z" fill="#A61435" transform="rotate(36,12,12)" />
            <path d="M12 12C11.2 10.5 11.2 8.5 12 7.5C12.8 8.5 12.8 10.5 12 12Z" fill="#A61435" transform="rotate(108,12,12)" />
            <path d="M12 12C11.2 10.5 11.2 8.5 12 7.5C12.8 8.5 12.8 10.5 12 12Z" fill="#A61435" transform="rotate(180,12,12)" />
            <path d="M12 12C11.2 10.5 11.2 8.5 12 7.5C12.8 8.5 12.8 10.5 12 12Z" fill="#A61435" transform="rotate(252,12,12)" />
            <path d="M12 12C11.2 10.5 11.2 8.5 12 7.5C12.8 8.5 12.8 10.5 12 12Z" fill="#A61435" transform="rotate(324,12,12)" />
            <circle cx="12" cy="12" r="2" fill="#8A1029" />
            <circle cx="12" cy="12" r="0.75" fill="#FAF7F2" opacity="0.6" />
          </svg>

          <p className="font-heading italic text-4xl text-cream tracking-wide mt-6">Wardity</p>

          <div className="w-12 h-px bg-gold mx-auto my-6" />

          <p className="text-cream/50 text-sm tracking-widest font-light leading-relaxed">
            Curated flowers &amp; gifts,<br />delivered with care
          </p>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="w-full md:w-1/2 bg-cream flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-sm">

          {/* Heading */}
          <div className="mb-10">
            <h1 className="font-heading font-light text-3xl tracking-wide text-charcoal">
              Sign In
            </h1>
            <p className="text-sm text-charcoal/40 tracking-widest uppercase mt-2">
              Welcome back
            </p>
          </div>

          {error && (
            <div className="mb-6">
              <ErrorBlock message={error} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-[10px] tracking-[0.15em] uppercase text-charcoal/50 font-sans mb-2 block"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="bg-transparent border-0 border-b border-charcoal/20 w-full py-3 text-sm tracking-wide text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold transition-colors duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-[10px] tracking-[0.15em] uppercase text-charcoal/50 font-sans mb-2 block"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="bg-transparent border-0 border-b border-charcoal/20 w-full py-3 text-sm tracking-wide text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold transition-colors duration-200"
              />
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="border-charcoal/30 text-charcoal focus:ring-0"
                />
                <span className="text-xs text-charcoal/40 tracking-wide">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[10px] tracking-widest uppercase text-charcoal/40 hover:text-gold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="border border-charcoal text-charcoal text-xs tracking-[0.18em] uppercase px-10 py-3.5 w-full hover:bg-charcoal hover:text-cream transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Bottom link */}
          <div className="mt-10 text-center">
            <span className="text-xs text-charcoal/40 tracking-wide">
              Don't have an account?{" "}
            </span>
            <Link
              to="/register"
              className="text-xs tracking-[0.15em] uppercase border-b border-charcoal/30 pb-0.5 hover:border-gold hover:text-gold transition-colors"
            >
              Sign up
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

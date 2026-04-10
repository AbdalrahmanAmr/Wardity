import { FC, useState } from "react";
import { useAuth } from "@/features/auth";
import { useNavigate } from "react-router-dom";
import { ErrorBlock } from "@/shared/components/ErrorBlock";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";

const inputClass =
  "bg-transparent border-0 border-b border-charcoal/20 w-full py-3 text-sm tracking-wide text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold transition-colors duration-200";

const labelClass =
  "text-[10px] tracking-[0.15em] uppercase text-charcoal/50 font-sans mb-2 block";

export const Profile: FC = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      updateUser(formData);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = (): void => {
    logout();
    navigate("/");
  };

  const handleCancelEdit = (): void => {
    setIsEditing(false);
    setError(null);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
  };

  const firstInitial = (user.name ?? "A").trim()[0]?.toUpperCase() ?? "A";

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">

          {/* Page heading */}
          <h1 className="font-heading font-light text-3xl tracking-wide text-charcoal">
            My Account
          </h1>
          <div className="w-12 h-px bg-gold mt-3 mb-10" />

          {error && (
            <div className="mb-8">
              <ErrorBlock message={error} />
            </div>
          )}

          {!isEditing ? (
            /* ── View mode ── */
            <div>
              {/* Avatar + name */}
              <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 border border-gold/30 bg-champagne flex items-center justify-center flex-shrink-0">
                  <span className="font-heading italic text-2xl text-charcoal">
                    {firstInitial}
                  </span>
                </div>
                <div>
                  <p className="font-heading font-light text-xl text-charcoal tracking-wide">
                    {user.name}
                  </p>
                  <p className="text-xs text-charcoal/40 tracking-wide mt-0.5">{user.email}</p>
                </div>
              </div>

              {/* Info fields */}
              <div className="space-y-6">
                <div className="border-b border-gold/10 pb-4">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-charcoal/40 mb-1">
                    Full Name
                  </p>
                  <p className="text-sm text-charcoal tracking-wide">{user.name}</p>
                </div>

                <div className="border-b border-gold/10 pb-4">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-charcoal/40 mb-1">
                    Email Address
                  </p>
                  <p className="text-sm text-charcoal tracking-wide">{user.email}</p>
                </div>

                <div className="border-b border-gold/10 pb-4">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-charcoal/40 mb-1">
                    Phone
                  </p>
                  <p className="text-sm text-charcoal tracking-wide">
                    {user.phone || <span className="text-charcoal/30 italic">Not provided</span>}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={() => setIsEditing(true)}
                  className="border border-charcoal text-charcoal text-xs tracking-[0.18em] uppercase px-8 py-3 hover:bg-charcoal hover:text-cream transition-all duration-300"
                >
                  Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="text-xs tracking-[0.15em] uppercase text-charcoal/40 border-b border-charcoal/20 pb-0.5 hover:text-primary hover:border-primary transition-colors"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            /* ── Edit mode ── */
            <form onSubmit={handleSubmit} className="space-y-8">

              <div>
                <label htmlFor="name" className={labelClass}>
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+20 1xx xxx xxxx"
                  className={inputClass}
                />
              </div>

              {/* Form actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="border border-charcoal text-charcoal text-xs tracking-[0.18em] uppercase px-8 py-3 hover:bg-charcoal hover:text-cream transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Saving…
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs tracking-[0.15em] uppercase text-charcoal/40 border-b border-charcoal/20 pb-0.5 hover:text-charcoal hover:border-charcoal transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

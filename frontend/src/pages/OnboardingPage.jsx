import useAuthUser from "../hooks/useAuthUser";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { LANGUAGES } from "../constants";
import useOnboarding from "../hooks/useOnboarding";
import { Loader2, Shuffle } from "lucide-react";

const OnboardingPage = () => {
  
  const { authUser } = useAuthUser();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { isPending, onboardingMutation } = useOnboarding(); 
  
  const [isImgLoading, setIsImgLoading] = useState(true); // ⬅default true
  const [imgError, setImgError] = useState(false);
  const [formError, setFormError] = useState("");

  // force loading spinner on first mount even if pfp doesn't exist yet
  useEffect(() => {
    if (!formState.profilePic) {
      setIsImgLoading(true);
    }
  }, []);

  const handleOnboarding = (e) => {
    e.preventDefault();

    const { fullName, bio, nativeLanguage, location, profilePic } = formState;

    if (!fullName || !bio || !nativeLanguage || !location || !profilePic) {
      setFormError("Please fill out all the fields before submitting.");
      return;
    }

    setFormError("");
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setIsImgLoading(true);
    setImgError(false);
    setFormState({ ...formState, profilePic: randomAvatar });

    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8 space-y-6">
          <h1 className="text-4xl font-bold text-primary text-center">Complete Your Profile</h1>

          <form onSubmit={handleOnboarding} className="space-y-4">
            {/* PROFILE PIC */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden relative">
                {formState.profilePic && !imgError ? (
                  <>
                    {isImgLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-base-200 z-10">
                        <Loader2 className="h-6 w-6 text-accent animate-spin" />
                      </div>
                    )}
                    <img
                      src={formState.profilePic}
                      alt="Profile Preview"
                      loading="lazy"
                      onLoad={() => setIsImgLoading(false)}
                      onError={() => {
                        setImgError(true);
                        setIsImgLoading(false);
                      }}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        isImgLoading ? "opacity-0" : "opacity-100"
                      }`}
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-base-200">
                    <Loader2 className="h-6 w-6 text-accent animate-spin" />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleRandomAvatar}
                className="btn !bg-neutral !text-accent !border-white hover:!bg-accent hover:!text-black hover:!border-accent"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Generate Random Avatar
              </button>
            </div>

            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-secondary">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>

            {/* Bio */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-secondary">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>

            {/* Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-secondary">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({ ...formState, nativeLanguage: e.target.value })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-secondary">Location</span>
              </label>
              <input
                type="text"
                name="location"
                value={formState.location}
                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                className="input input-bordered w-full"
                placeholder="City, Country"
              />
            </div>

            {/* Submit */}
            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
              {isPending ? "Submitting..." : "Complete Onboarding"}
            </button>

            {/* ⛔ Error shown BELOW submit */}
            {formError && (
              <div className="alert alert-error shadow-md mt-2">
                <span>{formError}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;

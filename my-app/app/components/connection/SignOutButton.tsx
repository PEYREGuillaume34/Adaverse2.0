
import { signout } from "@/app/actions/connect";

export default function SignOutButton() {

  return (
    <>
    <form action={signout}>
      <button type="submit"
        className="w-full bg-ada-red hover:bg-ada-coral text-white font-black py-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all mt-6 font-oswald-bold text-2xl"
      >
        se deconnecter
      </button>
</form>
    </>
  );
}
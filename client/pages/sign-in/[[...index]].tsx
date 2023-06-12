import { SignIn } from "@clerk/nextjs";
import "@/styles/sign-in.css";

export default function Page() {
  return (
    <div className="sign-in-page">
        <SignIn />
    </div>
  );
}

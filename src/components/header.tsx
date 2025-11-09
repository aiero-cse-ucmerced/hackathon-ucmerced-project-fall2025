import Button from "./button";
import { useUser } from "./firebase";

export default function Header() {
  const user = useUser();
  return (
    <header className="mx-4 md:my-4 flex flex-row justify-center md:justify-between">
      <h1 className="text-center md:text-left font-bold my-auto md:text-xl">Intelligent Flashcards</h1>
      <section className="hidden md:flex flex-row gap-4 md:gap-8">
        {user ? (
          <Button href="/home" cta>Go to Dashboard</Button>
        ) : (<>
          <Button href="/signup" cta>Sign Up</Button>
          <Button href="/login">Login</Button>
        </>)}
      </section>
    </header>
  )
}
import Button from "./button";

export default function Header() {
  return (
    <header className="mx-4 md:my-4 flex flex-row justify-center md:justify-between">
      <h1 className="text-center md:text-left font-bold my-auto md:text-xl">Intelligent Flashcards</h1>
      <section className="hidden md:flex flex-row gap-4 md:gap-8">
        <Button href="/login/signup" cta>Sign Up</Button>
        <Button href="/login">Login</Button>
      </section>
    </header>
  )
}
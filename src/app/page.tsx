"use client";
import Image from "next/image";
import HeroImage from "../images/student.png";
import Button from "../components/button";
import Main from "../components/main";
import { useUserSession } from "../lib/useUserSession";
import { auth } from "../lib/firebase/clientApp";

export default function Home() {
  const user = useUserSession(auth.currentUser);
  return (
    <Main includeHeader centerChildren>
      {user ? (
        <section className="mt-8 p-4 border border-green-500 bg-green-100 rounded-md">
          <p className="text-xl font-semibold mb-2">Welcome Back, {user.email}!</p>
        </section>
      ) : (
        <section className="mt-8 p-4 border border-blue-500 bg-blue-100 rounded-md">
          <p className="text-xl font-semibold mb-2">You are not logged in.</p>
        </section>
      )}
      <p className={`text-lg md:text-4xl font-bold w-fit`}>Generate Flashcards Quickly with AI</p>
      <Image
        src={HeroImage}
        alt="Flashcards Illustration"
        width={300}
        height={200}
      />
      <Button href="/signup" cta>Create Flashcards Now</Button>
      <section className="flex flex-col items-center gap-2">
        <p>Already have an account?</p>
        <Button href="/login">Login</Button>
      </section>
      
      
    </Main>
  );
}

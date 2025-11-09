"use client";
import Image from "next/image";
import HeroImage from "../images/student.png";
import Button from "../components/button";
import Main from "../components/main";
import { useUser } from "../components/firebase";

export default function Home() {
  const user = useUser();
  return (
    <Main includeHeader centerChildren>
      <p className={`text-lg md:text-4xl font-bold w-fit`}>Generate Flashcards Quickly with AI</p>
      <Image
        src={HeroImage}
        alt="Flashcards Illustration"
        width={300}
        height={200}
      />
      {user ? (
        <Button href="/home" cta>Go to Dashboard</Button>
      ) : (
        <>
          <Button href="/signup" cta>Create Flashcards Now</Button>
          <section className="flex flex-col items-center gap-2">
            <p>Already have an account?</p>
            <Button href="/login">Login</Button>
          </section>
        </>
      )
      }
    </Main >
  );
}

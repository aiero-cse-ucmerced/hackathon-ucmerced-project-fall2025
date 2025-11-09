<<<<<<< HEAD
=======
"use client";
>>>>>>> 9211fb8010dcb4a5f302f5118b16a6575d505d3c
import Image from "next/image";
import HeroImage from "../images/student.png";
import Button from "../components/button";
import Main from "../components/main";
import { useUserSession } from "../lib/useUserSession";
import { auth } from "../lib/firebase/clientApp";

export default function Home() {
  const user = useUserSession(auth.currentUser);
  return (
<<<<<<< HEAD
    <>
      <p>Welcome to the Intelligent Flashcards App!</p>
=======
    <Main includeHeader centerChildren>
      <p className={`text-lg md:text-4xl font-bold w-fit`}>Generate Flashcards Quickly with AI</p>
>>>>>>> 9211fb8010dcb4a5f302f5118b16a6575d505d3c
      <Image
        src={HeroImage}
        alt="Flashcards Illustration"
        width={300}
        height={200}
      />
<<<<<<< HEAD
    </>
=======
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
>>>>>>> 9211fb8010dcb4a5f302f5118b16a6575d505d3c
  );
}

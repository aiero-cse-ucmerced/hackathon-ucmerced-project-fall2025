import Image from "next/image";
import HeroImage from "../images/student.png";
import Button from "../components/button";

export default function Home() {
  return (
    <>
    
      <p className={`text-3xl font-bold w-fit`}>Generate Flashcards Quickly with AI</p>
      <Image
        src={HeroImage}
        alt="Flashcards Illustration"
        width={300}
        height={200}
      />
      <Button href="/login/signup">Create Flashcards Now</Button>
    </>
  );
}

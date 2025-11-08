import Layout from "./layout";
import Image from "next/image";
import HeroImage from "../images/student.png";

export default function Home() {
  return (
    <Layout includeHeader centerChildren>
      <p>Welcome to the Intelligent Flashcards App!</p>
      <Image
        src={HeroImage}
        alt="Flashcards Illustration"
        width={300}
        height={200}
      />
    </Layout>
  );
}

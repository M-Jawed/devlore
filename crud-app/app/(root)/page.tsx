import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage",
};

export default function Home() {
  return <h1>homepage</h1>;
}

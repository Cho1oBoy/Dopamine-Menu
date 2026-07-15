import type { Metadata } from "next";

import { AboutPage } from "../../components/about-page";

export const metadata: Metadata = {
  title: "О проекте | Dopamine Menu",
  description:
    "Личная история Dopamine Menu, принципы проекта и планы по развитию практичного self-help инструмента для паузы перед автопилотом."
};

export default function AboutRoute() {
  return <AboutPage />;
}

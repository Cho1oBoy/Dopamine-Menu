import type { Metadata } from "next";

import { ChallengePage } from "../../components/challenge-page";

export const metadata: Metadata = {
  title: "7-дневный антискролл-челлендж | Dopamine Menu",
  description:
    "Практичный Telegram-челлендж с маленькими ежедневными действиями, чтобы меньше залипать в телефоне и чаще возвращать себе фокус."
};

export default function ChallengeRoute() {
  return <ChallengePage />;
}

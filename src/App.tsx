import { Intro } from "./Intro";
import { SectionPage } from "./Layout";
import { sections } from "./sections";
import { useHashRoute } from "./useHashRoute";

export default function App() {
  const [route, go] = useHashRoute();
  const index = sections.findIndex((s) => s.id === route);
  if (index >= 0) return <SectionPage index={index} go={go} />;
  // "" plays the Mayday call first; "title" jumps straight to the title screen.
  return <Intro key={route} startAt={route === "title" ? "title" : "radio"} onBegin={() => go(sections[0].id)} />;
}

import { Loader } from "@/components/Loader";
import { Gate } from "@/components/Gate";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cover } from "@/components/Cover";
import { EditorsNote } from "@/components/EditorsNote";
import { MemoryTimeline } from "@/components/MemoryTimeline";
import { Magazine } from "@/components/Magazine";
import { LavenderGarden } from "@/components/LavenderGarden";
import { MemoryWall } from "@/components/MemoryWall";
import { FavouritePhotos } from "@/components/FavouritePhotos";
import { Letter } from "@/components/Letter";
import { Countdown } from "@/components/Countdown";
import { Fireworks } from "@/components/Fireworks";
import { MusicToggle } from "@/components/MusicToggle";
import { EasterEggs } from "@/components/EasterEggs";

const Index = () => {
  return (
    <div className="grain">
      <Loader />
      <CustomCursor />
      <Gate>
        <SmoothScroll />
        <main className="bg-cream text-ink">
          <Cover />
          <EditorsNote />
          <MemoryTimeline />
          <Magazine />
          <MemoryWall />
          <FavouritePhotos />
          <LavenderGarden />
          <Letter />
          <Countdown />
          <Fireworks />
          <footer className="bg-ink text-cream/60 text-center py-10 text-[10px] tracking-[0.5em] uppercase">
            ICONIC SINCE 2009 · Issue 17 · For her, only.
          </footer>
        </main>
        <MusicToggle />
        <EasterEggs />
      </Gate>
    </div>
  );
};

export default Index;

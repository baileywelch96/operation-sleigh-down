SOUND EFFECTS (recommended)

Drop real recordings into public/sfx/ with these exact names, then push:

  storm.mp3   wind, rain and hail. 20-60 seconds that loops cleanly
  crash.mp3   the sleigh crash: wood and metal impact, debris. 1-3 seconds

They play through the radio filter, so they sound like Santa's handset is picking them up.
Any file that's missing falls back to a computer-generated version.
Free sounds with no attribution needed: pixabay.com/sound-effects (search "storm wind rain",
"wood crash", "car crash"). Trim the start so the sound hits straight away.
Storm volume per line is set with `storm:` in maydayLines in src/content.ts.


GIVE SANTA A REAL VOICE (optional)

Record the Mayday (phone voice memo is fine), save it as mayday.mp3 in this folder, and push.
The site plays it through a radio filter instead of the computer voice.
Note: the storm and sound effects above only play with the computer voice, not a recording.
Put the storm and crash into the recording itself if you go this way.

SCRIPT (deep, puffed, getting more panicked; about 35 seconds)

  "Elf HQ, Elf HQ, this is Sleigh One. Do you copy? Over."
  "Last drop of the night is done. Sack's empty and the reindeer are puffed."
  "Bringing her down for a rest stop in the park. Location is..."   (1 second of silence)
  "Say again, location is..."                                       (1 second of silence)
  "Hold on. Weather's turning fast. Wind's picking up. That's hail on the runners."
  "Rudolph, keep that nose lit! I can't see the treeline!"
  "Elves, hold on to something!"
  "Mayday, Mayday, Mayday. Sleigh One. We're going down!"           (2 seconds: the crash)
  "Elf HQ... we're down. Sleigh's on its side. My head's spinning..."
  "Elves are hurt. Send help. The words for our location are..."    (stop mid-sentence)

Tips: leave the gaps silent; the site adds static on top.

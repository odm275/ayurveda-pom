export function cycleAlert(message: string) {
  new Notification(message);

  const audioTune = new Audio(
    "https://ayurveda-pomodoro.s3.amazonaws.com/Store_Door_Chime-Mike_Koenig-570742973.mp3"
  );
  audioTune.load();
  audioTune.play();
}

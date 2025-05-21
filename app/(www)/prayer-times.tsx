const prayerTimes = [
  {
    name: "Fajr",
    time: "05:00",
  },
  {
    name: "Syuruq",
    time: "05:00",
  },
  {
    name: "Dhuhr",
    time: "12:00",
  },
  {
    name: "Asr",
    time: "15:30",
  },
  {
    name: "Maghrib",
    time: "18:45",
  },
  {
    name: "Isha",
    time: "20:00",
  },
];

export default function PrayerTimes() {
  return (
    <div className="p-4 gap-6 flex max-w-sm overflow-auto">
      {prayerTimes.map((prayerTime) => (
        <div key={prayerTime.name} className="text-center">
          <h3 className="font-medium">{prayerTime.name}</h3>
          <time
            dateTime={prayerTime.time}
            className="text-sm text-muted-foreground"
          >
            {prayerTime.time}
          </time>
        </div>
      ))}
    </div>
  );
}

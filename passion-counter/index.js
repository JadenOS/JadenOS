const START_DATE = new Date("2014-08-14T00:00:00Z");

function elapsedTime(now) {
  const cursor = new Date(START_DATE);
  let years = 0;
  let months = 0;
  let days = 0;

  // Total years
  while (true) {
    const next = new Date(cursor);
    next.setUTCFullYear(next.getUTCFullYear() + 1);
    if (next > now) break;
    cursor.setTime(next.getTime());
    years++;
  }

  // Total months
  while (true) {
    const next = new Date(cursor);
    next.setUTCMonth(next.getUTCMonth() + 1);
    if (next <= cursor || next > now) break;
    cursor.setTime(next.getTime());
    months++;
  }

  // Total days
  while (true) {
    const next = new Date(cursor);
    next.setUTCDate(next.getUTCDate() + 1);
    if (next > now) break;
    cursor.setTime(next.getTime());
    days++;
  }

  let seconds = Math.floor((now - cursor) / 1000);
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  return `${years} years, ${months} months, ${days} days, ${String(hours).padStart(2, "0")} hours, ${String(minutes).padStart(2, "0")} minutes, and ${String(seconds).padStart(2, "0")} seconds.`;
}

export default {
  async fetch() {
    const elapsed = elapsedTime(new Date());

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="380" height="20" viewBox="0 0 380 20">
        <text x="0" y="22"
          font-family="-apple-system"
          font-size="16"
          fill="#ffffff">${elapsed}</text>
      </svg>`;

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate"
      }
    });
  }
};
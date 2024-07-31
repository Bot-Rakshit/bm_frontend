export function PGNClockStripper(pgn: string): { strippedPgn: string; clockTimes: string[] } {
  const lines = pgn.split('\n');
  const newStrippedPgn: string[] = [];
  const newClockTimes: string[] = [];

  lines.forEach(line => {
    const processedLine = line.replace(/\{[^}]*\}/g, (match) => {
      const timeMatch = match.match(/\[%clk (\d+:\d+:\d+(?:\.\d+)?)\]/);
      if (timeMatch) {
        newClockTimes.push(timeMatch[1]);
      }
      return '';
    });
    newStrippedPgn.push(processedLine.trim());
  });

  return {
    strippedPgn: newStrippedPgn.join('\n'),
    clockTimes: newClockTimes
  };
}
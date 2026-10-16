import { SALON_DATA, BusinessHours } from '../content';

export interface SalonLiveStatus {
  isOpen: boolean;
  statusText: string;
  todaySchedule?: BusinessHours;
  currentDayIndex: number;
}

/**
 * Calculates current open/closed status in America/Los_Angeles timezone
 * Safe with fallbacks to avoid breaking on edge-cases or Intl errors.
 */
export function getSalonLiveStatus(): SalonLiveStatus {
  try {
    const timeZone = SALON_DATA.timezone || 'America/Los_Angeles';
    const now = new Date();

    // Format current date/time parts in target timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    let weekdayStr = '';
    let hour = 0;
    let minute = 0;

    for (const part of parts) {
      if (part.type === 'weekday') weekdayStr = part.value;
      if (part.type === 'hour') hour = parseInt(part.value, 10);
      if (part.type === 'minute') minute = parseInt(part.value, 10);
    }

    // Map weekday string to schedule
    const weekdayMap: Record<string, number> = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };

    const currentDayIndex = weekdayMap[weekdayStr] ?? now.getDay();
    const todaySchedule = SALON_DATA.schedule.find(
      (s) => s.dayIndex === currentDayIndex
    );

    if (!todaySchedule || todaySchedule.isClosed) {
      // Find next open day
      const nextDay = getNextOpenDay(currentDayIndex);
      return {
        isOpen: false,
        statusText: `Closed · Opens ${nextDay.openDisplay} ${nextDay.dayName}`,
        todaySchedule,
        currentDayIndex,
      };
    }

    const currentMinutes = hour * 60 + minute;
    const [openH, openM] = todaySchedule.open.split(':').map(Number);
    const [closeH, closeM] = todaySchedule.close.split(':').map(Number);
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      // It's open right now
      const closeDisplay = formatTime12h(todaySchedule.close);
      return {
        isOpen: true,
        statusText: `Open today until ${closeDisplay}`,
        todaySchedule,
        currentDayIndex,
      };
    }

    if (currentMinutes < openMinutes) {
      // Opens later today
      const openDisplay = formatTime12h(todaySchedule.open);
      return {
        isOpen: false,
        statusText: `Closed · Opens ${openDisplay} today`,
        todaySchedule,
        currentDayIndex,
      };
    }

    // Already closed for today, check tomorrow
    const nextDay = getNextOpenDay(currentDayIndex);
    return {
      isOpen: false,
      statusText: `Closed · Opens ${nextDay.openDisplay} ${nextDay.dayName}`,
      todaySchedule,
      currentDayIndex,
    };
  } catch {
    // Safe graceful fallback
    return {
      isOpen: false,
      statusText: 'Walk-ins & appointments welcome',
      currentDayIndex: 1,
    };
  }
}

function getNextOpenDay(currentDayIndex: number): {
  dayName: string;
  openDisplay: string;
} {
  for (let i = 1; i <= 7; i++) {
    const nextIndex = (currentDayIndex + i) % 7;
    const sched = SALON_DATA.schedule.find((s) => s.dayIndex === nextIndex);
    if (sched && !sched.isClosed) {
      return {
        dayName: i === 1 ? 'tomorrow' : sched.dayShort,
        openDisplay: formatTime12h(sched.open),
      };
    }
  }
  return { dayName: 'tomorrow', openDisplay: '9:00 AM' };
}

function formatTime12h(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const minuteStr = m === 0 ? '' : `:${m < 10 ? '0' + m : m}`;
  return `${hour12}${minuteStr} ${period}`;
}

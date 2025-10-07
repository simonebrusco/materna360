"use client";
import useReminders from "../hooks/useReminders";

export default function RemindersAgent(){
  // Initialize reminders scheduling; hook handles timers and dispatches events
  useReminders();
  return null;
}

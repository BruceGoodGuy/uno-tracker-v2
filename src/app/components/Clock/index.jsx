"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import React, { useEffect } from "react";

// Helper to extract hour, minute, second from ISO string
function getHMS(isoString) {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return { hours, minutes, seconds };
}

function getDiffHMS(time) {
  const target = getHMS(time);
  const now = new Date();
  let h = now.getHours() - target.hours;
  let m = now.getMinutes() - target.minutes;
  let s = now.getSeconds() - target.seconds;

  if (s < 0) {
    s += 60;
    m -= 1;
  }
  if (m < 0) {
    m += 60;
    h -= 1;
  }
  if (h < 0) {
    h += 24;
  }
  return { h, m, s };
}

export default function Clock({ time, isIncrease, onTimeOut }) {
  const [timer, setTimer] = React.useState({ h: 0, m: 0, s: 0 });

  // Example usage:
  // const { hours, minutes, seconds } = getHMS("2025-07-27T14:25:19.638188s");

  useEffect(() => {
    const gameTimer = getHMS(time);
    const differTime = getDiffHMS(time);
    const timer = setInterval(() => {
      if (isIncrease) {
        time += 1;
      } else {
        time -= 1;
      }
      if (time <= 0) {
        clearInterval(timer);
        onTimeOut();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isIncrease, onTimeOut]);

  return (
    <Card className="w-full max-w-md bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Game Duration
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center text-2xl font-bold text-gray-900">
        {timer.h} Hour:{timer.m} minutes:{timer.s}sec
      </CardContent>
    </Card>
  );
}

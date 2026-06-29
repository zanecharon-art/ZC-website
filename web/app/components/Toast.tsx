"use client";

import { useEffect, useRef, useState } from "react";
import { TOAST_EVENT } from "@/lib/toast";

export default function Toast() {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onToast(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      setMessage(detail);
      setShow(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShow(false), 2800);
    }
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={`toast${show ? " show" : ""}`} id="toast">
      {message}
    </div>
  );
}

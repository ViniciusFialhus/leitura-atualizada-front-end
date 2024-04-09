"use client"
import { useEffect } from 'react';

export default function GoogleCallback() {
  useEffect(() => {
    window.location.href = '/mainPage';
  }, []);

  return (
    <div>
      Redirecionando...
    </div>
  );
}

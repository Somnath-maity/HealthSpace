import { useState, useEffect } from "react";

type PermissionStatus = "default" | "granted" | "denied";

export const useNotifications = () => {
  const [permission, setPermission] = useState<PermissionStatus>("default");

  useEffect(() => {
    // check current permission on mount
    if ("Notification" in window) {
      setPermission(Notification.permission as PermissionStatus);
    }
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      console.warn("This browser does not support notifications.");
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result as PermissionStatus);
  };

  const sendNotification = (title: string, body: string) => {
    if (permission !== "granted") return;

    new Notification(title, {
      body,
      icon: "/icon-192.png",
    });
  };

  return { permission, requestPermission, sendNotification };
};
export const getSystemTheme = (theme: string) => {
  return theme === "dark" ? "تاریک" : theme === "light" ? "روشن" : "پیروی از سیستم";
};

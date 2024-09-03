export const checks = [
    { regex: /[A-Z]/, message: "at least 1 uppercase letter" },
    { regex: /[a-z]/, message: "at least 1 lowercase letter" },
    { regex: /\d/, message: "at least 1 number" },
    { regex: /[@$!%*?&]/, message: "at least 1 special character (@$!%*?&)" },
    { regex: /.{7,}/, message: "a minimum length of 7 characters" }
  ];
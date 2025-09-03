export async function loadLanguage(locale: string) {
  const namespaces = ["common", "auth", "greetings"];
  const messages: Record<string, any> = {};

  for (const ns of namespaces) {
    const module = await import(`@/languages/${locale}/${ns}.json`);
    Object.assign(messages, module.default);
  }

  return messages;
}
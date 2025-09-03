// next-intl.config.ts
//mostrar error para labels no configurado por idioma

export default {
  messages: {
    onMissingMessage: ({
      namespace,
      key,
      locale
    }: {
      namespace: string;
      key: string;
      locale: string;
    }) => {
      console.warn(`Missing message: ${namespace}.${key} in ${locale}`);
    }
  }
};

export const useUtils = () => {
  const mapValueIntoLang = (value: string) => {
    switch (value) {
      case 'english':
        return 'en';
      case 'spanish':
        return 'es';
      case 'french':
        return 'fr';
      case 'german':
        return 'de';
      default:
        return null;
    };
  };

  return { mapValueIntoLang };
};
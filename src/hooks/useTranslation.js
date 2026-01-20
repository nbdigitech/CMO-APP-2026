import { useSelector } from 'react-redux';
import { allTranslations } from '../locales/allTranslations';

export const useTranslation = () => {
  const language = useSelector(state => state.language.language);
  const t = allTranslations[language] || allTranslations.EN;
  return { t, language };
};

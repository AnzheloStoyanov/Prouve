import { useTranslation } from "react-i18next"

const useLocale = () => {

    const { t } = useTranslation()

    const monthNames = t('locale.monthNames', { returnObjects: true })
    const dayNames = t('locale.dayNames', { returnObjects: true })

    const locale = {
        localize: {
            day: n => dayNames[n],
            month: n => monthNames[n]
        },
        formatLong: {
            date: () => 'dd/mm/yyyy'
        }
    }

    return locale
}

export default useLocale
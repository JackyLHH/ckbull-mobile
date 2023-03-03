import * as Localization from "expo-localization";
import { SettingsStorage } from "module/settings/SettingsStorage";
import { LanguageDetectorAsyncModule } from "i18next";
import { LocaleType } from "locale";

//https://www.localeplanet.com/icu/iso3166.html
export function getDefaultLocale(): LocaleType {
    const locales: LocaleType[] = ["en", "es", "zh", "pt", "el", "fr"];
    const locale = Localization.getLocales()[0].languageCode || Localization.locale || "en";
    const systemLocaleEnd = locale.slice(-2).toLowerCase();
    const systemLocaleStart = locale.slice(0, 2).toLowerCase();
    return locales.find((l) => systemLocaleStart === l || systemLocaleEnd === l) ?? "en";
}

export async function initLang(): Promise<LocaleType> {
    const storedLocale = await SettingsStorage?.getLocale();
    return storedLocale || getDefaultLocale();
}

export async function detectLang(): Promise<LocaleType> {
    try {
        return await initLang();
    } catch (error) {
        /* eslint-disable no-console */
        console.warn("Error reading language", error);
        return "en";
    }
}

const LanguageDetectorPlugin: LanguageDetectorAsyncModule = {
    type: "languageDetector",
    async: true,
    /* eslint-disable @typescript-eslint/no-empty-function */
    init: () => {},
    detect: detectLang,
    /* eslint-disable @typescript-eslint/no-empty-function */
    cacheUserLanguage: () => {},
};

export default LanguageDetectorPlugin;

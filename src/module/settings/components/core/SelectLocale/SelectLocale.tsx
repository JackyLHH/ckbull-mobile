import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";
import { SelectOption } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import { LocaleType } from "locale";
import i18n from "locale/i18n";
import SettingsSelect from "../../input/SettingsSelect/SettingsSelect";

const SelectLocale = (): JSX.Element => {
    const translate = useTranslate();
    const localeOptions: SelectOption<LocaleType>[] = [
        {
            label: translate("es"),
            value: "es",
        },
        {
            label: translate("en"),
            value: "en",
        },
        {
            label: translate("zh"),
            value: "zh",
        },
    ];
    const [settings, setSettings] = useRecoilState(settingsState);

    const handleSelect = (value: LocaleType) => {
        i18n.changeLanguage(value);
        setSettings((s) => ({ ...s, locale: value }));
        SettingsStorage.set({ locale: value });
    };
    return (
        <SettingsSelect
            options={localeOptions}
            value={settings.locale}
            label={translate("select_locale")}
            onChange={(value) => handleSelect(value)}
        />
    );
};

export default SelectLocale;

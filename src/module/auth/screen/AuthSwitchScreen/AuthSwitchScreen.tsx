import { AuthScreens } from "module/auth/AuthNavigatorGroup";
import { AnimatedAuthSwitchScreenRoot } from "./AuthSwitchScreen.styles";
import { useTabs } from "@peersyst/react-native-components";
import { useLogoPageFlex } from "module/common/component/layout/LogoPage/LogoPageContext";
import { useTranslate } from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import DarkThemeProvider from "module/common/component/util/ThemeProvider/DarkThemeProvider";

const AuthSwitchScreen = (): JSX.Element => {
    const setTab = useTabs()[1];
    useLogoPageFlex(1);
    const translate = useTranslate();
    return (
        <DarkThemeProvider>
            <AnimatedAuthSwitchScreenRoot in={true} appear>
                <Button variant="primary" size="lg" fullWidth onPress={() => setTab(AuthScreens.CREATE_WALLET)}>
                    {translate("create_wallet")}
                </Button>
                <Button variant="tertiary" size="lg" fullWidth onPress={() => setTab(AuthScreens.IMPORT_WALLET)}>
                    {translate("import_wallet_text")}
                </Button>
            </AnimatedAuthSwitchScreenRoot>
        </DarkThemeProvider>
    );
};

export default AuthSwitchScreen;

import { config } from "config";
import Balance from "module/wallet/component/display/Balance/Balance";
import { ACTION_LABEL } from "module/wallet/component/display/Balance/utils/actionLabels";
import { CURRENCY_UNIT } from "module/wallet/component/display/Balance/utils/currencies";
import { render } from "test-utils";

describe("Text for the Balance component", () => {
    test("Renders correctly", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} />);
        expect(screen.getByText("100")).toBeDefined();
    });
    test("Renders correctly near", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} units="token" />);
        expect(screen.getByText("100 " + config.tokenName)).toBeDefined();
    });
    test("Renders correctly eur", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} units="eur" />);
        expect(screen.getByText("100 " + CURRENCY_UNIT["eur"])).toBeDefined();
    });
    test("Renders correctly dollar", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} units="usd" action="add" />);
        expect(screen.getByText(ACTION_LABEL["add"] + "100 " + CURRENCY_UNIT["usd"])).toBeDefined();
    });
    test("Renders correctly round", () => {
        const screen = render(<Balance action="round" balance={"100"} variant={"h1"} units="usd" />);
        expect(screen.getByText(ACTION_LABEL["round"] + "100 " + CURRENCY_UNIT["usd"])).toBeDefined();
    });
    test("Renders correctly when loading", () => {
        const screen = render(<Balance balance={"100"} variant={"h1"} isLoading />);
        expect(screen.getByTestId("ActivityIndicator")).toBeDefined();
    });
});

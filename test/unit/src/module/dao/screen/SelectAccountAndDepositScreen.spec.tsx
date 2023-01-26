import { render, SuccessApiCall, translate } from "test-utils";
import { fireEvent, waitFor } from "@testing-library/react-native";
import SelectAccountAndDepositScreen from "module/dao/screen/SelectAccountAndDepositScreen/SelectAccountAndDepositScreen";
import * as Genesys from "@peersyst/react-native-components";
import { WithdrawScreens } from "module/dao/component/core/WithdrawModal/WithdrawModal";
import { MockedUnlockableAmounts } from "mocks/DAO";
import { FeeRate } from "ckb-peersyst-sdk";
import { UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("SelectAccountAndDepositScreen tests", () => {
    const { serviceInstance } = new UseServiceInstanceMock();
    const { state } = new UseWalletStateMock();

    beforeAll(() => {
        jest.spyOn(serviceInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 20000,
            occupiedBalance: 9600,
            freeBalance: 12635,
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly without deposits", async () => {
        jest.spyOn(serviceInstance, "getDAOUnlockableAmounts").mockReturnValue(SuccessApiCall([]));
        const screen = render(<SelectAccountAndDepositScreen setWithdrawInfo={jest.fn()} />);
        expect(await screen.findByText(translate("select_a_wallet") + ":")).toBeDefined();
        expect(screen.getByText(state.wallets[0].name)).toBeDefined();
        expect(screen.getByText(translate("no_deposits"))).toBeDefined();
    });

    test("Updates withdraw state and moves forward to the next screen", async () => {
        jest.spyOn(serviceInstance, "getDAOUnlockableAmounts").mockReturnValue(SuccessApiCall(MockedUnlockableAmounts));
        const setWithdrawInfo = jest.fn();
        const setTab = jest.fn();
        jest.spyOn(Genesys, "useSetTab").mockReturnValue(setTab);
        const screen = render(<SelectAccountAndDepositScreen setWithdrawInfo={setWithdrawInfo} />);
        expect(await screen.findByText(translate("select_a_wallet") + ":")).toBeDefined();
        expect(screen.getByText(translate("select_a_wallet") + ":")).toBeDefined();
        expect(screen.getByText("500")).toBeDefined();
        const button = screen.getByText(translate("withdraw"));
        fireEvent.press(button);
        //The deposit is zero because it corresponds to the 0 pos of the MockedUnlockableAmounts
        //The receiver is zero because is the first wallet
        await waitFor(() => expect(setWithdrawInfo).toHaveBeenCalledWith({ receiverIndex: 0, depositIndex: 0, feeRate: FeeRate.NORMAL }));
        expect(setTab).toHaveBeenCalledWith(WithdrawScreens.CONFIRMATION);
    });
});

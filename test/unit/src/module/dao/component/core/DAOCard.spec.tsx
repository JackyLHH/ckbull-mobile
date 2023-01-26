import DAOCard from "module/dao/component/core/DAOAccountCard/DAOCard";
import { render, SuccessApiCall, translate } from "test-utils";
import { MockedDAOBalance } from "mocks/DAO";
import * as UseGetDaoInfo from "module/dao/query/useGetDaoInfo";
import daoInfo from "mocks/daoInfo";
import { UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("Test for the DAO Card", () => {
    const { serviceInstance } = new UseServiceInstanceMock();
    new UseWalletStateMock();
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(serviceInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 20000,
            occupiedBalance: 9600,
            freeBalance: 12635,
        });
        jest.spyOn(serviceInstance, "getDAOBalance").mockReturnValue(SuccessApiCall(MockedDAOBalance));
        jest.spyOn(UseGetDaoInfo, "default").mockReturnValue({ data: daoInfo, isLoading: false } as any);

        const screen = render(<DAOCard />);
        //Balance
        expect(screen.getByText(translate("available"))).toBeDefined();
        /**Account Balance */
        expect(await screen.findByText("12,635")).toBeDefined();
        expect(screen.getByText(translate("locked"))).toBeDefined();
        expect(screen.getByText("500")).toBeDefined();
        expect(screen.getByText(translate("estimated_apc"))).toBeDefined();
        expect(screen.getByText(`${daoInfo.estimated_apc}%`)).toBeDefined();

        //Buttons
        expect(screen.getByText(translate("deposit"))).toBeDefined();
        expect(screen.getByTestId("DAODepositIcon")).toBeDefined();
        expect(screen.getByTestId("DAOWithdrawIcon")).toBeDefined();
        expect(screen.getByText(translate("withdraw"))).toBeDefined();

        //Header
        expect(screen.getByText("Nervos DAO"));
        expect(screen.getByTestId("FilledWalletIcon"));
        expect(screen.getByTestId("InfoIcon"));
    });
});

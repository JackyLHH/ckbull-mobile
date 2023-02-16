import { TextFieldProps } from "@peersyst/react-native-components";
import { Asset } from "module/wallet/wallet.types";
import { AssetType } from "module/wallet/wallet.types";
import CKBAmountTextField from "./CKBAmountTextField/CKBAmountTextField";
import NftAmountTextField from "./NftAmountTextField/NftAmountTextField";
import TokenAmountTextField from "./TokenAmountTextField/TokenAmountTextField";

export interface AssetAmountTextFieldProps extends Omit<TextFieldProps, "keyboardType" | "validators"> {
    asset: Asset;
    index?: number;
}

const AssetAmountTextField = ({ asset, index = 0, onChange, value, ...rest }: AssetAmountTextFieldProps) => {
    return (
        <>
            {asset.type === AssetType.NATIVE_TOKEN && <CKBAmountTextField onChange={onChange} value={value} index={index} {...rest} />}
            {asset.type === AssetType.FT && <TokenAmountTextField onChange={onChange} value={value} token={asset.ft!} {...rest} />}
            {asset.type === AssetType.NFT && <NftAmountTextField {...rest} />}
        </>
    );
};

export default AssetAmountTextField;

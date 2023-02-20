import LoadingModal from "module/common/component/feedback/LoadingModal/LoadingModal";
import { useTranslate } from "module/common/hook/useTranslate";
import ConfirmPinModal from "module/settings/components/core/ConfirmPinModal/ConfirmPinModal";
import { useEffect, useState } from "react";
import { SendTransactionModalProps } from "./SendTransactionModal.types";

function SendTransactionModal({
    onExited,
    children,
    sendTransaction,
    isLoading,
    isSuccess,
    isError,
    onError,
    onSuccess,
}: SendTransactionModalProps) {
    const translate = useTranslate();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSendTransaction = async () => {
        try {
            if (sendTransaction["then" as keyof typeof SendTransactionModal] === "function") {
                await sendTransaction();
            } else {
                sendTransaction();
            }
        } catch (e) {}
    };

    useEffect(() => {
        if (isSuccess) onSuccess?.();
        else if (isError) onError?.();
    }, [isSuccess, isError]);

    return (
        <>
            {children({ showModal: () => setShowConfirmation(true), isError, isSuccess, isLoading: isLoading || showConfirmation })}
            <ConfirmPinModal open={showConfirmation} onClose={() => setShowConfirmation(false)} onConfirmedExited={handleSendTransaction} />
            <LoadingModal
                loading={isLoading}
                success={isSuccess}
                error={isError}
                onExited={onExited}
                successMessage={translate("transaction_completed")}
            />
        </>
    );
}

export default SendTransactionModal;

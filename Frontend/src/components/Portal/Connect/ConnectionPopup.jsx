import PrimaryButton from "../../Button/PrimaryButton";
import SecondaryButton from "../../Button/SecondaryButton";

const ConnectionPopup = ({
    currentBusiness,
    selectedBusiness,
    emailTemplate,
    setEmailTemplate,
    isLoading,
    onCancel,
    onRequest
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[600px] max-w-2xl mx-auto min-h-[400px]">
                <h3 className="text-lg font-semibold mb-4">Request Connection</h3>

                <div className="flex gap-x-10">
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">From:</p>
                        <p className="font-medium">{currentBusiness?.businessName}</p>
                    </div>

                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">To:</p>
                        <p className="font-medium">{selectedBusiness?.title}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Email Template:</p>
                    <p className="w-full border-t border-l border-r border-gray-400 rounded-t-lg p-1 text-sm resize-none">
                        To: ({selectedBusiness?.contactEmail})
                    </p>
                    <textarea
                        className="w-full border border-gray-400 rounded-b-lg p-2 text-sm resize-none"
                        rows={7}
                        value={emailTemplate}
                        onChange={(e) => setEmailTemplate(e.target.value)}
                    />
                </div>

                <p className="text-sm text-gray-500 mb-6">
                    A connection request will be sent. The business will need to accept your request before you are connected.
                </p>

                <div className="flex gap-3 justify-end">
                    <SecondaryButton 
                        onClick={onCancel}
                        disabled={isLoading}
                        className="px-4 py-2"
                    >
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton 
                        onClick={onRequest}
                        disabled={isLoading}
                        className="px-4 py-2"
                    >
                        {isLoading ? "Sending..." : "Request Connection"}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
};

export default ConnectionPopup;

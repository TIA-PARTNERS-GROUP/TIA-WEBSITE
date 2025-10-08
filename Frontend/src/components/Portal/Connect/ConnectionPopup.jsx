import { useParams } from "react-router-dom";
import { useState } from "react";
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
    const { partnerType } = useParams();
    const capitalizedPartner = partnerType ? partnerType.charAt(0).toUpperCase() + partnerType.slice(1) : '' || "Alliance";
    
    const [selectedTemplate, setSelectedTemplate] = useState('default');

    const emailTemplates = [
        {
            id: 'default',
            name: 'Default',
            content: `Hi ${selectedBusiness?.contactName || ''},

My business, ${currentBusiness?.businessName}, would like to connect with your business, ${selectedBusiness?.title}. Looking forward to collaborating!

Best regards,
${currentBusiness?.contactName || ''}`
        },
        {
            id: 'professional',
            name: 'Professional',
            content: `Dear ${selectedBusiness?.contactName || ''},

I am reaching out from ${currentBusiness?.businessName} to express our interest in forming a ${capitalizedPartner.toLowerCase()} partnership with ${selectedBusiness?.title}. 

We believe our businesses could mutually benefit from collaboration and would appreciate the opportunity to explore potential synergies.

Thank you for your consideration.

Sincerely,
${currentBusiness?.contactName || ''}`
        },
        {
            id: 'casual',
            name: 'Casual',
            content: `Hi ${selectedBusiness?.contactName || ''},

Hope you're doing well! We at ${currentBusiness?.businessName} came across your business and would love to connect with ${selectedBusiness?.title}.

Let me know if you'd be open to exploring how we could work together!

Cheers,
${currentBusiness?.contactName || ''}`
        }
    ];

    const handleTemplateChange = (templateId) => {
        setSelectedTemplate(templateId);
        if (templateId !== 'custom') {
            const template = emailTemplates.find(t => t.id === templateId);
            setEmailTemplate(template.content);
        }
    };

    const handleCustomTemplateChange = (e) => {
        setEmailTemplate(e.target.value);
        if (selectedTemplate !== 'custom') {
            setSelectedTemplate('custom');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[900px] max-w-3xl mx-auto min-h-[400px]">
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

                <div className="flex gap-x-10">
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Connection Type:</p>
                        <p className="font-medium">{capitalizedPartner}</p>
                    </div>
                </div>

                <div className="">
                    <label className="text-sm text-gray-600 mb-2 block">Email Template:</label>
                    <select
                        value={selectedTemplate}
                        onChange={(e) => handleTemplateChange(e.target.value)}
                        className="w-full border border-gray-400 rounded-lg p-2 text-sm mb-2"
                    >
                        {emailTemplates.filter(t => t.id !== 'custom').map((template) => (
                            <option key={template.id} value={template.id}>
                                {template.name}
                            </option>
                        ))}
                        <option value="custom">Custom</option>
                    </select>
                </div>

                <div className="mb-6">
                    <p className="w-full border-t border-l border-r border-gray-400 rounded-t-lg p-1 text-sm resize-none">
                        To: ({selectedBusiness?.contactEmail})
                    </p>
                    <textarea
                        className="w-full border border-gray-400 rounded-b-lg p-2 text-sm resize-none"
                        rows={9}
                        value={emailTemplate}
                        onChange={handleCustomTemplateChange}
                        placeholder="Write your custom email template here..."
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
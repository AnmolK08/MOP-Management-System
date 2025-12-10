import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { IoMdClose, IoMdDownload, IoMdQrScanner } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import html2canvas from 'html2canvas';
import { generateQRToken } from '../Redux/Slices/providerSlice.js';

const QRCodeGenerator = ({ isOpen, onClose }) => {
    const [qrToken, setQrToken] = useState(null);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [expiresIn, setExpiresIn] = useState('');
    const [loading, setLoading] = useState(false);
    const qrRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isOpen && !qrToken) {
            generateToken();
        }
    }, [isOpen]);

    const generateToken = () => {
        setLoading(true);
        dispatch(generateQRToken())
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    const token = res.payload.token;
                    setQrToken(token);
                    setExpiresIn(res.payload.expiresIn);

                    // Generate QR code
                    QRCode.toDataURL(token, {
                        width: 300,
                        margin: 2,
                        color: {
                            dark: '#000000',
                            light: '#FFFFFF'
                        }
                    })
                        .then(url => {
                            setQrCodeUrl(url);
                            setLoading(false);
                        })
                        .catch(err => {
                            console.error(err);
                            toast.error("Failed to generate QR code");
                            setLoading(false);
                        });
                } else {
                    toast.error(res.payload || "Failed to generate token");
                    setLoading(false);
                }
            });
    };

    const handleDownload = async () => {
        try {
            if (qrCodeUrl) {
                const link = document.createElement('a');
                link.download = `order-qr-code-${new Date().getTime()}.png`;
                link.href = qrCodeUrl;
                link.click();
                toast.success("QR Code downloaded successfully!");
            } else {
                toast.error("Failed to download QR code. Please try regenerating.");
            }
        } catch (fallbackError) {
            console.error('Fallback download error:', fallbackError);
            toast.error("Failed to download QR code");
        }
    };

    const handleRegenerateToken = () => {
        setQrToken(null);
        setQrCodeUrl('');
        generateToken();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm p-4 h-screen">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b">
                    <div className="flex items-center gap-2">
                        <IoMdQrScanner className="text-2xl text-orange-500" />
                        <h3 className="text-lg font-bold text-gray-800">Order QR Code</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                            <p className="mt-4 text-gray-600">Generating QR Code...</p>
                        </div>
                    ) : (
                        <>
                            <div ref={qrRef} className="bg-white p-6 rounded-lg border-2 border-gray-200">
                                <div className="text-center mb-4">
                                    <h4 className="text-lg font-bold text-gray-800">Scan to Order & Deliver</h4>
                                    <p className="text-sm text-gray-500">Valid for {expiresIn}</p>
                                </div>

                                {qrCodeUrl && (
                                    <div className="flex justify-center">
                                        <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
                                    </div>
                                )}

                                <div className="mt-4 text-center">
                                    <p className="text-xs text-gray-500">
                                        Minipahadganj
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                                <p className="text-sm text-orange-800">
                                    <strong>Instructions:</strong> Customers can scan it to place their order and mark it as delivered automatically.
                                </p>
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <p className="text-xs text-blue-800">
                                    <strong>Note:</strong> This QR code expires in {expiresIn}. After expiration, generate a new one.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={handleDownload}
                                    className="flex-1 bg-orange-500 text-white cursor-pointer px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    <IoMdDownload className="text-xl" />
                                    Download QR Code
                                </button>
                                <button
                                    onClick={handleRegenerateToken}
                                    className="flex-1 bg-gray-200 text-gray-800 cursor-pointer px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                >
                                    Regenerate
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRCodeGenerator;
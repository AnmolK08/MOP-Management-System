import React, { useState, useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';
import { IoMdClose, IoMdQrScanner } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { scanAndDelivered } from '../Redux/Slices/orderSlice';
import { toast } from 'react-toastify';

const QRScannerModal = ({ isOpen, onClose, parentClose, orderData }) => {
    const [scanning, setScanning] = useState(false);
    const videoRef = useRef(null);
    const scannerRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (scanning && videoRef.current) {
            // Initialize QR Scanner
            scannerRef.current = new QrScanner(
                videoRef.current,
                (result) => handleScan(result.data),
                {
                    returnDetailedScanResult: true,
                    highlightScanRegion: true,
                    highlightCodeOutline: true,
                }
            );

            scannerRef.current.start().catch((err) => {
                console.error('Error starting scanner:', err);
                toast.error('Failed to access camera. Please check permissions.');
                setScanning(false);
            });

            return () => {
                if (scannerRef.current) {
                    scannerRef.current.stop();
                    scannerRef.current.destroy();
                    scannerRef.current = null;
                }
            };
        }
    }, [scanning]);

    const handleScan = (scannedData) => {
        if (!scannedData) return;

        // Stop scanning
        if (scannerRef.current) {
            scannerRef.current.stop();
        }
        setScanning(false);

        const toastId = toast.loading("Processing QR code and placing order...");

        dispatch(scanAndDelivered({ orderData, qrToken: scannedData }))
            .then((res) => {
                if (res.meta.requestStatus === "rejected") {
                    toast.update(toastId, {
                        render: res.payload || "Failed to process QR code",
                        type: "error",
                        isLoading: false,
                        autoClose: 3000
                    });
                } else {
                    toast.update(toastId, {
                        render: "Order placed and marked as delivered successfully!",
                        type: "success",
                        isLoading: false,
                        autoClose: 3000
                    });
                }
                onClose();
                parentClose();
            });
    };

    const handleStopScanning = () => {
        if (scannerRef.current) {
            scannerRef.current.stop();
        }
        setScanning(false);
    };

    const handleClose = () => {
        handleStopScanning();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b">
                    <div className="flex items-center gap-2">
                        <IoMdQrScanner className="text-2xl text-orange-500" />
                        <h3 className="text-lg font-bold text-gray-800">Scan QR Code</h3>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <p className="text-sm text-gray-600 mb-4">
                        Scan the QR code displayed at the counter to place your order and mark it as delivered.
                    </p>

                    {!scanning ? (
                        <div className="text-center">
                            <button
                                onClick={() => setScanning(true)}
                                className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center gap-2"
                            >
                                <IoMdQrScanner className="text-xl" />
                                Start Scanning
                            </button>
                        </div>
                    ) : (
                        <div className="relative">
                            <video
                                ref={videoRef}
                                className="w-full rounded-lg"
                                style={{ maxHeight: '400px' }}
                            />
                            <button
                                onClick={handleStopScanning}
                                className="mt-4 w-full bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Cancel Scanning
                            </button>
                        </div>
                    )}

                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-800">
                            <strong>Note:</strong> Make sure to allow camera access when prompted. The QR code must be valid and not expired.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRScannerModal;
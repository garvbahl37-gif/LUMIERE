import { useState } from "react";
import { X, Ruler, Shirt, Footprints, Watch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SizeGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const tabs = [
    { id: "clothing", label: "Clothing", icon: Shirt },
    { id: "shoes", label: "Shoes", icon: Footprints },
    { id: "accessories", label: "Accessories", icon: Watch },
];

const clothingSizes = {
    headers: ["Size", "Bust (in)", "Waist (in)", "Hips (in)"],
    rows: [
        ["XS", "32-33", "24-25", "34-35"],
        ["S", "34-35", "26-27", "36-37"],
        ["M", "36-37", "28-29", "38-39"],
        ["L", "38-40", "30-32", "40-42"],
        ["XL", "41-43", "33-35", "43-45"],
        ["XXL", "44-46", "36-38", "46-48"],
    ],
};

const shoeSizes = {
    headers: ["EU", "UK", "US (Women)", "US (Men)", "Foot Length (cm)"],
    rows: [
        ["35", "2", "5", "-", "22.1"],
        ["36", "3", "6", "-", "22.9"],
        ["37", "4", "7", "-", "23.7"],
        ["38", "5", "8", "6", "24.6"],
        ["39", "6", "9", "7", "25.4"],
        ["40", "6.5", "9.5", "7.5", "26.2"],
        ["41", "7", "10", "8", "27.0"],
        ["42", "8", "11", "9", "27.8"],
        ["43", "9", "12", "10", "28.6"],
        ["44", "10", "13", "11", "29.4"],
    ],
};

const accessorySizes = {
    rings: {
        headers: ["Size", "Diameter (mm)", "Circumference (mm)"],
        rows: [
            ["5", "15.7", "49.3"],
            ["6", "16.5", "51.8"],
            ["7", "17.3", "54.4"],
            ["8", "18.1", "57.0"],
            ["9", "18.9", "59.5"],
            ["10", "19.8", "62.1"],
        ],
    },
    bracelets: {
        headers: ["Size", "Wrist (in)", "Bracelet Length (in)"],
        rows: [
            ["S", "5.5-6", "6.5"],
            ["M", "6-6.5", "7"],
            ["L", "6.5-7", "7.5"],
            ["XL", "7-7.5", "8"],
        ],
    },
};

const SizeGuideModal = ({ isOpen, onClose }: SizeGuideModalProps) => {
    const [activeTab, setActiveTab] = useState("clothing");

    if (!isOpen) return null;

    const renderTable = (headers: string[], rows: string[][]) => (
        <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full min-w-[400px] text-sm">
                <thead>
                    <tr className="border-b border-border">
                        {headers.map((header, i) => (
                            <th
                                key={i}
                                className="py-3 px-3 text-left font-medium text-muted-foreground uppercase text-xs tracking-wider"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr
                            key={i}
                            className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                        >
                            {row.map((cell, j) => (
                                <td
                                    key={j}
                                    className={`py-3 px-3 ${j === 0 ? "font-medium" : "text-muted-foreground"}`}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-background rounded-2xl shadow-2xl border border-border"
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                <Ruler className="text-accent" size={20} />
                            </div>
                            <h2 className="font-display text-xl tracking-tight">Size Guide</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-secondary rounded-full transition-colors"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="sticky top-[73px] bg-background/95 backdrop-blur-md border-b border-border px-6 py-3 z-10">
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                            ? "bg-accent text-accent-foreground"
                                            : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                                        }`}
                                >
                                    <tab.icon size={16} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.15 }}
                            >
                                {activeTab === "clothing" && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-display text-lg mb-4">Women's Clothing Sizes</h3>
                                            {renderTable(clothingSizes.headers, clothingSizes.rows)}
                                        </div>

                                        <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                                            <h4 className="font-medium mb-2">How to Measure</h4>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                <li><strong>Bust:</strong> Measure around the fullest part of your bust</li>
                                                <li><strong>Waist:</strong> Measure around your natural waistline</li>
                                                <li><strong>Hips:</strong> Measure around the fullest part of your hips</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "shoes" && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-display text-lg mb-4">Shoe Size Conversion</h3>
                                            {renderTable(shoeSizes.headers, shoeSizes.rows)}
                                        </div>

                                        <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                                            <h4 className="font-medium mb-2">Measuring Tips</h4>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                <li>• Measure your feet in the evening when they're largest</li>
                                                <li>• Stand while measuring for accurate sizing</li>
                                                <li>• If between sizes, we recommend going up</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "accessories" && (
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="font-display text-lg mb-4">Ring Sizes</h3>
                                            {renderTable(accessorySizes.rings.headers, accessorySizes.rings.rows)}
                                        </div>

                                        <div>
                                            <h3 className="font-display text-lg mb-4">Bracelet Sizes</h3>
                                            {renderTable(accessorySizes.bracelets.headers, accessorySizes.bracelets.rows)}
                                        </div>

                                        <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                                            <h4 className="font-medium mb-2">Finding Your Ring Size</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Wrap a piece of string around your finger, mark where it overlaps,
                                                and measure the length in millimeters. Match to the circumference column.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SizeGuideModal;
